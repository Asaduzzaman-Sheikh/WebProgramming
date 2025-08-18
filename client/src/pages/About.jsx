import React, { useState, useEffect } from "react";

// This component creates the interactive, animated background effect.
const AnimatedBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // These calculations create a subtle parallax effect on the shapes
  const parallax = (speed) => {
    const x = (window.innerWidth - mousePosition.x * speed) / 100;
    const y = (window.innerHeight - mousePosition.y * speed) / 100;
    return { transform: `translateX(${x}px) translateY(${y}px)` };
  };

  return (
    <div className="absolute inset-0 z-0" style={parallax(1)}>
        {/* You can add more shapes or change their styles here */}
        <div className="shape shape-1" style={parallax(2)}></div>
        <div className="shape shape-2" style={parallax(4)}></div>
        <div className="shape shape-3" style={parallax(6)}></div>
        <div className="shape shape-4" style={parallax(3)}></div>
    </div>
  );
};


export default function About() {
  return (
    <div className="relative min-h-screen bg-slate-100 text-slate-800 flex flex-col items-center justify-center overflow-hidden p-4">
      {/* Renders the animated background */}
      <AnimatedBackground />

      {/* Main content container */}
      <div className="relative z-10 text-center animate-fadeInUp">
        <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 mb-4">
          Coming Soon
        </h1>
        <p className="text-lg md:text-2xl text-slate-600 max-w-2xl mx-auto">
          We're currently building something amazing and innovative. Our new page will be ready for you shortly. Stay tuned!
        </p>
      </div>

      {/* This style block contains the CSS for the animations and shapes */}
      <style>{`
        .shape {
          position: absolute;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(129, 140, 248, 0.4) 0%, rgba(129, 140, 248, 0) 70%);
          transition: transform 0.2s ease-out;
          animation: float 15s infinite ease-in-out alternate;
        }

        .shape-1 {
          width: 250px;
          height: 250px;
          top: 10%;
          left: 15%;
          animation-duration: 18s;
        }

        .shape-2 {
          width: 150px;
          height: 150px;
          top: 25%;
          right: 10%;
          animation-duration: 12s;
          animation-delay: 2s;
        }

        .shape-3 {
          width: 300px;
          height: 300px;
          bottom: 10%;
          left: 20%;
          animation-duration: 20s;
        }
        
        .shape-4 {
          width: 100px;
          height: 100px;
          bottom: 20%;
          right: 25%;
          animation-duration: 10s;
          animation-delay: 3s;
        }

        @keyframes float {
          0% {
            transform: translateY(20px) translateX(0px) scale(1);
          }
          50% {
            transform: translateY(-20px) translateX(20px) scale(1.05);
          }
          100% {
            transform: translateY(20px) translateX(0px) scale(1);
          }
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .animate-fadeInUp {
            animation: fadeInUp 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
