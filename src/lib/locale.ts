import en from "@/locales/en.json"
import fr from "@/locales/fr.json"

export const translations = { en, fr }

export function getT(lang: 'en' | 'fr') {
  return function t(path: string, fallback = ''): string {
    const result = path.split('.').reduce(
      (obj, key) => (obj && (obj as any)[key] !== undefined ? (obj as any)[key] : undefined),
      translations[lang]
    );
    return typeof result === 'string' ? result : fallback;
  }
} 