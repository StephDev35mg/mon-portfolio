import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CodeXml } from 'lucide-react';

interface CertificateSectionProps {
  fadeInUp: any;
  staggerContainer: any;
  t: (key: string) => string;
}

export default function Certificate({ fadeInUp, staggerContainer, t }: CertificateSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animatedOptions, setAnimatedOptions] = useState<number[]>([]);

  const options = [
    {
      title: 'Certification React.js',
      description: "Maîtrise du développement d'interfaces web modernes avec React.js.",
      image: '/certificats/reactFormation.jpg',
      icon: <CodeXml size={24} className="text-white" />,
    },
    {
      title: 'Certification Java & Python',
      description: 'Compétences solides en programmation orientée objet et scripts polyvalents.',
      image: '/certificats/JavaPythonFormation.jpg',
      icon: <CodeXml size={24} className="text-white" />,
    },
    {
      title: 'Certification Intelligence Artificielle',
      description: "Applications de l'IA au traitement du langage naturel (NLP).",
      image: '/certificats/iAFormation.jpg',
      icon: <CodeXml size={24} className="text-white" />,
    },
    {
      title: 'Certification Backend avec Django',
      description: "Création d'API REST robustes et sécurisées avec Django.",
      image: '/certificats/BackendFormation.jpg',
      icon: <CodeXml size={24} className="text-white" />,
    },
  ];

  const handleOptionClick = (index: number) => {
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    options.forEach((_, i) => {
      const timer = setTimeout(() => {
        setAnimatedOptions(prev => [...prev, i]);
      }, 180 * i);
      timers.push(timer);
    });
    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
    // eslint-disable-next-line
  }, []);

  return (
    <motion.section
      id="certificate"
      className="py-20 px-6 bg-white dark:bg-background"
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: '-100px' }}
    >
      <div className="container mx-auto max-w-7xl">
        <motion.div className="text-center mb-16" variants={fadeInUp}>
          <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">{t('certificate.title')}</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">{t('certificate.subtitle')}</p>
        </motion.div>
        <motion.div
          className="flex w-full max-w-5xl mx-auto min-h-[320px] md:min-h-[400px] items-stretch overflow-hidden relative gap-2"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {options.map((option, index) => (
            <motion.div
              key={index}
              className={`option relative flex flex-col justify-end overflow-hidden transition-all duration-700 ease-in-out ${activeIndex === index ? 'active' : ''}`}
              style={{
                backgroundImage: `url('${option.image}')`,
                backgroundSize: activeIndex === index ? 'auto 100%' : 'auto 120%',
                backgroundPosition: 'center',
                backfaceVisibility: 'hidden',
                opacity: animatedOptions.includes(index) ? 1 : 0,
                transform: animatedOptions.includes(index) ? 'translateX(0)' : 'translateX(-60px)',
                minWidth: activeIndex === index ? '300px' : '1px',
                minHeight: '100px',
                margin: 0,
                borderRadius: 0,
                borderWidth: '2px',
                borderStyle: 'solid',
                borderColor: activeIndex === index ? '#fff' : '#292929',
                cursor: 'pointer',
                backgroundColor: '#18181b',
                boxShadow: activeIndex === index
                  ? '0 20px 60px rgba(0,0,0,0.50)'
                  : '0 10px 30px rgba(0,0,0,0.30)',
                flex: activeIndex === index ? '7 1 0%' : '1 1 0%',
                zIndex: activeIndex === index ? 10 : 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                position: 'relative',
                overflow: 'hidden',
                willChange: 'flex-grow, box-shadow, background-size, background-position',
                transition: 'all 0.7s cubic-bezier(0.4,0,0.2,1)',
              }}
              onClick={() => handleOptionClick(index)}
              variants={fadeInUp}
              whileHover={{ scale: 1.03 }}
            >
              {/* Shadow effect */}
              <div
                className="shadow absolute left-0 right-0 pointer-events-none transition-all duration-700 ease-in-out"
                style={{
                  bottom: activeIndex === index ? '0' : '-40px',
                  height: '120px',
                  boxShadow: activeIndex === index
                    ? 'inset 0 -120px 120px -120px #000, inset 0 -120px 120px -80px #000'
                    : 'inset 0 -120px 0px -120px #000, inset 0 -120px 0px -80px #000',
                }}
              ></div>
              {/* Label with icon and info */}
              <div className="label absolute left-0 right-0 bottom-5 flex items-center justify-start h-12 z-2 pointer-events-none px-4 gap-3 w-full">
                <div className="icon min-w-[44px] max-w-[44px] h-[44px] flex items-center justify-center rounded-full bg-[rgba(32,32,32,0.85)] backdrop-blur-[10px] shadow-[0_1px_4px_rgba(0,0,0,0.18)] border-2 border-[#444] flex-shrink-0 flex-grow-0 transition-all duration-200">
                  {option.icon}
                </div>
                <div className="info text-white whitespace-pre relative">
                  <div
                    className="main font-bold text-lg transition-all duration-700 ease-in-out"
                    style={{
                      opacity: activeIndex === index ? 1 : 0,
                      transform: activeIndex === index ? 'translateX(0)' : 'translateX(25px)',
                    }}
                  >
                    {option.title}
                  </div>
                  <div
                    className="sub text-base text-gray-300 transition-all duration-700 ease-in-out"
                    style={{
                      opacity: activeIndex === index ? 1 : 0,
                      transform: activeIndex === index ? 'translateX(0)' : 'translateX(25px)',
                    }}
                  >
                    {option.description}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <style jsx>{`
        @keyframes slideFadeIn {
          0% {
            opacity: 0;
            transform: translateX(-60px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes fadeInFromTop {
          0% {
            opacity: 0;
            transform: translateY(-20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInTop {
          opacity: 0;
          transform: translateY(-20px);
          animation: fadeInFromTop 0.8s ease-in-out forwards;
        }
        .delay-300 {
          animation-delay: 0.3s;
        }
        .delay-600 {
          animation-delay: 0.6s;
        }
      `}</style>
    </motion.section>
  );
}