import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"

interface ExperienceSectionProps {
  fadeInUp: any;
  staggerContainer: any;
  t: (key: string) => string;
  experiences: {
    title: string;
    company: string;
    period: string;
    description: string;
  }[];
  loading: boolean;
}

export default function ExperienceSection({ fadeInUp, staggerContainer, t, experiences, loading }: ExperienceSectionProps) {
  return (
    <motion.section
      id="experiences"
      className="py-10 px-6"
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="container mx-auto max-w-7xl">
        <motion.div className="text-center mb-16" variants={fadeInUp}>
          <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">{t("experience.title")}</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">{t("experience.subtitle")}</p>
        </motion.div>

        <motion.div className="max-w-4xl mx-auto" variants={staggerContainer}>
          {loading ? (
            <div className="text-center text-gray-500 dark:text-gray-400">{t("loading")}</div>
          ) : experiences.length === 0 ? (
            <div className="text-center text-gray-500 dark:text-gray-400">{t("experience.empty")}</div>
          ) : (
            experiences.map((exp, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-muted rounded-2xl p-8 mb-6 shadow-lg border border-gray-200 dark:border-gray-700"
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">{exp.title}</h3>
                    <p className="text-purple-600 font-medium">{exp.company}</p>
                  </div>
                  <Badge variant="outline" className="mt-2 md:mt-0 w-fit border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-300">
                    {exp.period}
                  </Badge>
                </div>
                <p className="text-gray-600 dark:text-gray-300">{exp.description}</p>
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
    </motion.section>
  )
} 
