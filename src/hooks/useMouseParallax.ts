"use client";

import { useEffect, useRef } from 'react';

/**
 * useMouseParallax
 * 
 * Attaches a mousemove listener to the window and updates CSS variables 
 * (--mouse-x, --mouse-y) on the returned ref. 
 * 
 * These variables are normalized between -1 and 1.
 * Example: -1 is far left/top, 1 is far right/bottom, 0 is center.
 * 
 * Bypasses React state entirely for 60FPS performance by directly mutating 
 * the DOM via requestAnimationFrame.
 */
export function useMouseParallax() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  
  // Target coordinates (normalized -1 to 1)
  const targetRef = useRef({ x: 0, y: 0 });
  
  // Current interpolated coordinates (for smooth lerping)
  const currentRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Only run on desktop
    if (!window.matchMedia('(pointer: fine)').matches) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize to -1 to 1
      targetRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      targetRef.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };

    const update = () => {
      // Lerp (Linear Interpolation) for smooth, buttery movement
      // 0.05 is the smoothing factor. Lower = smoother/slower.
      currentRef.current.x += (targetRef.current.x - currentRef.current.x) * 0.05;
      currentRef.current.y += (targetRef.current.y - currentRef.current.y) * 0.05;

      if (containerRef.current) {
        containerRef.current.style.setProperty('--mouse-x', currentRef.current.x.toString());
        containerRef.current.style.setProperty('--mouse-y', currentRef.current.y.toString());
      }
      
      rafRef.current = requestAnimationFrame(update);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    rafRef.current = requestAnimationFrame(update);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return containerRef;
}
