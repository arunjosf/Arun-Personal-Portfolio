// @ts-nocheck
"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import './DesktopNav.css';

export function DesktopNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth <= 768);
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  const links = [
    { label: 'Home', action: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
    { label: 'About', action: () => window.scrollTo({ top: window.innerHeight * 0.5, behavior: 'smooth' }) },
    { label: 'Skills', action: () => window.scrollTo({ top: window.innerHeight * 2, behavior: 'smooth' }) },
    { label: 'Works', action: () => document.getElementById('works')?.scrollIntoView({ behavior: 'smooth' }) },
    { label: 'Why Choose Me', action: () => document.getElementById('why-me')?.scrollIntoView({ behavior: 'smooth' }) },
    { label: 'Services', action: () => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }) },
    { label: 'Contact Me', action: () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) },
  ];

  const handleLinkClick = (action) => {
    setIsOpen(false);
    setTimeout(() => action(), 50);
  };

  return (
    <div className="desktop-nav-container">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: isMobile ? -20 : 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: isMobile ? -20 : 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="desktop-nav-menu"
            style={{ transformOrigin: isMobile ? 'top left' : 'bottom right' }}
          >
            {links.map((link, idx) => (
              <button
                key={idx}
                className="desktop-nav-link"
                onClick={() => handleLinkClick(link.action)}
              >
                {link.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <button 
        className={`desktop-nav-fab ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Navigation Menu"
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>
    </div>
  );
}
