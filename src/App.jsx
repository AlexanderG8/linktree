import { useState, useRef, useEffect } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { Stars, OrbitControls, useTexture } from '@react-three/drei'
import { TextureLoader } from 'three'
import { motion, AnimatePresence } from 'framer-motion'
import './App.css'

// Componente 3D para el planeta
function Planet(props) {
  const meshRef = useRef()
  // Usar una URL de imagen en línea en lugar de un archivo local
  const texture = useLoader(TextureLoader, 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg')
  
  useFrame((state, delta) => {
    meshRef.current.rotation.y += delta * 0.1
  })
  
  return (
    <mesh ref={meshRef} position={[0, 0, -5]} {...props}>
      <sphereGeometry args={[1.5, 32, 32]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  )
}

// Componente 3D para los anillos flotantes
function FloatingRing({ radius, speed, rotationAxis, color }) {
  const ringRef = useRef()
  
  useFrame((state, delta) => {
    if (rotationAxis === 'y') {
      ringRef.current.rotation.y += delta * speed
    } else if (rotationAxis === 'x') {
      ringRef.current.rotation.x += delta * speed
    } else {
      ringRef.current.rotation.z += delta * speed
    }
  })
  
  return (
    <mesh ref={ringRef} position={[0, 0, -5]}>
      <torusGeometry args={[radius, 0.05, 16, 100]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} transparent opacity={0.7} />
    </mesh>
  )
}

// Componente para los enlaces
function SpaceLink({ icon, label, url, delay }) {
  return (
    <motion.a 
      href={url} 
      target="_blank" 
      rel="noopener noreferrer"
      className="space-link"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.05 }}
    >
      <span className="flex items-center">
        <span className="text-neon-blue mr-3">{icon}</span>
        {label}
      </span>
      <span className="text-space-cyan">→</span>
    </motion.a>
  )
}

function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  
  // Efecto para seguir la posición del mouse
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      })
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Lista de enlaces
  const links = [
    { 
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>,
      label: 'Portfolio', 
      url: 'https://alexanderg8.github.io/my-portfolio-web/index.html', 
      delay: 0.1 
    },
    { 
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
      </svg>,
      label: 'GitHub', 
      url: 'https://github.com/AlexanderG8', 
      delay: 0.2 
    },
    { 
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
      </svg>,
      label: 'LinkedIn', 
      url: 'https://www.linkedin.com/in/marcello-alexander-gomez-gomez-130587268/', 
      delay: 0.3 
    },
    { 
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
      </svg>,
      label: 'Instagram', 
      url: 'https://www.instagram.com/xandev008/', 
      delay: 0.4 
    },
    { 
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
      </svg>,
      label: 'YouTube', 
      url: 'https://www.youtube.com/@xandev008', 
      delay: 0.6 
    },
    { 
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M16.656 1.029c1.637-0.025 3.262-0.012 4.886-0.025 0.054 2.031 0.878 3.859 2.189 5.213l-0.002-0.002c1.411 1.271 3.247 2.095 5.271 2.235l0.028 0.002v5.036c-1.912-0.048-3.71-0.489-5.331-1.247l0.082 0.034c-0.784-0.377-1.447-0.764-2.077-1.196l0.052 0.034c-0.012 3.649 0.012 7.298-0.025 10.934-0.103 1.853-0.719 3.543-1.707 4.954l0.020-0.031c-1.652 2.366-4.328 3.919-7.371 4.011l-0.014 0c-0.123 0.006-0.268 0.009-0.414 0.009-1.73 0-3.347-0.482-4.725-1.319l0.040 0.023c-2.508-1.509-4.238-4.091-4.558-7.094l-0.004-0.041c-0.025-0.625-0.037-1.25-0.012-1.862 0.49-4.779 4.494-8.476 9.361-8.476 0.547 0 1.083 0.047 1.604 0.136l-0.056-0.008c0.025 1.849-0.050 3.699-0.050 5.548-0.423-0.153-0.911-0.242-1.42-0.242-1.868 0-3.457 1.194-4.045 2.861l-0.009 0.030c-0.133 0.427-0.21 0.918-0.21 1.426 0 0.206 0.013 0.41 0.037 0.61l-0.002-0.024c0.332 2.046 2.086 3.59 4.201 3.59 0.061 0 0.121-0.001 0.181-0.004l-0.009 0c1.463-0.044 2.733-0.831 3.451-1.994l0.010-0.018c0.267-0.372 0.45-0.822 0.511-1.311l0.001-0.014c0.125-2.237 0.075-4.461 0.087-6.698 0.012-5.036-0.012-10.060 0.025-15.083z"></path>
      </svg>,
      label: 'TikTok', 
      url: 'https://www.tiktok.com/@xandev008', 
      delay: 0.7 
    },
    { 
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
      </svg>,
      label: 'CV/Resume', 
      url: 'https://1drv.ms/b/c/092da4f7880d29cb/Ede8edXmvHlBoxozANe4HQMBQoKCcDNtGHEUSmZp15kZkQ?e=Y4PhPV', 
      delay: 0.9 
    }
  ]

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <div className="canvas-container">
        <Canvas>
          <ambientLight intensity={0.2} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          
          {/* Planeta y anillos */}
          <Planet />
          <FloatingRing radius={2.2} speed={0.1} rotationAxis="y" color="#9423E7" />
          <FloatingRing radius={2.5} speed={0.05} rotationAxis="x" color="#5912A6" />
          <FloatingRing radius={2.8} speed={0.08} rotationAxis="z" color="#E17FCD" />
          
          {/* Controles de cámara con movimiento limitado */}
          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            enableRotate={true}
            autoRotate={true}
            autoRotateSpeed={0.5}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
        </Canvas>
      </div>
      
      {/* Contenido principal */}
      <motion.div 
        className="relative z-10 w-full max-w-md mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Avatar */}
        <motion.div 
          className="flex justify-center mb-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 100, delay: 0.1 }}
        >
          <div className="holographic-avatar w-32 h-32">
            <img 
              src="/Logo.png"
              alt="Personal Logo" 
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
        
        {/* Nombre y descripción */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h1 className="text-3xl font-bold relative">
            <span className="bg-gradient-to-r from-[#9423E7] via-[#F8ACCD] to-[#E17FCD] bg-clip-text text-transparent relative z-10">
              Xander
            </span>
          </h1>
          <motion.p 
            className="relative mt-2 font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <span className="bg-gradient-to-r from-[#F8ACCD] via-[#9423E7] to-[#E17FCD] bg-clip-text text-transparent relative z-10">
              Software Developer
            </span>
            <span className="absolute inset-0 blur-[1px] bg-gradient-to-r from-[#C968D5] via-[#5912A6] to-[#BB50DB] bg-clip-text text-transparent z-0 transform translate-x-[1px] translate-y-[1px]">
              Software Developer
            </span>
          </motion.p>
        </motion.div>
        
        {/* Enlaces */}
        <div className="space-y-2">
          {links.map((link, index) => (
            <SpaceLink 
              key={index}
              icon={link.icon}
              label={link.label}
              url={link.url}
              delay={link.delay}
            />
          ))}
        </div>
        
        {/* Footer */}
        <motion.footer 
          className="mt-12 text-center text-sm text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          &copy; {new Date().getFullYear()} Developed with ☕&🎧
        </motion.footer>
      </motion.div>
    </div>
  )
}

export default App
