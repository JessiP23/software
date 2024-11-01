'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, ExternalLink, Github, Terminal, Database, Cloud, Cpu, Globe, Zap, Globe2, CpuIcon, Globe2Icon, ChartBar } from 'lucide-react'
import FuchsiaBackground from './components/Background'
import ProfessionalContactForm from './components/Contact'

const Icon = ({ name, color }) => {
  const icons = {
    Cpu: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
        <rect x="9" y="9" width="6" height="6"></rect>
        <line x1="9" y1="1" x2="9" y2="4"></line>
        <line x1="15" y1="1" x2="15" y2="4"></line>
        <line x1="9" y1="20" x2="9" y2="23"></line>
        <line x1="15" y1="20" x2="15" y2="23"></line>
        <line x1="20" y1="9" x2="23" y2="9"></line>
        <line x1="20" y1="14" x2="23" y2="14"></line>
        <line x1="1" y1="9" x2="4" y2="9"></line>
        <line x1="1" y1="14" x2="4" y2="14"></line>
      </svg>
    ),
    Globe: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="2" y1="12" x2="22" y2="12"></line>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
      </svg>
    ),
    Zap: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
      </svg>
    ),
  }
  return icons[name] || null
}

const ProjectCard = ({ project, isActive, onClick }) => (
  <motion.div
    whileHover={{ scale: 1.05, rotateY: 5 }}
    whileTap={{ scale: 0.95 }}
    className={`bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 cursor-pointer transition-all duration-300 ${
      isActive ? 'ring-2 ring-blue-500 shadow-xl' : 'shadow-lg'
    }`}
    style={{ transformStyle: 'preserve-3d' }}
    onClick={onClick}
  >
    <div className="flex items-center space-x-4 mb-4">
      {project.icon}
      <h3 className="text-xl font-bold">{project.title}</h3>
    </div>
    <p className="text-gray-300 mb-4">{project.description}</p>
    <div className="flex flex-wrap gap-2 mb-4">
      {project.tags.map((tag, index) => (
        <span key={index} className="px-3 py-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-sm font-semibold">
          {tag}
        </span>
      ))}
    </div>
    <div className="grid grid-cols-3 gap-4 mt-4">
      {Object.entries(project.stats).map(([key, value]) => (
        <div key={key} className="text-center">
          <div className="text-lg font-bold text-blue-400">{value}</div>
          <div className="text-xs text-gray-400 capitalize">{key}</div>
        </div>
      ))}
    </div>
  </motion.div>
)

const DiagonalProjectShowcase = ({ project, index }) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [0, 1, 1, 0])

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity }}
      className="relative overflow-hidden rounded-3xl shadow-2xl mb-16"
    >
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="relative h-64 md:h-auto">
          <Image
            src={project.image}
            alt={project.title}
            layout="fill"
            objectFit="cover"
            className="z-0"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-transparent z-10" />
        </div>
        <div className="relative bg-gray-900 p-8 md:p-12 flex flex-col justify-center z-20">
          <h3 className="text-3xl font-bold mb-4 text-white">{project.title}</h3>
          <p className="text-gray-300 mb-6">{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag, index) => (
              <span key={index} className="px-3 py-1 bg-blue-600 rounded-full text-sm font-semibold text-white">
                {tag}
              </span>
            ))}
          </div>
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 w-fit"
          >
            <span>View Project</span>
            <ExternalLink className="ml-2 w-5 h-5" />
          </a>
        </div>
      </div>
      <div className="absolute top-0 bottom-0 right-0 w-1/2 bg-gray-900 transform -skew-x-12 origin-top-left z-10 hidden md:block" />
    </motion.div>
  )
}

const SoftwareProjectShowcase = ({ project }) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [0, 1, 1, 0])

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity }}
      className="relative overflow-hidden rounded-3xl shadow-2xl mb-16"
    >
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="relative bg-gray-900 p-8 md:p-12 flex flex-col justify-center z-20">
          <h3 className="text-3xl font-bold mb-4 text-white">{project.title}</h3>
          <p className="text-gray-300 mb-6">{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag, index) => (
              <span key={index} className="px-3 py-1 bg-blue-600 rounded-full text-sm font-semibold text-white">
                {tag}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-4 mb-6">
            {project.technologies.map((tech, index) => (
              <div key={index} className="flex items-center bg-gray-800 rounded-full px-3 py-1">
                <Icon name={tech.icon} color="#60A5FA" />
                <span className="ml-2 text-sm font-semibold text-gray-300">{tech.name}</span>
              </div>
            ))}
          </div>
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 w-fit"
          >
            <span>View Project</span>
            <ExternalLink className="ml-2 w-5 h-5" />
          </a>
        </div>
        <div className="relative h-64 md:h-auto">
          <Image
            src={project.image}
            alt={project.title}
            layout="fill"
            objectFit="cover"
            className="z-0"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-gray-900 to-transparent z-10" />
        </div>
      </div>
      <div className="absolute top-0 bottom-0 left-0 w-1/2 bg-gray-900 transform skew-x-12 origin-top-right z-10 hidden md:block" />
    </motion.div>
  )
}

const ParallaxBackground = () => {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <motion.div 
      className="fixed inset-0 z-0"
      style={{
        backgroundImage: 'url("/circuit-board.svg")',
        backgroundSize: 'cover',
        y
      }}
    />
  )
}


export default function AdvancedAIProjectsShowcase() {
  const [currentProject, setCurrentProject] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
  const [showContactForm, setShowContactForm] = useState(false)
  const projectsRef = useRef(null)
  const [isVisible, setIsVisible] = useState({});

  const [activeSection, setActiveSection] = useState('projects')

  // Add a timeline of achievements
  const achievements = [
    {
      title: "Market Launch",
      year: "2023",
      description: "Successfully launched our innovative platform, revolutionizing industry standards."
    },
    {
      title: "HeadStarter Pitch Demo",
      year: "2024",
      description: "Top 20 in HeadStarter Fellowship Pitch Demo"
    },
    {
      title: "Global Expansion",
      year: "2024",
      description: "Expanded operations to Latin America countries (Mexico)"
    },
  ];

  const projects = [
    {
      title: "AI-Powered Analytics Platform",
      description: "Enterprise-grade analytics solution with predictive modeling and real-time insights",
      tags: ["Machine Learning", "Big Data", "Real-time Analytics"],
      icon: <Database className="w-8 h-8 text-blue-400" />,
      stats: {
        accuracy: "91.2%",
        processing: "500K/sec",
        clients: "10+"
      }
    },
    {
      title: "AI-Powered Business Insights Suite",
      description: "Comprehensive AI tools for data analysis, predictive modeling, and automated reporting to drive business growth.",
      tags: ["AI", "Business Intelligence", "Predictive Analytics"],
      icon: <ChartBar className="w-8 h-8 text-purple-400" />,
      stats: {
        languages: "3",
        accuracy: "92%",
        documents: "15k+"
      }
    },
    {
      title: "Computer Vision Solutions",
      description: "State-of-the-art image recognition and processing systems",
      tags: ["Computer Vision", "Neural Networks", "Edge AI"],
      icon: <Cpu className="w-8 h-8 text-green-400" />,
      stats: {
        precision: "99.5%",
        processing: "60 FPS",
        deployments: "100+"
      }
    }
  ]

  const showcaseProjects = [
    {
      title: "Music Recomendation Engine",
      description: "AI-powered music app that collects and curates tracks from various artists to create personalized playlists tailored to each user's preferences",
      tags: ["PyTorch", "Machine Learning", "NumPy", 'LLM'],
      image: "/ai.png",
      link: "https://trk-murex.vercel.app/"
    },
    {
      title: "Song Rating",
      description: "Upload music, receive personalized insights and sentiment analysis for song ratings, and enjoy a tailored experience that enhances your musical journey, all powered by AI.",
      tags: ["NLP", "Machine Learning", "Chatbot"],
      image: "/ai1.png",
      link: "https://youtu.be/MrH74ZUbNC8"
    },
    {
      title: "Generation Script",
      description: "Optimize generation of scripts, landing pages, social media posts, and more with our AI-powered script generation tool. Boost productivity, reduce errors, and streamline content creation.",
      tags: ["AI", "Llama3.1", "Vector Database"],
      image: "/ai2.png",
      link: "https://youtu.be/L8878oVNRo8"
    },
    {
      title: "Flashcard AI",
      description: "Create flashcards, quizzes, and study guides with our AI-powered educational tool. Enhance learning, improve retention, and boost academic performance with our intelligent study assistant.",
      tags: ["Natural Language Processing", "Machine Learning", "Spaced Repetition Algorithm"],
      image: "/ai3.png",
      link: "https://youtu.be/Z-ERWzRB-OQ"
    },
    {
      title: "Chatbot clothing AI",
      description: "Intelligent virtual assistant designed to analyze user preferences and recommend personalized fashion choices, enhancing the online shopping experience through interactive dialogue and tailored suggestions.",
      tags: ["Graph Database", "Web Scraping", "Natural Language Processing", "Prompt Engineering"],
      image: "/chatbot.png",
      link: "https://youtu.be/54uBUoY3WRg"
    }
  ]

  const softwareProjects = [
    {
      title: "3D Structure Generator",
      description: "Generate your own 3D structure objects with a single request, enabling customization.",
      tags: ["NLP", "OpenGL", "Deep Learning", "GANs"],
      image: "/software1.png",
      link: "https://room-generation-6g7o.vercel.app/",
      technologies: [
        { name: "Q#", icon: "Zap" },
        { name: "Python", icon: "Globe" },
        { name: "WebAssembly", icon: "Cpu" },
      ]
    },
    {
      title: "Odoncology Software",
      description: "Ensure transparency, traceability, and security across the entirem software system.",
      tags: ["Blockchain", "Supply Chain", "Smart Contracts"],
      image: "/software3.png",
      link: 'https://youtu.be/UIUd1oJrMO4',
      // technologies
      technologies: [
        { name: "MySQL", icon: "Database" },
        { name: "Express.js", icon: "Globe" },
        { name: "React", icon: "Zap" },
      ]
    }
  ]


  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovering) {
        setCurrentProject((prev) => (prev + 1) % projects.length)
      }
    }, 5000)
    return () => clearInterval(interval)
  }, [isHovering, projects.length])

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({
              ...prev,
              [entry.target.dataset.index]: true
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[data-index]').forEach((el) => observer.observe(el));
    
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900 bg-opacity-80 backdrop-filter backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <a href="#" className="text-white font-bold text-xl">AI Solutions</a>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {['Projects', 'Achievements', 'Contact'].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    onClick={() => setActiveSection(item.toLowerCase())}
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className="relative h-screen flex items-center justify-center">
      
      <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-blue-800 opacity-75"></div>

      <div className="relative z-10 text-center max-w-3xl px-4">
        
        <p className="text-sm tracking-wider text-white/70 mb-2">Software Solutions</p>
        
        <h2 className="text-5xl md:text-6xl font-extrabold leading-tight">
          Build your software with our cutting-edge solutions
        </h2>
        
        <div className="mt-6">
          <button 
            onClick={() => setShowContactForm(true)}
            className="inline-flex items-center justify-center px-6 py-3 text-lg font-medium text-white bg-gradient-to-r from-pink-500 to-purple-600 rounded-full hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
          >
            Schedule an Appointment
          </button>
        </div>
      </div>
      </div>
      <FuchsiaBackground />
      <div className="relative z-10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-6xl font-extrabold mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600">
                Next-Gen AI Solutions
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Empowering enterprises with cutting-edge artificial intelligence and machine learning solutions
            </p>
          </motion.div>

          <div className="relative mb-16">
            <div className="flex overflow-x-hidden" ref={projectsRef}>
              <motion.div 
                className="flex"
                drag="x"
                dragConstraints={projectsRef}
                style={{ width: `${projects.length * 100}%` }}
              >
                {projects.map((project, index) => (
                  <motion.div
                    key={index}
                    className="w-full md:w-1/2 lg:w-1/3 p-4"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 }}
                  >
                    <ProjectCard
                      project={project}
                      isActive={index === currentProject}
                      onClick={() => setCurrentProject(index)}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <h2 className="text-4xl font-bold text-center mb-12">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                Featured Projects
              </span>
            </h2>
            {showcaseProjects.map((project, index) => (
              <DiagonalProjectShowcase key={index} project={project} index={index} />
            ))}
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            {softwareProjects.map((project, index) => (
              <SoftwareProjectShowcase key={index} project={project} index={index} reverse={index % 2 === 0} />
            ))}
          </motion.div>
        </div>
        <div className="mb-32">
        <h2 className="text-5xl font-bold text-center mb-20 relative overflow-hidden">
          <span className="inline-block relative after:content-[''] after:absolute after:w-full after:h-1 after:bg-gradient-to-r after:from-blue-500 after:to-purple-600 after:bottom-0 after:left-0">
            Our Milestones
          </span>
        </h2>
        
        <div className="relative">
          {/* Timeline central line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-blue-500 to-purple-600"></div>
          
          {achievements.map((achievement, index) => (
            <div
              key={index}
              data-index={`achievement-${index}`}
              className={`mb-20 flex items-center justify-center ${
                isVisible[`achievement-${index}`] ? 'opacity-100' : 'opacity-0'
              } transition-all duration-1000 ease-out`}
              style={{
                transform: isVisible[`achievement-${index}`] ? 'translateY(0)' : 'translateY(50px)'
              }}
            >
              <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'order-2 pl-8'}`}>
                <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  {achievement.title}
                </h3>
                <p className="text-gray-300">{achievement.description}</p>
              </div>
              
              <div className="w-2/12 relative flex justify-center">
                <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 bg-gray-900 rounded-full"></div>
                </div>
              </div>
              
              <div className={`w-5/12 ${index % 2 === 0 ? 'order-2 pl-8' : 'text-right pr-8'}`}>
                <span className="text-xl font-bold text-gray-400">{achievement.year}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
          {/* Footer */}
      <footer className="bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <p className="text-gray-400">&copy; 2023 AI Solutions. All rights reserved.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <Github className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Globe2Icon className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </footer>
      </div>


      <AnimatePresence>
        {showContactForm && (
          <ProfessionalContactForm onClose={() => setShowContactForm(false)} />
        )}
      </AnimatePresence>
    </div>
  )
}