// @ts-nocheck
"use client";
import React, { useEffect, useRef, useState } from "react"
import createGlobe from "cobe"
import { useMotionValue, useSpring } from "motion/react"

const MOVEMENT_DAMPING = 1400

const GLOBE_CONFIG = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 0,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 1.2,
  baseColor: [1, 1, 1],
  markerColor: [251 / 255, 100 / 255, 21 / 255],
  glowColor: [1, 1, 1],
  markers: [
    { location: [14.5995, 120.9842], size: 0.03 },
    { location: [19.076, 72.8777], size: 0.1 },
    { location: [23.8103, 90.4125], size: 0.05 },
    { location: [30.0444, 31.2357], size: 0.07 },
    { location: [39.9042, 116.4074], size: 0.08 },
    { location: [-23.5505, -46.6333], size: 0.1 },
    { location: [19.4326, -99.1332], size: 0.1 },
    { location: [40.7128, -74.006], size: 0.1 },
    { location: [34.6937, 135.5022], size: 0.05 },
    { location: [41.0082, 28.9784], size: 0.06 },
  ],
}

export function Globe({ className, config = GLOBE_CONFIG }) {
  const canvasRef = useRef(null)
  const phiRef = useRef(0)
  const thetaRef = useRef(config.theta || 0.3)
  const widthRef = useRef(0)
  
  const pointerInteracting = useRef(null) 

  const rPhi = useMotionValue(0)
  const rsPhi = useSpring(rPhi, {
    mass: 1,
    damping: 30,
    stiffness: 100,
  })

  const rTheta = useMotionValue(0)
  const rsTheta = useSpring(rTheta, {
    mass: 1,
    damping: 30,
    stiffness: 100,
  })

  const updatePointerInteraction = (clientX, clientY) => {
    if (clientX !== null && clientY !== null) {
      pointerInteracting.current = { x: clientX, y: clientY }
      if (canvasRef.current) {
        canvasRef.current.style.cursor = "grabbing"
      }
    } else {
      pointerInteracting.current = null
      if (canvasRef.current) {
        canvasRef.current.style.cursor = "grab"
      }
    }
  }

  const updateMovement = (clientX, clientY) => {
    if (pointerInteracting.current !== null) {
      const deltaX = clientX - pointerInteracting.current.x
      const deltaY = clientY - pointerInteracting.current.y
      rPhi.set(rPhi.get() + deltaX / MOVEMENT_DAMPING)
      rTheta.set(rTheta.get() + deltaY / MOVEMENT_DAMPING)
    }
  }

  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'));
    
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          setIsDark(document.documentElement.classList.contains('dark'));
        }
      });
    });
    observer.observe(document.documentElement, { attributes: true });

    const onResize = () => {
      if (canvasRef.current) {
        widthRef.current = canvasRef.current.offsetWidth
      }
    }

    window.addEventListener("resize", onResize)
    onResize()

    const themeConfig = {
      ...config,
      dark: isDark ? 1 : 0,
      baseColor: isDark ? [0.1, 0.1, 0.1] : [1, 1, 1],
      glowColor: isDark ? [0.05, 0.05, 0.05] : [1, 1, 1],
    }

    const globe = createGlobe(canvasRef.current, {
      ...themeConfig,
      width: widthRef.current * 2,
      height: widthRef.current * 2,
      onRender: (state) => {
        if (!pointerInteracting.current) phiRef.current += 0.005
        
        state.phi = phiRef.current + rsPhi.get()
        
        let newTheta = thetaRef.current + rsTheta.get()
        if (newTheta < 0) newTheta = 0
        if (newTheta > Math.PI) newTheta = Math.PI
        state.theta = newTheta
        
        state.width = widthRef.current * 2
        state.height = widthRef.current * 2
      },
    })

    setTimeout(() => {
        if (canvasRef.current) {
            canvasRef.current.style.opacity = "1"
        }
    }, 0)
    
    return () => {
      globe.destroy()
      window.removeEventListener("resize", onResize)
      observer.disconnect()
    }
  }, [rsPhi, rsTheta, config, isDark])

  return (
    <div className={`absolute inset-0 mx-auto aspect-square w-full max-w-full ${className || ""}`}>
      <canvas
        className="w-full h-full opacity-0 transition-opacity duration-500"
        ref={canvasRef}
        onPointerDown={(e) => {
          updatePointerInteraction(e.clientX, e.clientY)
        }}
        onPointerUp={() => updatePointerInteraction(null, null)}
        onPointerOut={() => updatePointerInteraction(null, null)}
        onMouseMove={(e) => updateMovement(e.clientX, e.clientY)}
        onTouchMove={(e) => {
          if (e.touches[0]) {
            updateMovement(e.touches[0].clientX, e.touches[0].clientY)
          }
        }}
        onTouchStart={(e) => {
          if (e.touches[0]) {
            updatePointerInteraction(e.touches[0].clientX, e.touches[0].clientY)
          }
        }}
        onTouchEnd={() => updatePointerInteraction(null, null)}
      />
    </div>
  )
}
