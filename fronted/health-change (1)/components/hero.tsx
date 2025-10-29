"use client"

import { motion } from "framer-motion"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei"
import { Suspense } from "react"

function AnimatedSphere() {
  return (
    <Sphere args={[1, 100, 200]} scale={1}>
      <MeshDistortMaterial color="#000000" attach="material" distort={0.4} speed={3} roughness={0.3} />
    </Sphere>
  )
}

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-white">
      <div className="absolute inset-0 opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(135deg, rgba(0,0,0,0.02) 0%, transparent 50%), linear-gradient(45deg, transparent 50%, rgba(0,0,0,0.01) 100%)",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center relative z-10">
        {/* Left content */}
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
          <motion.div variants={itemVariants} className="space-y-6">
            <motion.div className="space-y-2">
              <motion.span
                className="inline-block px-4 py-2 bg-black/5 border border-black/10 rounded-full text-xs font-semibold text-black/70 tracking-wide uppercase"
                variants={itemVariants}
              >
                ✨ Blockchain Healthcare
              </motion.span>
            </motion.div>

            <motion.h1
              className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight text-balance"
              variants={itemVariants}
            >
              Your Health,
              <br />
              <span className="bg-gradient-to-r from-black via-black to-black/70 bg-clip-text text-transparent">
                Your Control
              </span>
            </motion.h1>

            <motion.p
              className="text-base md:text-lg text-black/60 max-w-lg leading-relaxed font-light"
              variants={itemVariants}
            >
              Take complete control of your medical records with blockchain-powered security. Share with doctors, keep
              your privacy, own your health data forever.
            </motion.p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 pt-2">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.12)" }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3.5 bg-black text-white rounded-full font-semibold text-base hover:bg-black/90 transition-all duration-300 shadow-lg"
            >
              Launch App
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "rgba(0,0,0,0.08)" }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3.5 border-2 border-black text-black rounded-full font-semibold text-base hover:bg-black/5 transition-all duration-300"
            >
              Watch Demo
            </motion.button>
          </motion.div>

          <motion.div variants={itemVariants} className="flex gap-8 pt-6 border-t border-black/10">
            <div className="space-y-1">
              <p className="text-2xl md:text-3xl font-bold">100%</p>
              <p className="text-xs md:text-sm text-black/60 font-light">End-to-End Encrypted</p>
            </div>
            <div className="space-y-1">
              <p className="text-2xl md:text-3xl font-bold">On-Chain</p>
              <p className="text-xs md:text-sm text-black/60 font-light">Verified & Immutable</p>
            </div>
            <div className="space-y-1">
              <p className="text-2xl md:text-3xl font-bold">24/7</p>
              <p className="text-xs md:text-sm text-black/60 font-light">Instant Access</p>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="h-64 md:h-80 lg:h-96 rounded-3xl overflow-hidden shadow-2xl border border-black/5"
        >
          <Suspense fallback={<div className="w-full h-full bg-black/5" />}>
            <Canvas camera={{ position: [0, 0, 2.5] }}>
              <ambientLight intensity={0.6} />
              <pointLight position={[10, 10, 10]} intensity={1.2} />
              <AnimatedSphere />
              <OrbitControls autoRotate autoRotateSpeed={5} enableZoom={false} />
            </Canvas>
          </Suspense>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-black rounded-full flex items-start justify-center p-2">
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY }}
            className="w-1 h-2 bg-black rounded-full"
          />
        </div>
      </motion.div>
    </section>
  )
}
