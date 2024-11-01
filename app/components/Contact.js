'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useAnimation } from 'framer-motion'
import { X, Send, CheckCircle, AlertCircle } from 'lucide-react'
import emailjs from 'emailjs-com'

const ProfessionalContactForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [status, setStatus] = useState({
    submitting: false,
    success: false,
    error: ''
  })
  const formRef = useRef(null)
  const controls = useAnimation()

  useEffect(() => {
    controls.start({ opacity: 1, y: 0 })
  }, [controls])

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData(prev => ({
      ...prev,
      [id]: value
    }))
  }

  const validateForm = () => {
    const { name, email, message } = formData
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!name.trim()) return 'Name is required'
    if (!email.trim()) return 'Email is required'
    if (!emailRegex.test(email)) return 'Invalid email address'
    if (!message.trim()) return 'Message is required'

    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
        setStatus({
            submitting: false,
            success: false,
            error: validationError
        });
        return;
    }

    setStatus({ submitting: true, success: false, error: '' });

    try {
        // Replace 'YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', and 'YOUR_USER_ID' with your actual EmailJS credentials
        await emailjs.send('service_4xhrpa6', 'template_oamt5bk', {
            name: formData.name,
            email: formData.email,
            message: formData.message
        }, 'nQhnYhzEyRIz91h0I');

        setStatus({ 
            submitting: false, 
            success: true, 
            error: '' 
        });

        // Reset form
        setFormData({
            name: '',
            email: '',
            message: ''
        });

        // Animate success notification
        controls.start({
            opacity: [0, 1, 1, 0],
            y: [20, 0, 0, -20],
            transition: { duration: 4, times: [0, 0.1, 0.9, 1] }
        });
    } catch (error) {
        setStatus({
            submitting: false,
            success: false,
            error: 'Failed to send message. Please try again.'
        });
    }
}

  const inputClasses = "w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
  const labelClasses = "block text-sm font-medium text-white/80 mb-2"

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-md"
    >
      <div className="w-full max-w-md bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl shadow-2xl border border-white/10 p-8 relative overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20"
          animate={{
            x: ['0%', '100%', '0%'],
          }}
          transition={{
            repeat: Infinity,
            repeatType: 'reverse',
            duration: 10,
          }}
        />
        <div className="relative z-10">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
          <h2 className="text-3xl font-bold text-center text-white mb-6 tracking-wider">
            Get in Touch
          </h2>
          
          <AnimatePresence>
            {status.error && (
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-red-500/20 text-red-300 p-3 rounded-lg mb-4 text-center"
              >
                {status.error}
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-4" ref={formRef}>
            <div>
              <label htmlFor="name" className={labelClasses}>
                Name
              </label>
              <input 
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className={inputClasses}
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label htmlFor="email" className={labelClasses}>
                Email
              </label>
              <input 
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className={inputClasses}
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label htmlFor="message" className={labelClasses}>
                Message
              </label>
              <textarea 
                id="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className={`${inputClasses} resize-none`}
                placeholder="Write your message here..."
              ></textarea>
            </div>

            <motion.button 
              type="submit" 
              disabled={status.submitting}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white py-3 rounded-lg transition-all duration-300 disabled:opacity-50 flex items-center justify-center"
            >
              {status.submitting ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                >
                  <Send size={20} />
                </motion.div>
              ) : (
                <>
                  <Send size={20} className="mr-2" />
                  Send Message
                </>
              )}
            </motion.button>
          </form>
        </div>
      </div>
      <AnimatePresence>
        {(status.success || status.error) && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={controls}
            exit={{ opacity: 0, y: -50 }}
            className={`fixed bottom-10 left-1/2 transform -translate-x-1/2 ${
              status.success ? 'bg-green-500' : 'bg-red-500'
            } text-white px-6 py-3 rounded-full shadow-lg flex items-center`}
          >
            {status.success ? (
              <CheckCircle size={24} className="mr-2" />
            ) : (
              <AlertCircle size={24} className="mr-2" />
            )}
            <span>{status.success ? 'Message sent successfully!' : status.error}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default ProfessionalContactForm