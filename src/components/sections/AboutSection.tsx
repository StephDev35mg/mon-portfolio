import Image from "next/image"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Download, Phone, AlignJustify, ChevronLeft, Circle, Search } from "lucide-react"

export default function AboutSection({ scrollToSection, scaleOnHover, t, activeSection }: { scrollToSection: (id: string) => void, scaleOnHover: any, t: (key: string) => string, activeSection: string }) {
  return (
    <section id="me" className=" px-4 sm:px-6">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          className="bg-white dark:bg-background rounded-3xl  overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="grid lg:grid-cols-2 gap-12 p-6 sm:p-10 lg:p-16 items-center">
            {/* Left Content */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="space-y-6">
                <motion.h1
                  className="text-4xl text-center sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-100 leading-tight"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  {t("about.welcome")}
                  <br />
                  <span className="text-purple-600">{t("about.to")}</span>
                </motion.h1>

                <motion.p
                  className="text-lg text-center sm:text-xl text-gray-600 dark:text-gray-300 leading-relaxed"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  {t("about.subtitle")}
                </motion.p>
              </div>

              {/* Profile Card */}
              <motion.div
                className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-muted rounded-2xl"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <div className="w-48 h-24 sm:w-30  rounded-full overflow-hidden">
                  <Image
                    src="/steph.jpg"
                    alt="StephDev35"
                    width={200}
                    height={200}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <p className="text-sm text-center text-gray-600 dark:text-gray-300">
                    {t('about.motto')}
                  </p>

                </div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                className="flex flex  gap-4 text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
              >
                <motion.div {...scaleOnHover}>
                  <a href="/mon_cv/cv.pdf" download className="inline-block">
                    <Button
                      size="lg"
                      className="bg-gray-900 dark:bg-purple-600 hover:bg-gray-800 text-white px-8 py-3 rounded-full "
                    >
                      <Download className="mr-2 h-4 w-4" />
                      {t('about.download_cv')}
                    </Button>
                  </a>
                </motion.div>
                <motion.div {...scaleOnHover}>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-gray-300 text-gray-700 dark:text-white hover:bg-gray-50 px-8 py-3 rounded-full"
                    onClick={() => scrollToSection("contact")}
                  >
                    <Phone className="mr-2 h-4 w-4" />
                    {t('about.contact_me')}
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Right Content - Phone Mockup */}
            <motion.div
              className="flex justify-center lg:justify-end"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="relative">
                {/* Simulated Phone Side Buttons (all right side, desktop only) */}
                <div className="block absolute -right-1 top-24 h-12 w-2  bg-gray-900 dark:bg-purple-900 shadow-md" style={{ zIndex: 30 }} />
                <div className="block absolute -right-1 top-38 h-12 w-2 rounded-lg bg-gray-900 dark:bg-purple-900 shadow-md" style={{ zIndex: 30 }} />
                <div className="block absolute -right-1 top-56 h-10 w-2 rounded-lg bg-gray-900 dark:bg-purple-900 shadow-md" style={{ zIndex: 30 }} />
                {/* Phone Frame & Screen */}
                <div className="relative w-full max-w-[320px] sm:max-w-[360px] md:w-80 min-h-[600px] h-[650px] bg-gray-900 dark:bg-purple-900 rounded-[3rem] p-2 shadow-3xl overflow-visible md:overflow-hidden">
                  <div className="w-full h-full bg-white dark:bg-white/10 rounded-[2.5rem] overflow-visible md:overflow-hidden relative">
                    {/* Wallpaper full screen */}
                    <img
                      src="/dev.jpg"
                      alt="Dev IFT"
                      className="absolute inset-0 w-full h-full object-cover rounded-[2.5rem]"
                      style={{ zIndex: 0 }}
                    />
                    <div className="absolute inset-0 bg-black/20 dark:bg-black/40 rounded-[2.5rem]" style={{ zIndex: 1 }} />
                    {/* Content above wallpaper */}
                    <div className="relative z-10 flex flex-col h-full">
                      {/* Search Bar */}
                      <div className="px-4 pt-6">
                        <div className="flex items-center bg-white/90 dark:bg-gray-900/80 rounded-full shadow px-4 py-2 gap-3 w-full max-w-md mx-auto">
                          {/* Logo Google */}
                          <img
                            src="/google.png"
                            alt="Google"
                            className="w-5 h-5 object-contain"
                          />

                          {/* Champ de recherche */}
                          <input
                            type="text"
                            placeholder={t('about.phone_search_placeholder')}
                            className="flex-1 bg-transparent outline-none text-sm sm:text-base text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                          />

                          {/* Icône de recherche */}
                          <button className="text-gray-500 dark:text-gray-300 hover:text-purple-600 transition">
                            <Search className="w-4 h-4 sm:w-5 sm:h-5 mr-4" />
                          </button>
                        </div>
                      </div>

                      {/* Apps Grid */}
                      <div className="flex-1 flex flex-col items-center justify-end pt-8 pb-24">
                        <div className="grid grid-cols-3 gap-4">
                          {[
                            { name: "TypeScript", icon: "https://i.pinimg.com/736x/2f/4e/c7/2f4ec7f046a639f6ce091dc8df8e8797.jpg" },
                            { name: "React", icon: "https://i.pinimg.com/736x/d7/c6/c6/d7c6c614f625d028227f79fabdd6521d.jpg" },
                            { name: "Next.js", icon: "https://i.pinimg.com/736x/3f/f5/f9/3ff5f96fafaf0dacf5e6a8e69072f2dc.jpg" },
                            { name: "Laravel", icon: "https://i.pinimg.com/736x/de/86/29/de8629935b90d646b825e2adbfce0395.jpg" },
                            { name: "Python", icon: "https://i.pinimg.com/736x/d1/e0/e4/d1e0e4d8b16641b1cf652e190d62bbf2.jpg" },
                            { name: "PostgreSQL", icon: "https://i.pinimg.com/736x/dd/bd/aa/ddbdaa71dd2e6bd36ca4f9ff5acc2195.jpg" },
                          ].map((app, idx) => (
                            <div key={idx} className="flex flex-col items-center gap-1">
                              <div className="w-12 h-12 flex gap-4">
                                <img
                                  src={app.icon}
                                  alt={app.name}
                                  className="w-full h-full rounded-xl object-contain"
                                />
                              </div>
                              <span className="text-xs text-gray-900 dark:text-gray-100 font-medium truncate w-12 text-center">
                                {app.name}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                      {/* Navigation Bar (bottom) */}
                      <div className="block absolute bottom-0 left-0 w-full px-6 pb-4 z-20">
                        <div className="flex justify-between items-center bg-gray-100 dark:bg-gray-900/80 rounded-2xl px-6 py-2">
                          <button className="flex flex-col items-center text-xs text-gray-600 dark:text-gray-300">
                            <AlignJustify />
                          </button>
                          <button className="flex flex-col items-center text-xs text-gray-600 dark:text-gray-300">
                            <Circle />
                          </button>
                          <button className="flex flex-col items-center text-xs text-gray-600 dark:text-gray-300">
                            <ChevronLeft />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}