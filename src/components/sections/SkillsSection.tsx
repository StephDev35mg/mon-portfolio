import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Cube3D from "@/components/Cube3D"

interface SkillsSectionProps {
  skills: { name: string; image: string; category: string }[];
  fadeInUp: any;
  staggerContainer: any;
  t: (key: string) => string;
}

export default function SkillsSection({ skills, fadeInUp, staggerContainer, t }: SkillsSectionProps) {
  return (
    <motion.section
      id="skills"
      className="py-20 px-6 dark:bg-background"
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="container mx-auto max-w-7xl ">
        <motion.div className="text-center mb-16" variants={fadeInUp}>
          <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">{t("skills.title")}</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t("skills.subtitle")}
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              className="h-48"
              variants={fadeInUp}
              whileHover={{
                scale: 1.05,
                rotateY: 10,
                z: 50,
              }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-full h-full">
                <Cube3D image={skill.image} name={skill.name} />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  )
} 