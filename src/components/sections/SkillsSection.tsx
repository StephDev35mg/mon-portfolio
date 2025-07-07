import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
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
              <Card className=" group relative overflow-hidden hover:shadow-lg transition-all duration-300 border-gray-200 bg-white dark:bg-muted h-full">

                {/* Background image */}
                <Image
                  src={skill.image}
                  alt={skill.name}
                  fill
                  className="object-cover w-full h-full absolute top-0 left-0 z-0 group-hover:opacity-80 transition-opacity duration-300"
                />

                {/* Optional dark overlay */}
                <div className="absolute inset-0 bg-black/10 dark:bg-black/30 z-10" />

                {/* Title at top-start */}
                <div className="absolute top-4 left-4 z-20">
                  <h3 className="text-white opacity-40 text-lg font-semibold drop-shadow-sm">
                    {skill.name}
                  </h3>
                </div>

                <CardContent className="relative z-20 p-6 text-center mt-8">
                  <motion.div
                    className="text-4xl mb-3"
                    whileHover={{
                      scale: 1.2,
                      rotate: [0, -10, 10, 0],
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Optionally place an icon or something here */}
                  </motion.div>
                </CardContent>

              </Card>


            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  )
} 
