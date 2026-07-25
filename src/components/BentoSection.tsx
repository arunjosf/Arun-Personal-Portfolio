// @ts-nocheck
"use client";
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './BentoSection.css';

export function BentoSection() {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["end end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const features = [
    {
      num: "01",
      title: "Enterprise-Ready Engineering",
      desc: "Clean, thoroughly tested, enterprise-ready source code with full observability baked in from day one. Built to handle scale without accumulating technical debt."
    },
    {
      num: "02",
      title: "Relentless Optimization",
      desc: "Optimized for Core Web Vitals with ultra-fast rendering and aggressive asset optimization across every critical path. Speed is treated as a core feature."
    },
    {
      num: "03",
      title: "Future-Proof Infrastructure",
      desc: "Designing serverless microservices, highly secure API boundaries, and efficient data pipelines engineered to scale seamlessly with your growing user base."
    },
    {
      num: "04",
      title: "Impact-Driven Development",
      desc: "Bridging the gap between code and outcomes. Focused on cross-functional alignment, clear communication, and product strategies that drive real business value."
    }
  ];

  return (
    <motion.section 
      ref={containerRef}
      id="why-me"
      className="partner-container"
      style={{ scale, opacity, transformOrigin: 'top center' }}
    >
      <div className="partner-wrapper">
        <div className="partner-left">
          <p className="partner-overline">The Value Proposition</p>
          <h2 className="partner-title">Why<br/>Work<br/>With Me</h2>
        </div>
        
        <div className="partner-right">
          {features.map((feature, idx) => (
            <div key={idx} className="partner-item">
              <div className="partner-num">{feature.num}</div>
              <div className="partner-content">
                <h3 className="partner-item-title">{feature.title}</h3>
                <p className="partner-item-desc">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
