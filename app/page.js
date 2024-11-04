'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useAnimation } from 'framer-motion'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, ExternalLink, Github, Terminal, Database, Cloud, Cpu, Globe, Zap, Globe2, CpuIcon, Globe2Icon, ChartBar, Linkedin, Twitter, Facebook, Phone, Mail, CheckCircle, User, Sparkles, Brain, X, Menu } from 'lucide-react'
import FuchsiaBackground from './components/Background'
import ProfessionalContactForm from './components/Contact'
import Link from 'next/link'

// icons
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
    whileHover={{ scale: 1.02, rotateY: 5 }}
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
        <span
          key={index}
          className="px-3 py-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-sm font-semibold"
        >
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

  // successful message
  const [showNotification, setShowNotification] = useState(false)

  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const technologies = [
    { name: "TensorFlow", icon: Cpu, color: "blue", description: "Deep learning framework" },
    { name: "PyTorch", icon: Zap, color: "orange", description: "Machine learning library" },
    { name: "Scikit-learn", icon: ChartBar, color: "green", description: "Data mining and analysis" },
    { name: "Keras", icon: Globe, color: "red", description: "Neural network library" },
    { name: "OpenCV", icon: Cpu, color: "purple", description: "Computer vision toolkit" },
    { name: "NLTK", icon: Terminal, color: "yellow", description: "Natural language processing" },
    { name: "Pandas", icon: Database, color: "indigo", description: "Data manipulation tool" },
    { name: "NumPy", icon: Cloud, color: "pink", description: "Numerical computing library" },
  ]

  const teamMembers = [
    { name: "Jessi Pavia Martinez", role: "CEO && AI/ML Engineer" },
    { name: "Chanice Stlouis", role: "Backend Engineer" },
    {name: 'Alan Martinez Monroy', role: 'Technical Sales Consultant'},
  ]

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

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }

  
  const handleEmailSuccess = () => {
    setShowNotification(true)
    setTimeout(() => setShowNotification(false), 5000) // Hide notification after 5 seconds
  }


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

  const controls = useAnimation();

  const scrollToProject = (index) => {
    const container = projectsRef.current;
    const cards = container.getElementsByClassName('project-card');
    if (cards[index]) {
      const scrollLeft = cards[index].offsetLeft - container.offsetLeft;
      container.scrollTo({
        left: scrollLeft,
        behavior: 'smooth'
      });
      setCurrentProject(index);
    }
  };

  // Handle scroll events to update the current project
  const handleScroll = () => {
    const container = projectsRef.current;
    const cards = container.getElementsByClassName('project-card');
    const scrollLeft = container.scrollLeft;
    
    // Find the card that is most visible
    let minDistance = Infinity;
    let closestIndex = 0;
    
    Array.from(cards).forEach((card, index) => {
      const cardLeft = card.offsetLeft - container.offsetLeft;
      const distance = Math.abs(cardLeft - scrollLeft);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });
    
    setCurrentProject(closestIndex);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white overflow-hidden flex flex-col">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-950/90 backdrop-filter backdrop-blur-lg border-b border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center">
              <a href="#" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                AI Solutions
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {['Home', 'Projects', 'Achievements'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-gray-800/50 hover:text-white text-gray-300 relative group"
                >
                  {item}
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                </a>
              ))}
              <button
                onClick={() => setShowContactForm(true)}
                className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-sm font-medium transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 hover:scale-105"
              >
                Contact Us
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-lg text-gray-300 hover:bg-gray-800/50"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-gray-950/90 border-t border-gray-800/50"
            >
              <div className="px-4 pt-2 pb-4 space-y-2">
                {['Home', 'Projects', 'Achievements'].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="block px-4 py-3 rounded-lg text-sm font-medium text-gray-300 hover:bg-gray-800/50 hover:text-white"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </a>
                ))}
                <button
                  onClick={() => {
                    setShowContactForm(true);
                    setIsMenuOpen(false);
                  }}
                  className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-sm font-medium"
                >
                  Contact Us
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>


      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-20 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center"
          >
            <CheckCircle className="mr-2" />
            <span>Email sent successfully!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center pt-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(67,56,202,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/50 to-gray-950"></div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center max-w-4xl px-4 mx-auto"
        >
          <div className="inline-block mb-6">
            <span className="px-4 py-2 rounded-full text-sm font-medium bg-gray-800/50 border border-gray-700 text-gray-300">
              Innovative Software Solutions
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 leading-tight">
            Transform Your Business with AI Solutions
          </h1>
          
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Empowering enterprises with cutting-edge artificial intelligence and machine learning solutions that drive growth and innovation.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={() => setShowContactForm(true)} className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-medium text-white transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 hover:scale-105">
              Schedule a Consultation
            </button>
          </div>
        </motion.div>

        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-gray-950 to-transparent"></div>
        <div className="absolute -bottom-48 left-1/2 transform -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full filter blur-3xl opacity-20"></div>
      </section>

      <FuchsiaBackground />
      
      <div className="relative z-10">
        <section id="projects" className="relative min-h-screen py-24 overflow-hidden text-center">
        {/* Animated background elements */}
          <div className="fixed inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_theme(colors.blue.500/0.1),_transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_theme(colors.purple.500/0.1),_transparent_50%)]" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            {/* Header Section */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-20"
            >
              <h1 className="text-7xl font-extrabold mb-6 relative inline-block">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 animate-text-gradient">
                  Next-Gen AI Solutions
                </span>
                <motion.div 
                  className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                />
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Empowering enterprises with cutting-edge artificial intelligence and machine learning solutions
              </p>
            </motion.div>

            {/* Projects Carousel */}
            <div className="relative mb-32">
      <div 
        className="relative overflow-x-hidden scrollbar-none scroll-smooth" 
        ref={projectsRef}
        onScroll={handleScroll}
      >
        <motion.div
          className="flex flex-nowrap min-w-full"
          drag="x"
          dragConstraints={projectsRef}
          onDragEnd={(e, info) => {
            // Update current project after drag
            handleScroll();
          }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="project-card flex-none w-full sm:w-[85vw] md:w-[600px] p-4"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <div className="group relative rounded-xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/90 group-hover:from-transparent group-hover:to-gray-900/95 transition-all duration-300" />
                <ProjectCard
                  project={project}
                  isActive={index === currentProject}
                  onClick={() => scrollToProject(index)}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      {/* Indicators */}
      <div className="flex justify-center mt-4 gap-2">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToProject(index)}
            className={`h-2 transition-all duration-300 rounded-full ${
              index === currentProject 
                ? 'w-8 bg-blue-500' 
                : 'w-2 bg-gray-400 hover:bg-gray-300'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>

            {/* Featured Projects */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mb-32"
            >
              <h2 className="text-5xl font-bold text-center mb-16 relative inline-block">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-300">
                  Featured Projects
                </span>
                <motion.div 
                  className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-300 to-white"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1.2, duration: 0.8 }}
                />
              </h2>
              
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-24"
              >
                {showcaseProjects.map((project, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl" />
                    <DiagonalProjectShowcase project={project} index={index} />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Software Projects */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="space-y-24"
            >
              <h2 className="text-5xl font-bold text-center mb-16 relative inline-block">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-300">
                  Software Solutions
                </span>
                <motion.div 
                  className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-white"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1.4, duration: 0.8 }}
                />
              </h2>
              
              {softwareProjects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <SoftwareProjectShowcase 
                    project={project} 
                    index={index} 
                    reverse={index % 2 === 0} 
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
        <section id='achievements' className="mb-32">
          <h2 className="text-5xl font-bold text-center mb-20 relative overflow-hidden">
          <span className="inline-block relative after:content-[''] after:absolute after:w-full after:h-1 after:bg-gradient-to-r after:from-white after:to-blue-300 after:bottom-0 after:left-0">
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
      </section>

      {/* New Team Section */}
      <section id='team' className="mb-32">
      <h2 className="text-5xl font-bold text-center mb-20 relative overflow-hidden">
        <span className="inline-block relative after:content-[''] after:absolute after:w-full after:h-1 after:bg-gradient-to-r after:from-blue-500 after:to-purple-600 after:bottom-0 after:left-0">
          Our Team
        </span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
        {teamMembers.map((member, index) => (
          <motion.div
            key={index}
            className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg overflow-hidden shadow-lg p-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4">
                <User className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
              <p className="text-gray-400">{member.role}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>

        {/* New Technologies Section */}
        <section id="technologies" className="relative min-h-screen py-24 overflow-hidden bg-gradient-to-b from-gray-900 to-black">
      {/* Section Header */}
      <div className="relative z-10 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="w-6 h-6 text-blue-400 mr-2" />
            <h2 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Technologies We Master
            </h2>
            <Sparkles className="w-6 h-6 text-blue-400 ml-2" />
          </div>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Our team harnesses the power of cutting-edge technologies to craft 
            innovative AI solutions that define the future of technology.
          </p>
        </motion.div>
      </div>

      {/* Technologies Grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {technologies.map((tech, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="group"
            >
              <div className="relative bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 h-full border border-gray-700/50 transition-all duration-300 hover:border-blue-500/50">
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-all duration-300" />

                {/* Tech Icon */}
                <div className="relative">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br from-${tech.color}-500/20 to-${tech.color}-500/10 flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-${tech.color}-500/20`}>
                    <tech.icon className={`w-8 h-8 text-${tech.color}-400`} />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">
                  {tech.name}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {tech.description}
                </p>

                {/* Learn More Link */}
                <motion.div 
                  className="mt-4 opacity-0 group-hover:opacity-100 transition-all duration-300"
                  whileHover={{ x: 5 }}
                >
                  <a href="#" className="inline-flex items-center text-blue-400 text-sm hover:text-blue-300">
                    Learn more
                    <Zap className="w-4 h-4 ml-1" />
                  </a>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
        <footer className="relative bg-gray-950 pt-24 pb-12 border-t border-gray-800/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              <div>
                <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 mb-6">
                  AI Solutions
                </h3>
                <p className="text-gray-400 max-w-xs">
                  Transforming businesses through innovative AI and machine learning solutions.
                </p>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-6 text-white">Quick Links</h4>
                <ul className="space-y-4">
                  {['Home', 'Projects', 'Achievements'].map((item) => (
                    <li key={item}>
                      <a href={`#${item.toLowerCase()}`} className="text-gray-400 hover:text-white transition-colors duration-200">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-6 text-white">Contact</h4>
                <ul className="space-y-4">
                  <li>
                    <a href="mailto:jessipav@trk-fndr.store" className="flex items-center text-gray-400 hover:text-white transition-colors duration-200">
                      <Mail className="w-5 h-5 mr-3" />
                      <span>jessipav@trk-fndr.store</span>
                    </a>
                  </li>
                  <li>
                    <a href="tel:+16463875453" className="flex items-center text-gray-400 hover:text-white transition-colors duration-200">
                      <Phone className="w-5 h-5 mr-3" />
                      <span>+1 (646) 387-5453</span>
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-6 text-white">Follow Us</h4>
                <div className="flex space-x-4">
                  <a href="https://github.com/JessiP23" className="p-2 bg-gray-800 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition-all duration-300">
                    <Github className="w-6 h-6" />
                  </a>
                  <a href="https://linkedin.com/in/jessip-software" className="p-2 bg-gray-800 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700 transition-all duration-300">
                    <Linkedin className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-800">
              <p className="text-center text-gray-400">
                © {new Date().getFullYear()} AI Solutions. All rights reserved.
              </p>
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