// @ts-nocheck
"use client";
import React, { useState, useEffect, useRef } from 'react';

export default function DecryptedText({
  text,
  speed = 50,
  maxIterations = 10,
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*",
  className = "",
  parentClassName = "",
  encryptedClassName = "",
  animateOn = "view", 
  sequential = false,
  revealDirection = "start",
  useOriginalCharsOnly = false,
}) {
  const [displayText, setDisplayText] = useState(text);
  const [isAnimating, setIsAnimating] = useState(false);
  const iterationRef = useRef(0);
  const intervalRef = useRef(null);

  const startAnimation = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    iterationRef.current = 0;
    
    intervalRef.current = setInterval(() => {
      setDisplayText((prev) => {
        let result = text.split("").map((char, index) => {
          if (char === " ") return " ";
          
          if (sequential) {
             const progress = iterationRef.current;
             if (revealDirection === "start" && index < progress) return char;
             if (revealDirection === "end" && index >= text.length - progress) return char;
          } else {
             if (iterationRef.current >= maxIterations) return char;
          }
          
          if (useOriginalCharsOnly) {
             const possible = text.replace(/\s/g, '');
             return possible[Math.floor(Math.random() * possible.length)];
          } else {
             return characters[Math.floor(Math.random() * characters.length)];
          }
        }).join("");
        
        return result;
      });
      
      iterationRef.current += sequential ? 0.5 : 1;
      
      if ((sequential && iterationRef.current > text.length) || (!sequential && iterationRef.current > maxIterations)) {
        clearInterval(intervalRef.current);
        setDisplayText(text);
        setIsAnimating(false);
      }
    }, speed);
  };

  useEffect(() => {
    if (animateOn === "view") {
      startAnimation();
    }
    return () => clearInterval(intervalRef.current);
  }, [animateOn, text]);

  return (
    <span 
      className={parentClassName} 
      onMouseEnter={animateOn === "hover" ? startAnimation : undefined}
      style={{ display: 'inline-block' }}
    >
      <span className={isAnimating ? encryptedClassName : className}>
        {displayText}
      </span>
    </span>
  );
}
