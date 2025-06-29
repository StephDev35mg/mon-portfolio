import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { Github, ExternalLink } from "lucide-react"

interface ProjectsSectionProps {
  projects: any[];
  fadeInUp: any;
  staggerContainer: any;
  t: (key: string) => string;
}

// Fonction pour valider une URL
const isValidUrl = (url: string | null | undefined): boolean => {
  if (!url || url === "#" || url === "" || url === "null" || url === "undefined") {
    return false;
  }
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Fonction pour obtenir une URL d'image valide
const getValidImageUrl = (imageUrl: string | null | undefined): string => {
  if (isValidUrl(imageUrl)) {
    return imageUrl as string;
  }
  // Retourner une image par défaut si l'URL est invalide
  return "/placeholder.svg";
};

export default function ProjectsSection({ projects, fadeInUp, staggerContainer, t }: ProjectsSectionProps) {
  return (
    <motion.section
      id="projects"
      className="py-10 px-6 bg-white dark:bg-background"
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="container mx-auto max-w-7xl">
        <motion.div className="text-center mb-16" variants={fadeInUp}>
          <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">{t("projects.title")}</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t("projects.subtitle")}
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-2 gap-8"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {projects.map((project: any, index: number) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-gray-200 bg-white dark:bg-muted h-full">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title || "Project image"}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      // Fallback en cas d'erreur de chargement
                      const target = e.target as HTMLImageElement;
                      target.src = "/placeholder.svg";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Desktop: Boutons visibles au hover */}
                  <motion.div
                    className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:flex"
                    initial={{ y: 20 }}
                    whileInView={{ y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {isValidUrl(project.github) && (
                      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Button size="sm" variant="secondary" asChild>
                          <a href={project.github} target="_blank" rel="noopener noreferrer">
                            <Github className="h-4 w-4" />
                          </a>
                        </Button>
                      </motion.div>
                    )}
                    {isValidUrl(project.demo) && (
                      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Button size="sm" variant="secondary" asChild>
                          <a href={project.demo} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                      </motion.div>
                    )}
                  </motion.div>
                </div>
                
                <CardHeader>
                  <CardTitle className="group-hover:text-purple-600 transition-colors text-gray-900 dark:text-gray-100">
                    {project.title || "Sans titre"}
                  </CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-300">
                    {project.description || "Aucune description disponible"}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech && Array.isArray(project.tech) && project.tech.map((tech: string, techIndex: number) => (
                      <motion.div
                        key={techIndex}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: techIndex * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        <Badge variant="outline" className="border-gray-300 text-gray-600 dark:text-gray-300 dark:border-gray-700">
                          {tech}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* Mobile: Boutons toujours visibles en bas de la carte */}
                  <div className="flex gap-2 md:hidden">
                    {isValidUrl(project.github) && (
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
                        <Button size="sm" variant="outline" className="w-full" asChild>
                          <a href={project.github} target="_blank" rel="noopener noreferrer">
                            <Github className="h-4 w-4 mr-2" />
                            Code
                          </a>
                        </Button>
                      </motion.div>
                    )}
                    {isValidUrl(project.demo) && (
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex-1">
                        <Button size="sm" variant="default" className="w-full bg-purple-600 hover:bg-purple-700" asChild>
                          <a href={project.demo} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Demo
                          </a>
                        </Button>
                      </motion.div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  )
} 