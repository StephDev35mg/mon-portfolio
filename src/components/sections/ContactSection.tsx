import { motion } from "framer-motion"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Mail } from "lucide-react"
import { useState, useRef } from "react"
import { toast } from "sonner"

interface ContactSectionProps {
  fadeInUp: any;
  staggerContainer: any;
  scaleOnHover: any;
  t: (key: string) => string;
}

export default function ContactSection({ fadeInUp, staggerContainer, scaleOnHover, t }: ContactSectionProps) {
  const [form, setForm] = useState({ name: '', email: '', subject: '', commentaire: '' })
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [submitting, setSubmitting] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  const validate = () => {
    const newErrors: { [key: string]: string } = {}
    if (!form.name.trim()) newErrors.name = t('contact.error_name') || t('contact.error_required') || 'Required'
    if (!form.email.trim()) newErrors.email = t('contact.error_email') || t('contact.error_required') || 'Required'
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) newErrors.email = t('contact.error_email_format') || 'Invalid email'
    if (!form.subject.trim()) newErrors.subject = t('contact.error_subject') || t('contact.error_required') || 'Required'
    return newErrors
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(f => ({ ...f, [e.target.id]: e.target.value }))
    setErrors(errs => ({ ...errs, [e.target.id]: '' }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    setSubmitting(true)
    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) {
        toast.success(t('contact.success_title') || 'Message sent!', { description: t('contact.success_desc') || 'Your message has been sent.' })
        setForm({ name: '', email: '', subject: '', commentaire: '' })
        setErrors({})
        formRef.current?.reset()
      } else {
        const data = await res.json()
        toast.error(t('contact.error_title') || 'Error', { description: data.error || t('contact.error_desc') || 'An error occurred.' })
      }
    } catch (err) {
      toast.error(t('contact.error_title') || 'Error', { description: t('contact.error_desc') || 'An error occurred.' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <motion.section
      id="contact"
      className="py-10 px-6"
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="container mx-auto max-w-7xl">
        <motion.div className="text-center mb-16" variants={fadeInUp}>
          <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">{t("contact.title")}</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t("contact.subtitle")}
          </p>
        </motion.div>

        <motion.div className="max-w-2xl mx-auto" variants={fadeInUp}>
          <Card className="border-gray-200 dark:border-gray-700 bg-white dark:bg-muted shadow-lg">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-gray-100">{t("contact.title")}</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-300">{t("contact.subtitle")}</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6" ref={formRef} onSubmit={handleSubmit} noValidate>
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  variants={staggerContainer}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                >
                  <motion.div className="space-y-2" variants={fadeInUp}>
                    <Label htmlFor="name" className="text-gray-700 dark:text-gray-200">
                      {t('contact.form_name')}
                    </Label>
                    <Input
                      id="name"
                      placeholder={t('contact.form_name_placeholder') || 'Your name'}
                      className={`border-gray-300 dark:border-gray-700 bg-white dark:bg-background text-gray-900 dark:text-gray-100 ${errors.name ? 'border-red-500' : ''}`}
                      value={form.name}
                      onChange={handleChange}
                      disabled={submitting}
                      autoComplete="name"
                    />
                    {errors.name && <div className="text-red-500 text-xs mt-1">{errors.name}</div>}
                  </motion.div>
                  <motion.div className="space-y-2" variants={fadeInUp}>
                    <Label htmlFor="email" className="text-gray-700 dark:text-gray-200">
                      {t('contact.form_email')}
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder={t('contact.form_email_placeholder') || 'your.email@example.com'}
                      className={`border-gray-300 dark:border-gray-700 bg-white dark:bg-background text-gray-900 dark:text-gray-100 ${errors.email ? 'border-red-500' : ''}`}
                      value={form.email}
                      onChange={handleChange}
                      disabled={submitting}
                      autoComplete="email"
                    />
                    {errors.email && <div className="text-red-500 text-xs mt-1">{errors.email}</div>}
                  </motion.div>
                </motion.div>
                <motion.div className="space-y-2" variants={fadeInUp}>
                  <Label htmlFor="subject" className="text-gray-700 dark:text-gray-200">
                    {t('contact.form_subject')}
                  </Label>
                  <Input
                    id="subject"
                    placeholder={t('contact.form_subject_placeholder') || 'Project inquiry'}
                    className={`border-gray-300 dark:border-gray-700 bg-white dark:bg-background text-gray-900 dark:text-gray-100 ${errors.subject ? 'border-red-500' : ''}`}
                    value={form.subject}
                    onChange={handleChange}
                    disabled={submitting}
                    autoComplete="off"
                  />
                  {errors.subject && <div className="text-red-500 text-xs mt-1">{errors.subject}</div>}
                </motion.div>
                <motion.div className="space-y-2" variants={fadeInUp}>
                  <Label htmlFor="commentaire" className="text-gray-700 dark:text-gray-200">
                    {t('contact.form_message')}
                  </Label>
                  <Textarea
                    id="commentaire"
                    placeholder={t('contact.form_message_placeholder') || 'Tell me about your project...'}
                    className="min-h-[120px] border-gray-300 dark:border-gray-700 bg-white dark:bg-background text-gray-900 dark:text-gray-100"
                    value={form.commentaire}
                    onChange={handleChange}
                    disabled={submitting}
                    autoComplete="off"
                  />
                </motion.div>
                <motion.div variants={fadeInUp} {...scaleOnHover}>
                  <Button type="submit" className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3" disabled={submitting}>
                    {submitting ? (
                      <svg className="animate-spin h-5 w-5 mx-auto" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                    ) : (
                      <><Mail className="mr-2 h-4 w-4" />{t('contact.form_submit') || 'Send Message'}</>
                    )}
                  </Button>
                </motion.div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.section>
  )
} 
