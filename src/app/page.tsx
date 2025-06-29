"use client"

import { useState, useEffect } from "react"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Moon, Sun, Github, Linkedin, Mail, CodeXml, ExternalLink, Menu, X, Download, Play, Phone, Flag, User, Brain, FileCode, Briefcase, ArrowUp, Facebook } from "lucide-react"
import { motion, useScroll, AnimatePresence } from "framer-motion"
import AboutSection from "@/components/sections/AboutSection"
import SkillsSection from "@/components/sections/SkillsSection"
import ProjectsSection from "@/components/sections/ProjectsSection"
import ExperienceSection from "@/components/sections/ExperienceSection"
import ContactSection from "@/components/sections/ContactSection"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { getT } from "@/lib/locale"
import { Skeleton } from "@/components/ui/skeleton"
import Certificate from "@/components/sections/Certificate"
function TabBarMobile({ activeSection, scrollToSection, t }: { activeSection: string, scrollToSection: (id: string) => void, t: (key: string) => string }) {
  const tabs = [
    { name: 'me', icon: <User className="h-5 w-5" /> },
    { name: 'skills', icon: <Brain className="h-5 w-5" /> },
    { name: 'projects', icon: <CodeXml className="h-5 w-5" /> },
    { name: 'experiences', icon: <Briefcase className="h-5 w-5" /> },
    { name: 'certificate', icon: <FileCode className="h-5 w-5" /> },
    { name: 'contact', icon: <Mail className="h-5 w-5" /> },
  ];
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-transparent">
      <div className="mx-auto max-w-[420px] px-2 ">
        <div className="flex justify-between items-center bg-gray-100/90 dark:bg-gray-900/90 rounded-2xl px-2 py-4 shadow-lg">
          {tabs.map(tab => (
            <button
              key={tab.name}
              onClick={() => scrollToSection(tab.name)}
              className={`flex flex-col items-center flex-1 py-1 rounded-xl transition-colors ${activeSection === tab.name ? 'text-white dark:text-purple-400 bg-purple-600 dark:bg-purple-900/40' : 'text-gray-600 dark:text-gray-300'}`}
            >
              {tab.icon}
              <span className="text-[10px] font-medium mt-0.5">{t(`navbar.${tab.name}`)}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default function Portfolio() {
  const [isHydrated, setIsHydrated] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const [activeSection, setActiveSection] = useState("me")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [language, setLanguage] = useState<'fr' | 'en'>('fr') // ou 'en'

  const { scrollYProgress } = useScroll()
  const t = getT(language)
  const [skills, setSkills] = useState<any[]>([])
  const [loadingSkills, setLoadingSkills] = useState(true)
  const [projects, setProjects] = useState<any[]>([])
  const [loadingProjects, setLoadingProjects] = useState(true)
  const [experiences, setExperiences] = useState<any[]>([])
  const [loadingExperiences, setLoadingExperiences] = useState(true)
  const [showScrollTop, setShowScrollTop] = useState(false)

  const navigationItems = [
    { name: "Me", href: "me" },
    { name: "Skills", href: "skills" },
    { name: "Projects", href: "projects" },
    { name: "Experiences", href: "experiences" },
    { name: "Certificate", href: "certificate" },
    { name: "Contact", href: "contact" },
  ]

  // Smooth scroll function
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const headerOffset = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
    setIsMobileMenuOpen(false)
  }

  // Scroll spy effect
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["me", "skills", "projects", "experiences", "certificate", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const scaleOnHover = {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
  }

  // Dark mode: init from localStorage or system, persist, and update <html> class
  useEffect(() => {
    const saved = localStorage.getItem("theme")
    if (saved) {
      setIsDark(saved === "dark")
    } else {
      setIsDark(window.matchMedia("(prefers-color-scheme: dark)").matches)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("theme", isDark ? "dark" : "light")
    if (isDark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDark])

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  useEffect(() => {
    fetch('/api/skills')
      .then(res => res.json())
      .then(data => {
        // Adapter les champs pour SkillsSection
        const formatted = Array.isArray(data) ? data.map((s: any) => ({
          name: s.nameSkills,
          image: s.imageSkills,
          category: s.category,
        })) : [];
        setSkills(formatted);
        setLoadingSkills(false);
      })
  }, [])

  useEffect(() => {
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => {
        // Adapter les champs pour ProjectsSection
        const formatted = Array.isArray(data) ? data.map((p: any) => ({
          title: p.titleProject,
          image: p.imageProject,
          description: p.description_P,
          tech: Array.isArray(p.tech) ? p.tech : (typeof p.tech === 'string' ? p.tech.split(',').map((t: string) => t.trim()) : []),
          github: p.liengithub,
          demo: p.demo,
        })) : [];
        setProjects(formatted);
        setLoadingProjects(false);
      })
  }, [])

  useEffect(() => {
    fetch('/api/experiences')
      .then(res => res.json())
      .then(data => {
        const formatted = Array.isArray(data) ? data.map((e: any) => ({
          title: e.titleExperience,
          company: e.company,
          period: e.period,
          description: e.descriptionExp,
        })) : [];
        setExperiences(formatted);
        setLoadingExperiences(false);
      });
  }, [])

  if (!isHydrated) return null;

  return (
    <div className="min-h-screen transition-colors duration-200">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-400 to-pink-400 z-50 origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Header */}
      <motion.header
        className="sticky top-0 z-40 bg-white/80 dark:bg-background/80 backdrop-blur-sm border-none "
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <motion.div
              className="flex items-center gap-2 cursor-pointer px-2 sm:px-4 py-2 sm:py-3"
              whileHover={{ scale: 1.05 }}
              onClick={() => scrollToSection("me")}
            >
              <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                StephDev35de
              </span>
            </motion.div>


            {/* Desktop Navigation */}
            <nav className="hidden md:flex gap-8">
              {navigationItems.map((item) => (
                <motion.button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className={`relative px-3 py-2 text-sm font-medium transition-colors ${activeSection === item.href
                    ? "text-purple-600 dark:text-purple-400"
                    : "text-gray-600 dark:text-gray-100 hover:text-purple-600 dark:hover:text-purple-400"
                    }`}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                >
                  {t(`navbar.${item.href}`) || item.name}
                  {activeSection === item.href && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400"
                      layoutId="activeSection"
                      initial={false}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </motion.button>
              ))}
            </nav>

            {/* Right side buttons */}
            <div className="flex items-center gap-4">



              <DropdownMenu>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex border-gray-300 text-gray-700 hover:bg-gray-50 items-center justify-center p-2 text-lg"
                    >
                      <span className="font-emoji text-xl">
                        {language === 'fr' ? '🇫🇷' : '🇬🇧'}
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-32">
                    <DropdownMenuItem
                      onClick={() => setLanguage('fr')}
                      className={language === 'fr' ? 'font-bold text-purple-600' : ''}
                    >
                      🇫🇷 <span className="ml-2">Français</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setLanguage('en')}
                      className={language === 'en' ? 'font-bold text-purple-600' : ''}
                    >
                      🇬🇧 <span className="ml-2">English</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenuContent align="end" className="w-32">
                  <DropdownMenuItem
                    onClick={() => setLanguage('fr')}
                    className={language === 'fr' ? 'font-bold text-purple-600' : ''}
                  >
                    🇫🇷 <span className="ml-2">Français</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setLanguage('en')}
                    className={language === 'en' ? 'font-bold text-purple-600' : ''}
                  >
                    🇬🇧 <span className="ml-2">English</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <motion.div {...scaleOnHover}>
                <Button
                  variant="outline"
                  size="sm"
                  className="md:flex border-gray-300 text-gray-700 hover:bg-gray-50"
                  onClick={() => {
                    if (typeof window !== 'undefined') {
                      const isMobile = /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);
                      if (isMobile) {
                        window.location.href = 'tel:+261333484162';
                      } else {
                        window.open('https://wa.me/261333484162', '_blank');
                      }
                    }
                  }}
                  aria-label="Contact via WhatsApp or Phone"
                >
                  <Phone className="h-4 w-4" />
                </Button>
              </motion.div>

              {/* Theme Toggle */}
              <motion.div {...scaleOnHover}>
                <Button variant="outline" size="sm" onClick={() => setIsDark(!isDark)} className="border-gray-300">
                  {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <AboutSection
        t={t}
        activeSection={activeSection}
        scrollToSection={scrollToSection}
        scaleOnHover={scaleOnHover}
      />

      {/* Skills Section */}
      {loadingSkills ? (
        <div className="px-6 py-12"><Skeleton className="h-12 w-40 mb-4" /><Skeleton className="h-32 w-full" /></div>
      ) : (
        <SkillsSection t={t} skills={skills} fadeInUp={fadeInUp} staggerContainer={staggerContainer} />
      )}

      {/* Projects Section */}
      {loadingProjects ? (
        <div className="px-6 py-12"><Skeleton className="h-12 w-40 mb-4" /><Skeleton className="h-32 w-full" /></div>
      ) : (
        <ProjectsSection t={t} projects={projects} fadeInUp={fadeInUp} staggerContainer={staggerContainer} />
      )}

      {/* Experiences Section */}
      {loadingExperiences ? (
        <div className="px-6 py-12"><Skeleton className="h-12 w-40 mb-4" /><Skeleton className="h-32 w-full" /></div>
      ) : (
        <ExperienceSection t={t} fadeInUp={fadeInUp} staggerContainer={staggerContainer} experiences={experiences} loading={loadingExperiences} />
      )}

      {/* Certificate Section */}
      <Certificate t={t} fadeInUp={fadeInUp} staggerContainer={staggerContainer} />

      {/* Contact Section */}
      <ContactSection t={t} scaleOnHover={scaleOnHover} fadeInUp={fadeInUp} staggerContainer={staggerContainer} />

      {/* Footer */}
      <motion.footer
        className="bg-gray-900 py-12 px-6"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.div
              className="mb-4 md:mb-0"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">S</span>
                </div>
                <span className="text-xl font-bold text-white">StephDev35</span>
              </div>
              <p className="text-gray-400">{t('footer.role')}</p>
            </motion.div>
            <motion.div
              className="flex gap-4"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              {[
                { Icon: Github, href: "https://github.com/StephDev35mg", label: "GitHub" },
                { Icon: Linkedin, href: "https://www.linkedin.com/in/stephen-gosinary-8041b42a6", label: "LinkedIn" },
                { Icon: Facebook, href: "https://www.facebook.com/ra.stepha.518077", label: "Facebook" },
                { Icon: Mail, href: "mailto:stephdev35@gmail.com", label: "Email" },
              ].map(({ Icon, href, label }, index) => (
                <motion.div key={index} whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.9 }}>
                  <Button
                    asChild
                    variant="outline"
                    size="icon"
                    className="bg-gray-800 text-white border-gray-700 hover:bg-gray-700"
                    aria-label={label}
                  >
                    <a href={href} target="_blank" rel="noopener noreferrer">
                      <Icon className="h-4 w-4" />
                    </a>
                  </Button>
                </motion.div>
              ))}
            </motion.div>
          </div>
          <motion.div
            className="border-t border-gray-800 mt-8 pt-8 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <p className="text-gray-400">© {new Date().getFullYear()} <Link href='/login'>StephDev35</Link>. {t('footer.rights')}</p>
          </motion.div>
        </div>
      </motion.footer>
      {/* Scroll to top button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            key="scrolltop"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.3 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-24 right-4 z-50 bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-lg p-3 md:p-4 transition-colors flex items-center justify-center"
            aria-label="Revenir en haut"
          >
            <ArrowUp className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>
      {/* Mobile Tab Bar */}
      <TabBarMobile activeSection={activeSection} scrollToSection={scrollToSection} t={t} />
    </div>
  )
}
