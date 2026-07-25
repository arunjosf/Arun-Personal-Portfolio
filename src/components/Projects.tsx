// @ts-nocheck
"use client";
import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, ExternalLink } from 'lucide-react';

const ProjectModal = ({ project, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 30, stiffness: 300 }}
      className="hide-scroll"
      data-lenis-prevent="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'var(--bg-color)',
        color: 'var(--text-primary)',
        overflowY: 'scroll',
        overflowX: 'hidden',
        WebkitOverflowScrolling: 'touch'
      }}
    >
      <style>
        {`
          .hide-scroll::-webkit-scrollbar {
            display: none;
          }
          .hide-scroll {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}
      </style>
      {/* Modal Header */}
      <div className="modal-header-container" style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '2rem 5vw',
        borderBottom: '1px solid rgba(150,150,150,0.2)'
      }}>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0, textTransform: 'uppercase' }}>
          Project Details
        </h3>
        <button 
          onClick={onClose}
          className="modal-close-btn"
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--text-primary)',
            cursor: 'pointer',
            padding: '0.5rem'
          }}
        >
          <X size={32} />
        </button>
      </div>

      {/* Modal Content */}
      <div style={{ padding: '4rem 5vw', paddingBottom: '10rem' }}>
        
        <div style={{ marginBottom: '4rem' }}>
          <a 
            href={project.link} 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}
          >
            <h1 style={{ 
              fontSize: 'clamp(3rem, 8vw, 6rem)', 
              fontWeight: 900, 
              margin: '0', 
              lineHeight: 0.9, 
              letterSpacing: '-0.02em',
              textTransform: 'uppercase'
            }}>
              {project.namePart1} <span style={{ color: 'transparent', WebkitTextStroke: '2px var(--text-primary)' }}>{project.namePart2}</span>
            </h1>
            <ExternalLink size={48} />
          </a>
        </div>

        <div style={{ marginBottom: '4rem' }}>
          <h4 className="modal-heading" style={{ fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem', opacity: 0.7 }}>Tech Stack</h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            {project.tech.map((t, i) => (
              <span key={i} className="modal-tech-stack" style={{
                padding: '0.75rem 1.5rem',
                border: '1px solid var(--text-primary)',
                borderRadius: '50px',
                fontSize: '0.9rem',
                fontWeight: 600,
                textTransform: 'uppercase'
              }}>
                {t}
              </span>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '6rem' }}>
          <h4 className="modal-heading" style={{ fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem', opacity: 0.7 }}>Overview</h4>
          <div>
            <a 
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="modal-video-container"
              style={{ 
                float: 'right', 
                width: '45%', 
                minWidth: '280px',
                maxWidth: '500px',
                marginLeft: '3rem', 
                marginBottom: '2rem',
                borderRadius: '12px', 
                overflow: 'hidden', 
                boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                display: 'block'
              }}>
               <video 
                 src={project.video} 
                 autoPlay loop muted playsInline 
                 style={{ width: '100%', height: 'auto', display: 'block', transition: 'transform 0.3s ease' }} 
                 onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                 onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
               />
            </a>
            <p className="modal-overview-text" style={{ 
              fontSize: 'clamp(1.2rem, 3vw, 2rem)', 
              lineHeight: 1.5, 
              margin: 0,
              fontWeight: 400
            }}>
              {project.description}
            </p>
            <div style={{ clear: 'both' }}></div>
          </div>
        </div>

        {/* Sticky Button */}
        <div style={{ position: 'sticky', bottom: '2rem', zIndex: 10, display: 'flex', justifyContent: 'flex-start' }}>
          <a 
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="modal-live-btn"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '1rem',
              padding: '1.5rem 3rem',
              background: 'var(--text-primary)',
              color: 'var(--bg-color)',
              textDecoration: 'none',
              fontSize: '1.5rem',
              fontWeight: 900,
              textTransform: 'uppercase',
              border: '2px solid var(--text-primary)',
              cursor: 'pointer',
              transition: 'transform 0.2s ease',
              boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.02) translateY(-4px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1) translateY(0)';
            }}
          >
            VIEW LIVE PROJECT <ExternalLink size={28} />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

// === PROJECT DISPLAY ===
const ProjectDisplay = ({ project, index, onOpenModal, isMobile }) => {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const textY = useTransform(scrollYProgress, [0, 1], ["-20vh", "20vh"]);
  const videoScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1, 0.85]);
  const inverseScale = useTransform(videoScale, v => 1 / v);

  const typographyStyle = {
    fontSize: 'clamp(4rem, 12vw, 15rem)',
    fontWeight: 900,
    lineHeight: 0.85,
    margin: 0,
    letterSpacing: '-0.05em',
    textTransform: 'uppercase',
    whiteSpace: 'nowrap'
  };

  return (
    <div 
      ref={containerRef}
      style={{
        position: 'relative',
        height: isMobile ? 'auto' : '150vh',
        padding: isMobile ? '2vh 0' : 0,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: 'transparent',
        marginBottom: isMobile ? '0' : '10vh'
      }}
    >
      <div 
        onClick={onOpenModal}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 20, 
          cursor: 'pointer'
        }}
      />

      {isMobile ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', zIndex: 10, pointerEvents: 'none', position: 'relative' }}>
          
          <div style={{ width: '90vw', height: 'auto', border: '1px solid rgba(150,150,150,0.2)', overflow: 'hidden', borderRadius: '12px', position: 'relative', zIndex: 1 }}>
             <video src={project.video} autoPlay loop muted playsInline style={{ width: '100%', height: 'auto', display: 'block' }} />
          </div>

          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', width: '100%', zIndex: 2 }}>
             <h2 style={{ fontSize: '8vw', fontWeight: 900, margin: 0, lineHeight: 0.9, letterSpacing: '-0.02em', color: '#ffffff' }}>{project.namePart1}</h2>
             <h2 style={{ fontSize: '8vw', fontWeight: 900, margin: 0, lineHeight: 0.9, letterSpacing: '-0.02em', color: 'transparent', WebkitTextStroke: '2px #ffffff' }}>{project.namePart2}</h2>
          </div>

        </div>
      ) : (
        <>
          {/* LAYER 1: BACKGROUND TEXT */}
      <motion.div 
        style={{
          position: 'absolute',
          zIndex: 0,
          top: '50%', left: '50%',
          width: '100vw', height: '150vh',
          x: '-50%', y: '-50%',
          pointerEvents: 'none'
        }}
      >
        <motion.div style={{
          position: 'absolute',
          top: '50%',
          left: 0,
          marginTop: '-15vh',
          y: textY,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: index % 2 === 0 ? 'flex-start' : 'flex-end',
          padding: '0 2vw',
          boxSizing: 'border-box'
        }}>
          <h2 style={{ ...typographyStyle, color: 'var(--text-primary)' }}>
            {project.namePart1}
          </h2>
          <h2 style={{ 
            ...typographyStyle, 
            color: 'transparent',
            WebkitTextStroke: '2px var(--text-primary)'
          }}>
            {project.namePart2}
          </h2>
        </motion.div>
      </motion.div>

      {/* LAYER 2: VIDEO CONTAINER */}
      <motion.div 
        style={{
          position: 'absolute',
          zIndex: 1,
          width: '85vw',
          height: '75vh',
          scale: videoScale,
          pointerEvents: 'none' 
        }}
      >
        <div style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          overflow: 'hidden',
          border: '1px solid rgba(255,255,255,0.1)'
        }}>
           <video 
             src={project.video}
             autoPlay
             loop
             muted
             playsInline
             style={{ width: '100%', height: '100%', objectFit: 'cover' }}
           />

           {/* LAYER 3: FOREGROUND TEXT */}
           <motion.div style={{
              position: 'absolute',
              top: '50%', left: '50%',
              width: '100vw', height: '150vh',
              x: '-50%', y: '-50%', 
              scale: inverseScale,
              pointerEvents: 'none'
           }}>
              <motion.div style={{
                position: 'absolute',
                top: '50%',
                left: 0,
                marginTop: '-15vh',
                y: textY,
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: index % 2 === 0 ? 'flex-start' : 'flex-end',
                padding: '0 2vw',
                boxSizing: 'border-box'
              }}>
                <h2 style={{ ...typographyStyle, color: '#fff' }}>
                  {project.namePart1}
                </h2>
                <h2 style={{ 
                  ...typographyStyle, 
                  color: 'transparent',
                  WebkitTextStroke: '2px #fff'
                }}>
                  {project.namePart2}
                 </h2>
              </motion.div>
           </motion.div>
        </div>
      </motion.div>
      </>
      )}
    </div>
  );
};

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    const handlePopState = () => {
      setSelectedProject(null);
    };
    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const openModal = (proj) => {
    setSelectedProject(proj);
    window.history.pushState({ modalOpen: true }, '');
  };

  const closeModal = () => {
    if (window.history.state?.modalOpen) {
      window.history.back();
    } else {
      setSelectedProject(null);
    }
  };

  const projects = [
    {
      namePart1: 'GRAND AUTO',
      namePart2: 'DEPOT ONE',
      video: '/project 1.mp4',
      link: 'https://gd-1-frontend-u2if.vercel.app/',
      tech: ['ASP.NET Core (.NET 8)', 'React.js', 'SQL Server', 'SignalR', 'MediatR', 'Docker', 'AWS', 'RAG'],
      description: 'A multi-tenant platform connecting vehicle owners, parking providers, and service centers for long-term vehicle storage, maintenance services and fleet management. Built with React and ASP.NET Core, integrated with RAG for an AI-powered chatbot, real-time messaging, OCR document verification, and advanced mapping.'
    },
    {
      namePart1: 'MARQELLE',
      namePart2: 'ECOMMERCE',
      video: '/MarqelleHomevideo - Trim.mp4',
      link: 'https://marqelle-ecommerce.vercel.app',
      tech: ['React', 'ASP.NET Core', 'SQL Server', 'Tailwind CSS', 'Razorpay', 'AWS'],
      description: 'A comprehensive e-commerce suite platform with product catalog, cart, wishlist, order management, and a full admin panel. Built with Clean Architecture on ASP.NET Core and React, seamlessly deployed on AWS.'
    }
  ];

  return (
    <>
      <section className="projects-section" id="works" style={{ position: 'relative', width: '100%', zIndex: 10, background: 'transparent' }}>
         <div style={{ padding: '0 5%', marginBottom: isMobile ? '2vh' : '5vh' }}>
           <h1 style={{ 
             fontSize: 'clamp(3rem, 8vw, 10rem)', 
             fontWeight: 900, 
             color: 'var(--text-primary)',
             margin: 0, 
             lineHeight: 0.9, 
             letterSpacing: '-0.05em' 
           }}>
             SELECTED <br/> <span style={{ color: 'transparent', WebkitTextStroke: '2px var(--text-primary)' }}>WORKS</span>
           </h1>
         </div>

         {projects.map((proj, idx) => (
           <ProjectDisplay 
             key={idx} 
             project={proj} 
             index={idx} 
             onOpenModal={() => openModal(proj)} 
             isMobile={isMobile}
           />
         ))}
      </section>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal 
            project={selectedProject} 
            onClose={closeModal} 
          />
        )}
      </AnimatePresence>
    </>
  );
}
