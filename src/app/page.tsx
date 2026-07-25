"use client";

import React, { useState, useEffect } from 'react';
import { useScroll } from 'framer-motion';
import { useTheme } from '@/components/ThemeProvider';
import { IntroAnimation } from '@/components/IntroAnimation';
import { Hero } from '@/components/Hero';
import { Toolkit } from '@/components/Toolkit';
import Projects from '@/components/Projects';
import { BentoSection } from '@/components/BentoSection';
import { Services } from '@/components/Services';
import { ChatContact } from '@/components/ChatContact';
import Particles from '@/components/Particles';
import { DesktopNav } from '@/components/DesktopNav';
import { Sun, Moon } from 'lucide-react';
import Lenis from 'lenis';

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
      {theme === 'light' ? <Moon size={24} /> : <Sun size={24} />}
    </button>
  );
}

export default function Page() {
  const [introDone, setIntroDone] = useState(false);
  const { scrollY } = useScroll();
  const [windowHeight, setWindowHeight] = useState(0);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    // Prevent browser from restoring previous scroll position
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    // Initialize Lenis for buttery smooth scrolling
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    
    setWindowHeight(window.innerHeight);
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, backgroundColor: 'var(--bg-color)', pointerEvents: 'none' }}>
        <Particles
          className=""
          particleCount={800}
          particleSpread={12}
          speed={0.1}
          particleColors={isDark ? ["#777777", "#999999"] : ["#000000", "#333333"]}
          moveParticlesOnHover={true}
          particleHoverFactor={1}
          alphaParticles={false}
          particleBaseSize={25}
          sizeRandomness={0.5}
          cameraDistance={20}
          disableRotation={false}
        />
      </div>

      {!introDone && <IntroAnimation onComplete={() => setIntroDone(true)} />}
      <ThemeToggle />
      <DesktopNav />
      
      <div style={{ position: 'relative', zIndex: 10 }}>
        <Hero />
        <Projects />
        <BentoSection />
        <Services />
        <ChatContact />
        <div style={{ height: '50vh' }}></div>
      </div>
    </>
  );
}
