// @ts-nocheck
"use client";
import React, { useState, useEffect, useRef } from 'react';

const CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;':,./<>?";

export function LetterGlitch({
  glitchColors = ["#2b4539", "#F97316", "#EAB308"],
  glitchSpeed = 10,
  centerVignette = true,
  outerVignette = false,
  smooth = true,
}) {
  const containerRef = useRef(null);
  const [grid, setGrid] = useState([]);
  const [dimensions, setDimensions] = useState({ cols: 0, rows: 0 });

  useEffect(() => {
    if (!containerRef.current) return;
    const { clientWidth, clientHeight } = containerRef.current;
    
    const charSize = 24;
    const cols = Math.floor(clientWidth / charSize);
    const rows = Math.floor(clientHeight / charSize);
    
    setDimensions({ cols, rows });
    
    const initialGrid = Array(rows).fill(0).map(() => 
      Array(cols).fill(0).map(() => ({
        char: CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)],
        color: glitchColors[Math.floor(Math.random() * glitchColors.length)]
      }))
    );
    setGrid(initialGrid);
  }, []);

  useEffect(() => {
    if (dimensions.cols === 0) return;
    
    const intervalMs = Math.max(10, 200 - (glitchSpeed * 1.5));
    
    const interval = setInterval(() => {
      setGrid(prevGrid => prevGrid.map(row => 
        row.map(cell => {
          if (Math.random() > 0.9) {
            return {
              char: CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)],
              color: glitchColors[Math.floor(Math.random() * glitchColors.length)]
            };
          }
          return cell;
        })
      ));
    }, intervalMs);

    return () => clearInterval(interval);
  }, [dimensions, glitchColors, glitchSpeed]);

  return (
    <div 
      ref={containerRef}
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: '#000',
        fontFamily: 'monospace',
        fontSize: '20px',
        lineHeight: '24px',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        ...(centerVignette ? {
          background: 'radial-gradient(circle at center, transparent 30%, #000 100%)',
        } : {})
      }}
    >
      {centerVignette && (
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at center, transparent 20%, #000 80%)',
          pointerEvents: 'none',
          zIndex: 10
        }} />
      )}
      
      {grid.map((row, rIdx) => (
        <div key={rIdx} style={{ display: 'flex', width: '100%' }}>
          {row.map((cell, cIdx) => (
            <span 
              key={cIdx} 
              style={{ 
                width: '24px', 
                height: '24px', 
                display: 'inline-flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                color: cell.color,
                opacity: Math.random() > 0.8 ? 0.3 : 1 
              }}
            >
              {cell.char}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}
