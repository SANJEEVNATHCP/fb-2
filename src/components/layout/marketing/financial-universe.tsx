"use client"

import { useRef, useState, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Sphere, MeshDistortMaterial, Float, Stars } from '@react-three/drei'
import * as THREE from 'three'

function AnimatedSphere() {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHover] = useState(false)

  // Rotating animation
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3
    }
  })

  return (
    <Float speed={2} rotationIntensity={2} floatIntensity={2}>
      <Sphere 
        ref={meshRef} 
        args={[1.5, 64, 64]} 
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
        scale={hovered ? 1.1 : 1}
      >
        <MeshDistortMaterial
          color={hovered ? "#00D5DE" : "#8F45F2"}
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  )
}

function Particles() {
  const count = 1500
  
  // Create a circle texture for the points so they aren't squares
  const circleTexture = useMemo(() => {
    if (typeof document === 'undefined') return null
    const canvas = document.createElement('canvas')
    canvas.width = 64
    canvas.height = 64
    const context = canvas.getContext('2d')
    if (context) {
      context.beginPath()
      context.arc(32, 32, 30, 0, Math.PI * 2)
      context.fillStyle = '#FFF'
      context.fill()
    }
    return new THREE.CanvasTexture(canvas)
  }, [])

  const { positions, colors } = useMemo(() => {
    const p = new Float32Array(count * 3)
    const c = new Float32Array(count * 3)
    
    // Stone / Gem color palette
    const colorPalette = [
      new THREE.Color("#FFD700"), // Gold
      new THREE.Color("#00C4CC"), // Cyan/Diamond
      new THREE.Color("#8F45F2"), // Amethyst
      new THREE.Color("#FBBF24"), // Amber
      new THREE.Color("#E2E8F0"), // Silver/Stone
    ]

    for (let i = 0; i < count; i++) {
      // Unstructured/Spherical distribution
      const r = 12 * Math.cbrt(Math.random()) // Radius up to 12
      const theta = Math.random() * 2 * Math.PI
      const phi = Math.acos(2 * Math.random() - 1)
      
      p[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      p[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      p[i * 3 + 2] = r * Math.cos(phi)

      // Random color from palette
      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)]
      c[i * 3] = color.r
      c[i * 3 + 1] = color.g
      c[i * 3 + 2] = color.b
    }
    return { positions: p, colors: c }
  }, [count])

  const pointsRef = useRef<THREE.Points>(null)

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.05
      pointsRef.current.rotation.z = state.clock.getElapsedTime() * 0.02
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.08} 
        vertexColors 
        transparent 
        opacity={0.8} 
        sizeAttenuation 
        map={circleTexture || undefined} 
        alphaTest={0.1}
        depthWrite={false}
      />
    </points>
  )
}

export function FinancialUniverse3D() {
  return (
    <div className="w-full h-full relative group">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} className="w-full h-full bg-transparent">
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#00D5DE" />
        <directionalLight position={[-10, -10, -5]} intensity={1} color="#8F45F2" />
        
        <AnimatedSphere />
        <Particles />
        <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
      <div className="absolute inset-0 pointer-events-none rounded-2xl ring-1 ring-inset ring-white/10 group-hover:ring-primary/30 transition-colors duration-500" />
    </div>
  )
}
