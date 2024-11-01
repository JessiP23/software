import React from 'react';
import { useState, useEffect } from 'react';

const FuchsiaBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 20,
        y: (e.clientY / window.innerHeight) * 20
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden bg-black">
      {/* Background base */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 to-black opacity-50" />

      {/* Animated rings */}
      <div 
        className="absolute inset-0"
        style={{
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`
        }}
      >
        {/* Main ring */}
        <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2">
          <div className="absolute inset-0 animate-spin-slow">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 via-fuchsia-500 to-orange-400 blur-md opacity-80" 
                 style={{ transform: 'rotate(45deg)' }} />
          </div>
        </div>

        {/* Secondary ring */}
        <div className="absolute top-1/2 left-1/2 w-[550px] h-[550px] -translate-x-1/2 -translate-y-1/2">
          <div className="absolute inset-0 animate-spin-reverse-slow">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 via-purple-500 to-fuchsia-400 blur-md opacity-60" 
                 style={{ transform: 'rotate(-45deg)' }} />
          </div>
        </div>

        {/* Inner ring */}
        <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] -translate-x-1/2 -translate-y-1/2">
          <div className="absolute inset-0 animate-spin-slower">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-fuchsia-500 via-purple-600 to-blue-500 blur-md opacity-70" 
                 style={{ transform: 'rotate(90deg)' }} />
          </div>
        </div>

        {/* Floating orbs */}
        <div className="absolute top-1/4 left-1/4 w-8 h-8 rounded-full bg-purple-400 blur-sm animate-float opacity-60" />
        <div className="absolute bottom-1/4 right-1/4 w-6 h-6 rounded-full bg-fuchsia-400 blur-sm animate-float-delay opacity-60" />
        <div className="absolute top-1/3 right-1/3 w-4 h-4 rounded-full bg-orange-400 blur-sm animate-float-slow opacity-60" />
      </div>

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-30" />
      
      {/* Noise texture overlay */}
      <div className="absolute inset-0 opacity-[0.15] mix-blend-soft-light">
        <div className="absolute inset-0 bg-texture animate-grain" />
      </div>
    </div>
  );
};

// Add these styles to your tailwind.config.js
const styles = {
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'spin-slower': 'spin 30s linear infinite',
        'spin-reverse-slow': 'spin-reverse 25s linear infinite',
        'float': 'float 8s ease-in-out infinite',
        'float-delay': 'float 8s ease-in-out infinite 2s',
        'float-slow': 'float 10s ease-in-out infinite',
        'grain': 'grain 8s steps(10) infinite',
      },
      keyframes: {
        'spin-reverse': {
          '0%': { transform: 'rotate(360deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'grain': {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-5%, -10%)' },
          '20%': { transform: 'translate(-15%, 5%)' },
          '30%': { transform: 'translate(7%, -25%)' },
          '40%': { transform: 'translate(-5%, 25%)' },
          '50%': { transform: 'translate(-15%, 10%)' },
          '60%': { transform: 'translate(15%, 0%)' },
          '70%': { transform: 'translate(0%, 15%)' },
          '80%': { transform: 'translate(3%, 35%)' },
          '90%': { transform: 'translate(-10%, 10%)' },
        }
      },
    },
  },
};

export default FuchsiaBackground;