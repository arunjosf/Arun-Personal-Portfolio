// @ts-nocheck
"use client";
import React from 'react';
import { motion, useInView } from 'framer-motion';

export function TextAnimate({ 
  children, 
  animation = 'blurIn', 
  as: Component = 'p', 
  className = '', 
  style = {} 
}) {
  const text = typeof children === 'string' ? children : String(children);
  const words = text.split(" ");
  
  const MotionComponent = motion[Component];

  const variants = {
    blurIn: {
      hidden: { opacity: 0, filter: 'blur(10px)', y: 10 },
      visible: { opacity: 1, filter: 'blur(0px)', y: 0 }
    }
  };

  const selectedVariant = variants[animation] || variants.blurIn;

  return (
    <MotionComponent
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.5 }}
      className={className}
      style={{ ...style, display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={selectedVariant}
          transition={{ 
            duration: 0.6, 
            delay: i * 0.05, 
            ease: [0.2, 0.65, 0.3, 0.9] 
          }}
          style={{ display: 'inline-block', marginRight: '0.25em', willChange: 'filter, opacity, transform' }}
        >
          {word}
        </motion.span>
      ))}
    </MotionComponent>
  );
}
