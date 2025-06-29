const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

/**
 * Script pour hasher les mots de passe non hashés des utilisateurs existants
 * Usage: node scripts/hash-passwords.js
 */

async function hashExistingPasswords() {
  try {
    console.log('🔍 Recherche des utilisateurs avec des mots de passe non hashés...');
    
    // Récupérer tous les utilisateurs
    const users = await prisma.user.findMany();
    
    if (users.length === 0) {
      console.log('❌ Aucun utilisateur trouvé dans la base de données.');
      return;
    }

    console.log(`📊 ${users.length} utilisateur(s) trouvé(s)`);
    
    let hashedCount = 0;
    let skippedCount = 0;

    for (const user of users) {
      // Vérifier si le mot de passe est déjà hashé (bcrypt génère des hashes qui commencent par $2a$ ou $2b$)
      const isAlreadyHashed = user.password.startsWith('$2a$') || user.password.startsWith('$2b$');
      
      if (isAlreadyHashed) {
        console.log(`⏭️  Utilisateur ${user.email} - Mot de passe déjà hashé, ignoré`);
        skippedCount++;
        continue;
      }

      // Hasher le mot de passe non hashé
      const saltRounds = 12;
      const hashedPassword = await bcrypt.hash(user.password, saltRounds);

      // Mettre à jour l'utilisateur avec le mot de passe hashé
      await prisma.user.update({
        where: { id: user.id },
        data: { password: hashedPassword }
      });

      console.log(`✅ Utilisateur ${user.email} - Mot de passe hashé avec succès`);
      console.log(`   🔐 Ancien: ${user.password}`);
      console.log(`   🔒 Nouveau: ${hashedPassword.substring(0, 20)}...`);
      hashedCount++;
    }

    console.log('\n📈 Résumé:');
    console.log(`✅ ${hashedCount} mot(s) de passe hashé(s)`);
    console.log(`⏭️  ${skippedCount} mot(s) de passe déjà hashé(s), ignoré(s)`);
    
    if (hashedCount > 0) {
      console.log('\n🎉 Tous les mots de passe non hashés ont été mis à jour avec succès !');
    } else {
      console.log('\nℹ️  Tous les mots de passe étaient déjà hashés.');
    }

  } catch (error) {
    console.error('❌ Erreur lors du hachage des mots de passe:', error.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Exécuter le script
console.log('🚀 Début du hachage des mots de passe existants...\n');
hashExistingPasswords(); 