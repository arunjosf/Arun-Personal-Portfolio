// @ts-nocheck
"use client";
import React, { useRef, useEffect } from 'react';

export function DotGrid({
  dotSize = 4,
  gap = 18,
  baseColor = "#2F293A",
  activeColor = "#d7d2de",
  proximity = 120,
  speedTrigger = 100,
  shockRadius = 250,
  shockStrength = 5,
  maxSpeed = 5000,
  resistance = 750,
  returnDuration = 1.5
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    
    let dots = [];
    let mouse = { x: -1000, y: -1000, vx: 0, vy: 0, speed: 0 };
    let lastMouse = { x: -1000, y: -1000, time: performance.now() };
    
    const resize = () => {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
      
      dots = [];
      const cols = Math.floor(canvas.width / gap) + 1;
      const rows = Math.floor(canvas.height / gap) + 1;
      
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          dots.push({
            ox: i * gap, 
            oy: j * gap, 
            x: i * gap,
            y: j * gap,
            vx: 0,
            vy: 0
          });
        }
      }
    };
    
    window.addEventListener('resize', resize);
    resize();

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const currentX = e.clientX - rect.left;
      const currentY = e.clientY - rect.top;
      const currentTime = performance.now();
      
      const dt = currentTime - lastMouse.time;
      if (dt > 0) {
        const dx = currentX - lastMouse.x;
        const dy = currentY - lastMouse.y;
        mouse.vx = dx / dt;
        mouse.vy = dy / dt;
        mouse.speed = Math.sqrt(mouse.vx * mouse.vx + mouse.vy * mouse.vy) * 1000; 
      }
      
      mouse.x = currentX;
      mouse.y = currentY;
      lastMouse = { x: currentX, y: currentY, time: currentTime };
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
      mouse.speed = 0;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    const parseColor = (hex) => {
      if (hex.startsWith('#')) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return [r, g, b];
      }
      return [100, 100, 100];
    };

    const baseRgb = parseColor(baseColor);
    const activeRgb = parseColor(activeColor);

    const lerpColor = (c1, c2, t) => {
      return `rgb(${Math.round(c1[0] + (c2[0] - c1[0]) * t)}, ${Math.round(c1[1] + (c2[1] - c1[1]) * t)}, ${Math.round(c1[2] + (c2[2] - c1[2]) * t)})`;
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (const dot of dots) {
        const dx = mouse.x - dot.x;
        const dy = mouse.y - dot.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        let targetX = dot.ox;
        let targetY = dot.oy;
        let colorLerp = 0;

        if (dist < proximity) {
          colorLerp = 1 - (dist / proximity);
        }

        if (mouse.speed > speedTrigger && dist < shockRadius) {
          const force = (1 - dist / shockRadius) * shockStrength * (Math.min(mouse.speed, maxSpeed) / maxSpeed);
          targetX -= (dx / dist) * force * 100;
          targetY -= (dy / dist) * force * 100;
        }

        dot.vx += (targetX - dot.x) * (1 / (returnDuration * 60));
        dot.vy += (targetY - dot.y) * (1 / (returnDuration * 60));
        
        dot.vx *= (1 - resistance / 10000);
        dot.vy *= (1 - resistance / 10000);
        
        dot.x += dot.vx;
        dot.y += dot.vy;

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dotSize / 2, 0, Math.PI * 2);
        ctx.fillStyle = lerpColor(baseRgb, activeRgb, colorLerp);
        ctx.fill();
      }
      
      mouse.speed *= 0.95;

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [dotSize, gap, baseColor, activeColor, proximity, speedTrigger, shockRadius, shockStrength, maxSpeed, resistance, returnDuration]);

  return <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />;
}
