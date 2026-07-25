// @ts-nocheck
"use client";
import React from 'react';
import { motion } from 'framer-motion';

export function About() {
  return (
    <section 
      style={{ 
        position: 'relative', 
        zIndex: 20, 
        backgroundColor: 'transparent', 
        color: 'var(--text-primary)',
        height: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        boxSizing: 'border-box',
        overflow: 'hidden',
        scrollSnapAlign: 'start'
      }}
    >
      <div style={{ maxWidth: '1200px', width: '100%', margin: '0 auto', padding: '0 1.5rem', boxSizing: 'border-box' }}>
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            style={{ 
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', 
              fontWeight: '800', 
              letterSpacing: '-2px',
              margin: 0,
              textTransform: 'uppercase'
            }}
          >
            BEHIND THE <span style={{ color: 'var(--accent-color)' }}>CODE</span>
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ height: '2px', width: '60px', backgroundColor: 'var(--accent-color)', margin: '2rem auto' }}
          />
        </div>

        {/* Bio Section */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center' }}
        >
          <p style={{ 
            fontSize: 'clamp(1rem, 2vw, 1.4rem)', 
            color: 'var(--text-secondary)', 
            lineHeight: '1.8', 
            fontWeight: '300',
            maxWidth: '100%',
            margin: '0 auto',
            letterSpacing: '0px'
          }}>
            I am a Full Stack Developer architecting enterprise-grade backends with <strong style={{color: 'var(--text-primary)', fontWeight: '500'}}>ASP.NET Core</strong> and <strong style={{color: 'var(--text-primary)', fontWeight: '500'}}>SQL Server</strong>, seamlessly paired with highly intuitive <strong style={{color: 'var(--text-primary)', fontWeight: '500'}}>React.js</strong> frontends to transform complex requirements into robust software solutions.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
