// @ts-nocheck
"use client";
import React from 'react';
import { Globe } from './Globe';

export function Journey() {
  return (
    <div style={{ 
      position: 'relative', 
      width: '100%', 
      height: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center', 
      overflow: 'hidden',
      paddingTop: '10vh'
    }}>
      
      {/* "Globe" Title with Gradient */}
      <h2 style={{ 
        fontSize: 'clamp(4rem, 15vw, 8rem)', 
        fontWeight: '800', 
        letterSpacing: '-2px',
        background: 'linear-gradient(to bottom, var(--text-primary), var(--bg-color))',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        margin: 0,
        zIndex: 20,
        pointerEvents: 'none'
      }}>
        Globe
      </h2>

      {/* The Globe at the bottom */}
      <div style={{ 
        position: 'absolute', 
        bottom: '-40%', 
        width: '100%', 
        maxWidth: '1200px', 
        aspectRatio: '1 / 1', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        zIndex: 10 
      }}>
        <Globe />
      </div>

    </div>
  );
}
