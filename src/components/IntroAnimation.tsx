// @ts-nocheck
"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LetterGlitch } from './LetterGlitch';

export function IntroAnimation({ onComplete }) {
  const [phase, setPhase] = useState(0); 

  useEffect(() => {
    if (phase === 0) {
      const timeout = setTimeout(() => {
        setPhase(2);
      }, 1200); 
      return () => clearTimeout(timeout);
    } else if (phase === 2) {
      setTimeout(() => setPhase(3), 400); 
    } else if (phase === 3) {
      setTimeout(onComplete, 300); 
    }
  }, [phase, onComplete]);

  return (
    <AnimatePresence>
      {phase < 3 && (
        <motion.div 
          className="intro-container"
          style={{ backgroundColor: '#000000' }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            style={{ position: 'absolute', inset: 0, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            initial={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            animate={phase === 2 ? {
              opacity: 0,
              scale: 3, 
              filter: "blur(10px)"
            } : { opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: phase === 2 ? 0.4 : 0, ease: "easeIn" }}
          >
            <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
              <LetterGlitch
                glitchColors={["#2b4539","#F97316","#EAB308"]}
                glitchSpeed={10}
                centerVignette={true}
                outerVignette={false}
                smooth={true}
              />
              
              {/* HELLO Text Overlay */}
              <div style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                fontSize: '15vw',
                fontWeight: '900',
                letterSpacing: '1vw',
                pointerEvents: 'none',
                zIndex: 20,
                mixBlendMode: 'difference',
                textShadow: '0 0 40px rgba(255,255,255,0.3)'
              }}>
                HELLO
              </div>
            </div>
          </motion.div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
