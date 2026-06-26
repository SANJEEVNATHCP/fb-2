"use client";

import { useEffect, useRef, useState } from 'react';

export function AnimatedCounter({ 
  value, 
  duration = 600,
  prefix = "",
  suffix = ""
}: { 
  value: number; 
  duration?: number;
  prefix?: string;
  suffix?: string;
}) {
  // Store the current display value in a ref to decouple from React renders
  const displayValueRef = useRef(value);
  const rafRef = useRef<number | null>(null);
  const spanRef = useRef<HTMLSpanElement>(null);
  
  // To re-trigger the animation logic, we only need to know when `value` changes
  useEffect(() => {
    const startValue = displayValueRef.current;
    const endValue = value;
    
    // No animation needed if they are the same
    if (startValue === endValue) return;

    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      
      // Calculate interpolation factor (0 to 1)
      let t = Math.min(progress / duration, 1);
      
      // Cinematic easing: cubic-bezier(0.22, 1, 0.36, 1)
      // Custom easing function approximation
      t = 1 - Math.pow(1 - t, 4); 

      const currentVal = startValue + (endValue - startValue) * t;
      displayValueRef.current = currentVal;

      if (spanRef.current) {
        // Format to whole numbers, adding commas
        spanRef.current.textContent = `${prefix}${Math.round(currentVal).toLocaleString()}${suffix}`;
      }

      if (t < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        // Ensure exact final value
        displayValueRef.current = endValue;
        if (spanRef.current) {
          spanRef.current.textContent = `${prefix}${Math.round(endValue).toLocaleString()}${suffix}`;
        }
      }
    };

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [value, duration, prefix, suffix]);

  return <span ref={spanRef}>{prefix}{Math.round(value).toLocaleString()}{suffix}</span>;
}
