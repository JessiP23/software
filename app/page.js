'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, ExternalLink, Github, Terminal, Database, Cloud, Cpu } from 'lucide-react'

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
    whileHover={{ scale: 1.02 }}
    className={`bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 cursor-pointer transition-shadow duration-300 ${
      isActive ? 'ring-2 ring-blue-500 shadow-xl' : 'shadow-lg'
    }`}
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

const DiagonalProjectShowcase = ({ project, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.2 }}
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

export default function EnhancedAIProjectsShowcase() {
  const [currentProject, setCurrentProject] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
  const projectsRef = useRef(null)

  const projects = [
    {
      title: "AI-Powered Analytics Platform",
      description: "Enterprise-grade analytics solution with predictive modeling and real-time insights",
      tags: ["Machine Learning", "Big Data", "Real-time Analytics"],
      icon: <Database className="w-8 h-8 text-blue-400" />,
      stats: {
        accuracy: "99.8%",
        processing: "500K/sec",
        clients: "50+"
      }
    },
    {
      title: "Natural Language Processing Suite",
      description: "Advanced NLP tools for content analysis and automated document processing",
      tags: ["NLP", "Deep Learning", "Text Analytics"],
      icon: <Terminal className="w-8 h-8 text-purple-400" />,
      stats: {
        languages: "25+",
        accuracy: "98%",
        documents: "1M+"
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
      title: "AI-Driven Financial Forecasting",
      description: "Revolutionize financial planning with our AI-powered forecasting tool. Predict market trends, optimize investments, and make data-driven decisions with unparalleled accuracy.",
      tags: ["Finance", "Machine Learning", "Predictive Analytics"],
      image: "/placeholder.svg?height=600&width=800",
      link: "#financial-forecasting"
    },
    {
      title: "Intelligent Customer Service Bot",
      description: "Enhance customer satisfaction with our advanced NLP-powered chatbot. Handle inquiries 24/7, reduce response times, and provide personalized support at scale.",
      tags: ["NLP", "Customer Service", "Chatbot"],
      image: "/placeholder.svg?height=600&width=800",
      link: "#customer-service-bot"
    },
    {
      title: "Smart City Traffic Management",
      description: "Optimize urban traffic flow with our AI-driven traffic management system. Reduce congestion, improve safety, and decrease emissions using real-time data analysis and predictive modeling.",
      tags: ["Smart Cities", "IoT", "Computer Vision"],
      image: "/placeholder.svg?height=600&width=800",
      link: "#traffic-management"
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

  const handleScroll = (direction) => {
    if (projectsRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300
      projectsRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <ProjectCard
                project={project}
                isActive={index === currentProject}
                onClick={() => setCurrentProject(index)}
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center space-y-8 mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="inline-flex items-center space-x-4">
            <a 
              href="#contact"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
            >
              <span>Schedule a Demo</span>
              <ExternalLink className="ml-2 w-5 h-5" />
            </a>
            <a 
              href="#github"
              className="inline-flex items-center px-8 py-4 bg-gray-800 rounded-full text-lg font-semibold hover:bg-gray-700 transition-all duration-300"
            >
              <Github className="mr-2 w-5 h-5" />
              <span>View Projects</span>
            </a>
          </div>
        </motion.div>

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
      </div>
    </div>
  )
}