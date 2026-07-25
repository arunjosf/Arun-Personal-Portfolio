// @ts-nocheck
"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValueEvent, useTransform } from 'framer-motion';
import { 
  Layout, PenTool, Search, Code, Wind, Database, FileJson, 
  Globe, Palette, Layers, Server, Cloud, Smartphone, Cpu, 
  CreditCard, Image, Mail, Scan, Map, Navigation, BrainCircuit, Box, Radio
} from 'lucide-react';

const categories = [
  {
    id: 'ui-ux',
    label: 'UI/UX',
    skills: [
      { name: 'UI/UX Design', icon: <Layout size={24} /> },
      { name: 'Figma', icon: <PenTool size={24} /> },
      { name: 'Wireframes', icon: <Box size={24} /> },
      { name: 'Prototyping', icon: <Layers size={24} /> },
      { name: 'User Research', icon: <Search size={24} /> },
    ]
  },
  {
    id: 'frontend',
    label: 'FRONTEND',
    skills: [
      { name: 'React.js', icon: <Code size={24} /> },
      { name: 'Next.js', icon: <Globe size={24} /> },
      { name: 'TypeScript', icon: <FileJson size={24} /> },
      { name: 'JavaScript', icon: <FileJson size={24} /> },
      { name: 'Redux', icon: <Database size={24} /> },
      { name: 'Tailwind CSS', icon: <Wind size={24} /> },
      { name: 'HTML5', icon: <Globe size={24} /> },
      { name: 'CSS3', icon: <Palette size={24} /> },
      { name: 'Bootstrap', icon: <Layers size={24} /> },
    ]
  },
  {
    id: 'backend',
    label: 'BACKEND',
    skills: [
      { name: 'Clean Arch', icon: <Cpu size={24} /> },
      { name: '.NET Core', icon: <Server size={24} /> },
      { name: 'C#', icon: <Code size={24} /> },
      { name: 'REST APIs', icon: <Globe size={24} /> },
      { name: 'SignalR', icon: <Radio size={24} /> },
      { name: 'MediatR', icon: <Layers size={24} /> },
      { name: 'CQRS', icon: <Cpu size={24} /> },
      { name: 'Unit Testing', icon: <Search size={24} /> },
    ]
  },
  {
    id: 'database',
    label: 'DATABASE',
    skills: [
      { name: 'SQL Server', icon: <Database size={24} /> },
      { name: 'EF Core', icon: <Layers size={24} /> },
      { name: 'Dapper', icon: <Database size={24} /> },
      { name: 'ADO.NET', icon: <Server size={24} /> },
    ]
  },
  {
    id: 'cloud',
    label: 'CLOUD',
    skills: [
      { name: 'AWS', icon: <Cloud size={24} /> },
      { name: 'Docker', icon: <Box size={24} /> },
      { name: 'Vercel', icon: <Server size={24} /> },
      { name: 'Render', icon: <Layers size={24} /> },
      { name: 'GitHub Actions', icon: <Cpu size={24} /> },
    ]
  },
  {
    id: 'integrations',
    label: 'INTEGRATIONS',
    skills: [
      { name: 'RAG', icon: <BrainCircuit size={24} /> },
      { name: 'Razorpay', icon: <CreditCard size={24} /> },
      { name: 'Cloudinary', icon: <Image size={24} /> },
      { name: 'MailKit', icon: <Mail size={24} /> },
      { name: 'Tesseract OCR', icon: <Scan size={24} /> },
      { name: 'Leaflet', icon: <Map size={24} /> },
      { name: 'Photon Geo', icon: <Navigation size={24} /> },
    ]
  }
];

const flattenedSkills = categories.flatMap((cat, catIndex) => 
  cat.skills.map(skill => ({ ...skill, categoryIndex: catIndex }))
);

const SkillItem = ({ skill, index, scrollY, scrollPerSkill, windowHeight, ITEM_HEIGHT_PX, isMobile }) => {
  const targetScrollY = 2 * windowHeight + index * scrollPerSkill;
  
  const opacity = useTransform(
    scrollY, 
    [targetScrollY - scrollPerSkill, targetScrollY, targetScrollY + scrollPerSkill], 
    [0.1, 1, 0.1]
  );
  
  const scale = useTransform(
    scrollY, 
    [targetScrollY - scrollPerSkill, targetScrollY, targetScrollY + scrollPerSkill], 
    [0.85, 1, 0.85]
  );
  
  const numOpacity = useTransform(
    scrollY, 
    [targetScrollY - scrollPerSkill, targetScrollY, targetScrollY + scrollPerSkill], 
    [0.05, 0.3, 0.05]
  );

  return (
    <motion.div 
      style={{ 
        height: `${ITEM_HEIGHT_PX}px`, 
        display: 'flex', 
        alignItems: 'center', 
        gap: isMobile ? '1rem' : '2rem',
        opacity,
        scale,
        transformOrigin: isMobile ? 'center center' : 'left center',
        paddingRight: isMobile ? '0' : '5%',
        width: '100%',
        boxSizing: 'border-box',
        justifyContent: isMobile ? 'center' : 'flex-start'
      }}
    >
      <motion.h2 style={{ 
        fontSize: isMobile ? '2rem' : '2.5rem', 
        fontWeight: 900, 
        color: 'var(--text-primary)', 
        margin: 0,
        opacity: numOpacity,
        fontFamily: 'monospace'
      }}>
        {(index + 1).toString().padStart(2, '0')}
      </motion.h2>
      
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: isMobile ? '0.75rem' : '1.25rem',
        color: 'var(--text-primary)',
        fontSize: isMobile ? '1.25rem' : '2rem',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.02em'
      }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          color: 'var(--text-primary)' 
        }}>
          {skill.icon}
        </div>
        {skill.name}
      </div>
    </motion.div>
  );
};

export function Toolkit({ scrollY, windowHeight }) {
  const [activeSkillIndex, setActiveSkillIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize(); 
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollDistance = 4.5 * windowHeight;
  const scrollPerSkill = scrollDistance / Math.max(1, (flattenedSkills.length - 1));

  useMotionValueEvent(scrollY, "change", (latest) => {
    const threshold = 2 * windowHeight;
    const progress = latest - threshold;
    
    if (progress < 0) {
      if (activeSkillIndex !== 0) setActiveSkillIndex(0);
      return;
    }

    const targetIndex = Math.round(progress / scrollPerSkill);
    const clampedIndex = Math.max(0, Math.min(targetIndex, flattenedSkills.length - 1));
    
    if (clampedIndex !== activeSkillIndex) {
      setActiveSkillIndex(clampedIndex);
    }
  });

  const ITEM_HEIGHT_PX = windowHeight * 0.15; 

  const rightColumnY = useTransform(
    scrollY,
    [2 * windowHeight, 2 * windowHeight + scrollDistance],
    [0, -(flattenedSkills.length - 1) * ITEM_HEIGHT_PX]
  );

  const activeCategory = categories[flattenedSkills[activeSkillIndex]?.categoryIndex || 0];

  return (
    <div 
      style={{ 
        width: '100%', 
        height: '100vh',
        display: 'flex', 
        flexDirection: isMobile ? 'column' : 'row',
        padding: isMobile ? '0 5%' : '0 5%',
        position: 'relative',
        boxSizing: 'border-box',
        overflow: 'hidden'
      }}
    >
      <div style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        justifyContent: 'space-between',
        padding: '0 5%',
        boxSizing: 'border-box',
        pointerEvents: 'none',
        opacity: 0.05,
        zIndex: 0
      }}>
        {[...Array(10)].map((_, i) => (
          <div key={i} style={{ width: '1px', height: '100%', background: 'var(--text-primary)' }} />
        ))}
      </div>

      <div style={{ 
        flex: isMobile ? '0 0 25vh' : '1', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: isMobile ? 'flex-end' : 'center', 
        zIndex: 10 
      }}>
        <div style={{ position: 'relative', height: isMobile ? '80px' : '200px', display: 'flex', alignItems: 'center', justifyContent: isMobile ? 'center' : 'flex-start' }}>
          <AnimatePresence mode="wait">
            <motion.h1
              key={activeCategory.id}
              initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              style={{
                position: 'absolute',
                fontSize: activeCategory.id === 'integrations' ? 'clamp(2rem, 5vw, 6.5rem)' : 'clamp(3rem, 7vw, 8rem)',
                fontWeight: 900,
                lineHeight: 0.9,
                margin: isMobile ? '0' : '0 0 0 -5px',
                letterSpacing: '-2px',
                color: 'var(--text-primary)',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
                textAlign: isMobile ? 'center' : 'left'
              }}
            >
              {activeCategory.label}
            </motion.h1>
          </AnimatePresence>
        </div>
      </div>

      {/* Center Divider Line with Ruler (Hidden on Mobile) */}
      {!isMobile && (
        <div style={{ width: '40px', height: '80%', margin: 'auto 4vw', position: 'relative', zIndex: 5, display: 'flex', justifyContent: 'flex-start' }}>
        {/* Main Vertical Line */}
        <div style={{ width: '1px', height: '100%', background: 'var(--text-primary)', opacity: 0.15 }}></div>

        {/* Ruler Tick Marks extending to the right */}
        <div style={{ 
          position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '1px',
          display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '3vh' 
        }}>
          {[...Array(9)].map((_, i) => {
            const isCenter = i === 4; 
            return (
              <div key={i} style={{ 
                width: isCenter ? '24px' : '8px', 
                height: '1px', 
                background: 'var(--text-primary)', 
                opacity: isCenter ? 0.8 : 0.2
              }} />
            )
          })}
        </div>
      </div>
      )}

      {/* Right Column: Scrolling Flat List of Skills */}
      <div style={{ flex: '1', position: 'relative', zIndex: 10, height: isMobile ? '85vh' : '100vh', overflow: 'hidden' }}>
        <motion.div 
          style={{ 
            y: rightColumnY, 
            position: 'absolute', 
            top: isMobile ? '35vh' : '42.5vh', 
            left: 0, 
            width: '100%' 
          }}
        >
          {flattenedSkills.map((skill, index) => (
            <SkillItem 
              key={index}
              skill={skill}
              index={index}
              scrollY={scrollY}
              scrollPerSkill={scrollPerSkill}
              windowHeight={windowHeight}
              ITEM_HEIGHT_PX={ITEM_HEIGHT_PX}
              isMobile={isMobile}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
} 
