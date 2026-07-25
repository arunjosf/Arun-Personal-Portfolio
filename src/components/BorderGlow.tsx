// @ts-nocheck
"use client";
import React, { useRef, useState } from 'react';
import './BorderGlow.css';

export default function BorderGlow({
  children,
  glowColor = 'rgba(255, 255, 255, 0.15)',
  backgroundColor = 'rgba(15, 15, 15, 0.6)',
  borderRadius = 16,
  glowRadius = 150,
  glowIntensity = 1,
  colors = [], 
  className = '',
  style = {},
  ...props
}) {
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: -1000, y: -1000 });
  };


  const gradientStops = colors.length > 0 
    ? `${colors.join(', ')}, transparent 100%`
    : `${glowColor}, transparent 100%`;

  return (
    <div
      ref={containerRef}
      className={`border-glow-wrapper ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        '--mouse-x': `${mousePos.x}px`,
        '--mouse-y': `${mousePos.y}px`,
        '--glow-stops': gradientStops,
        '--glow-radius': `${glowRadius}px`,
        '--glow-intensity': glowIntensity,
        '--bg-color': backgroundColor,
        '--border-radius': `${borderRadius}px`,
        ...style
      }}
      {...props}
    >
      <div className="border-glow-content">
        {children}
      </div>
    </div>
  );
}
