// @ts-nocheck
"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import LogoLoop from './LogoLoop';
import { Toolkit } from './Toolkit';
import Particles from './Particles';
import DecryptedText from './DecryptedText';

const techText = [
  "Software development", "UI/UX", "Figma", "Javascript", "TypeScript", "React", "Next.js", "Redux", 
  "Tailwind CSS", "Bootstrap", "ASP.NET Core", "C#", "CQRS", "Dapper", 
  "EF Core", "ADO.NET", "SQL Server", "AWS", "Docker", "SignalR"
];

const techLogos = techText.map(tech => ({
  node: <span style={{ fontSize: '1.4rem', fontWeight: '300', color: 'var(--text-secondary)', letterSpacing: '1px' }}>{tech}</span>,
  title: tech
}));

export function Hero() {
  const { scrollY } = useScroll();
  const [windowHeight, setWindowHeight] = useState(1000);
  const [isDark, setIsDark] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setWindowHeight(window.innerHeight || 1000);
    setIsMobile(window.innerWidth <= 768);
    
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);

    setIsDark(document.documentElement.classList.contains('dark'));
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          setIsDark(document.documentElement.classList.contains('dark'));
        }
      });
    });
    observer.observe(document.documentElement, { attributes: true });

    return () => {
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  }, []);


  const heroOpacity = useTransform(scrollY, [0, windowHeight * 0.4], [1, 0]);
  const heroScale = useTransform(scrollY, [0, windowHeight * 0.4], [1, 0.85]);

  const bioOpacity = useTransform(scrollY, 
    [windowHeight * 0.4, windowHeight * 0.6, windowHeight * 4.4, windowHeight * 4.6], 
    [0, 1, 1, 0]
  );
  const bioScale = useTransform(scrollY, 
    [windowHeight * 0.4, windowHeight * 1.5, windowHeight * 4.6], 
    [1, 1, 0.85]
  );

  const frontendOpacity = useTransform(scrollY, [windowHeight * 4.6, windowHeight * 5.0], [0, 1]);
  const frontendScale = useTransform(scrollY, [windowHeight * 4.6, windowHeight * 5.0], [1, 1]);

  const loopOpacityDesktop = useTransform(scrollY, [windowHeight * 4.4, windowHeight * 4.6], [1, 0]);
  const loopOpacityMobile = useTransform(scrollY, [windowHeight * 0.4, windowHeight * 0.6], [1, 0]);
  const loopOpacity = isMobile ? loopOpacityMobile : loopOpacityDesktop;

  const heroPointerEvents = useTransform(heroOpacity, v => v > 0.5 ? 'auto' : 'none');
  const bioPointerEvents = useTransform(bioOpacity, v => v > 0.5 ? 'auto' : 'none');
  const frontendPointerEvents = useTransform(frontendOpacity, v => v > 0.5 ? 'auto' : 'none');

  return (
    <div style={{ position: 'relative', width: '100%', height: isMobile ? '1000vh' : '1000vh' }}>
      
      <div style={{ position: 'sticky', top: 0, width: '100%', height: '100vh', overflow: 'hidden' }}>
        
        <motion.div 
          style={{ 
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', 
            zIndex: 10, background: 'transparent',
            opacity: heroOpacity, pointerEvents: heroPointerEvents
          }}
        >
          <div 
            id="hero-container"
            style={{ 
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start', 
              alignItems: 'flex-start',
              height: '100%', 
              width: '100%', 
              padding: '12vh 5% 0 5%', 
              boxSizing: 'border-box',
              overflow: 'hidden',
              background: 'var(--bg-color)', 
              transition: 'background 0.3s ease'
            }}
          >
            <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
              <Particles particleColors={['#ffffff', '#ffffff']} particleCount={200} particleSpread={10} speed={0.1} particleBaseSize={100} moveParticlesOnHover={true} alphaParticles={true} disableRotation={false} />
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              style={{
                position: 'relative',
                zIndex: 10,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'center',
                textAlign: 'left',
                width: '100%'
              }}
            >
              <div className="hero-layout" style={{ width: '100%' }}>

                {/* ARUN */}
                <h1 className="hero-title-arun" style={{ 
                  fontSize: 'clamp(2.5rem, 20vw, 25rem)', 
                  fontWeight: '900', 
                  lineHeight: '0.85', 
                  textTransform: 'uppercase', 
                  letterSpacing: '-0.05em',
                  backgroundImage: 'linear-gradient(to bottom, var(--text-primary) 60%, transparent 160%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  color: 'transparent',
                  fontFamily: 'Inter, system-ui, sans-serif',
                  transition: 'background-image 0.3s ease',
                  margin: 0
                }}>
                  ARUN
                </h1>

                {/* JOSEPH */}
                <h1 className="hero-title-joseph" style={{ 
                  fontSize: 'clamp(2.5rem, 20vw, 25rem)', 
                  fontWeight: '900', 
                  lineHeight: '0.85', 
                  textTransform: 'uppercase', 
                  letterSpacing: '-0.05em',
                  backgroundImage: 'linear-gradient(to bottom, var(--text-primary) 60%, transparent 160%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  color: 'transparent',
                  fontFamily: 'Inter, system-ui, sans-serif',
                  transition: 'background-image 0.3s ease',
                  margin: 0,
                  marginTop: '-0.05em'
                }}>
                  JOSEPH
                </h1>

                {/* Subtitle & Buttons */}
                <motion.div
                  className="hero-subtitle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.8 }}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    gap: '1.5rem'
                  }}
                >
                  <h2 style={{ 
                    maxWidth: '400px', fontSize: '1rem', fontWeight: '400', lineHeight: '1.5', margin: 0, 
                    color: 'var(--text-secondary)', letterSpacing: '0.02em', textTransform: 'uppercase',
                    transition: 'color 0.3s ease'
                  }}>
                    <DecryptedText
                      text="Software Engineer // Modern Enterprise Architecture"
                      animateOn="view"
                      revealDirection="start"
                      sequential
                      useOriginalCharsOnly={false}
                      speed={40}
                    />
                  </h2>
                  
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                    <button style={{ 
                      backgroundColor: 'transparent', color: 'var(--text-primary)', padding: '12px 32px', border: '1px solid var(--text-primary)', 
                      borderRadius: '0px', fontWeight: '700', fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase', 
                      cursor: 'pointer', transition: 'all 0.3s ease' 
                    }} 
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                    onMouseOver={(e) => { e.currentTarget.style.backgroundColor = 'var(--text-primary)'; e.currentTarget.style.color = 'var(--bg-color)'; }} 
                    onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'var(--text-primary)'; }} >
                      Let's Talk
                    </button>
                    <a href="/RESUME-%20ARUN%20JOSEPH-%20(ASP.NET%20%2B%20REACT)%20.pdf" download="Arun_Joseph_Resume.pdf" style={{ 
                      backgroundColor: 'transparent', color: 'var(--text-primary)', padding: '12px 32px', border: '1px solid var(--text-primary)', 
                      borderRadius: '0px', fontWeight: '700', fontSize: '0.85rem', letterSpacing: '0.1em', textTransform: 'uppercase', 
                      cursor: 'pointer', transition: 'all 0.3s ease', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center'
                    }} 
                    onMouseOver={(e) => { e.currentTarget.style.backgroundColor = 'var(--text-primary)'; e.currentTarget.style.color = 'var(--bg-color)'; }} 
                    onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'var(--text-primary)'; }} >
                      Download Resume
                    </a>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* 2. BIO SECTION */}
        <motion.div 
          className="bio-section"
          style={{ 
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', 
            display: 'flex', alignItems: 'center', justifyContent: 'flex-start', 
            padding: '0 5%', boxSizing: 'border-box',
            zIndex: 20, background: 'transparent',
            opacity: bioOpacity, scale: bioScale, pointerEvents: bioPointerEvents
          }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', width: '100%', gap: '5vw', alignItems: 'flex-start' }}>
            {/* Left Side: Massive Bio Text */}
            <div style={{ flex: '1 1 min(600px, 100%)', maxWidth: '1000px', textAlign: 'left' }}>
              <p className="bio-text" style={{ 
                fontSize: 'clamp(2rem, 3.5vw, 4rem)', 
                fontWeight: 500, 
                lineHeight: 1.3, 
                color: 'var(--text-primary)', 
                margin: 0,
                letterSpacing: '-0.02em',
                transition: 'color 0.3s ease'
              }}>
                Full Stack Software Engineer specializing in high-performance web applications using React and .NET Core, with expertise in cloud-native architecture and robust engineering.
              </p>
            </div>

            {/* Right Side: Quick Stats / Focus */}
            <div className="bio-stats-container" style={{ flex: '1 1 min(300px, 100%)', display: 'flex', flexDirection: 'column', gap: '2.5rem', marginTop: '1vh' }}>
              <div>
                <h3 style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--text-secondary)', letterSpacing: '0.15em', margin: '0 0 0.5rem 0' }}>
                  Current Focus
                </h3>
                <p style={{ fontSize: '1.2rem', margin: 0, fontWeight: 400, color: 'var(--text-primary)' }}>
                  Architecting Scalable Microservices
                </p>
              </div>
              
              <div style={{ width: '100%', height: '1px', backgroundColor: 'var(--text-secondary)', opacity: 0.2 }}></div>

              <div>
                <h3 style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--text-secondary)', letterSpacing: '0.15em', margin: '0 0 0.5rem 0' }}>
                  Core Tech Stack
                </h3>
                <p style={{ fontSize: '1.2rem', margin: 0, fontWeight: 400, color: 'var(--text-primary)' }}>
                  React, .NET Core, AWS, SQL Server
                </p>
              </div>

              <div style={{ width: '100%', height: '1px', backgroundColor: 'var(--text-secondary)', opacity: 0.2 }}></div>

              <div>
                <h3 style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--text-secondary)', letterSpacing: '0.15em', margin: '0 0 0.5rem 0' }}>
                  Status
                </h3>
                <p style={{ fontSize: '1.2rem', margin: 0, fontWeight: 400, color: 'var(--text-primary)' }}>
                  Available for new opportunities
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 3. FRONTEND SKILLS SECTION */}
        <motion.div 
          style={{ 
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', 
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 2rem', boxSizing: 'border-box',
            zIndex: 30, background: 'transparent', borderTop: '1px solid rgba(255,255,255,0.05)',
            opacity: frontendOpacity, scale: frontendScale, pointerEvents: frontendPointerEvents
          }}
        >
      

          <Toolkit scrollY={scrollY} windowHeight={windowHeight} thresholdMultiplier={4.6} />
        </motion.div>

        {/* LOGO LOOP LAYER (Unscaled) */}
        <motion.div 
          className="logoloop-layer"
          style={{ 
            position: 'absolute', bottom: isMobile ? '80px' : '20px', left: 0, right: 0, height: '80px', zIndex: 15,
            opacity: loopOpacity, pointerEvents: 'none'
          }}
        >
          <LogoLoop logos={techLogos} speed={80} direction="left" logoHeight={50} gap={60} hoverSpeed={0} scaleOnHover={false} fadeOut={true} fadeOutColor="transparent" ariaLabel="Technologies" />
        </motion.div>

      </div>
    </div>
  );
}
