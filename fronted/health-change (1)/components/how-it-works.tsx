"use client"

import { motion } from "framer-motion"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Box, MeshDistortMaterial } from "@react-three/drei"
import { Suspense } from "react"

function AnimatedBox() {
  return (
    <Box args={[1, 1, 1]} scale={1.2}>
      <MeshDistortMaterial color="#ffffff" attach="material" distort={0.25} speed={1.8} roughness={0.35} />
    </Box>
  )
}

export default function HowItWorks() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  const steps = [
    {
      number: "01",
      title: "Connect Wallet",
      description: "Link your Solana wallet to get started",
    },
    {
      number: "02",
      title: "Upload Records",
      description: "Securely upload your medical documents",
    },
    {
      number: "03",
      title: "Grant Access",
      description: "Control who can view your health data",
    },
    {
      number: "04",
      title: "Share Securely",
      description: "Share records with healthcare providers",
    },
  ]

  return (
    <section id="how-it-works" className="py-24 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <motion.div variants={itemVariants} className="text-center mb-20 space-y-4">
            <motion.span
              className="inline-block px-4 py-2 bg-white/10 border border-white/20 rounded-full text-xs font-semibold text-white/70 tracking-wide uppercase"
              variants={itemVariants}
            >
              Simple Process
            </motion.span>
            <h2 className="text-5xl md:text-6xl font-bold text-balance">How It Works</h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto font-light">
              Simple steps to take control of your health records
            </p>
          </motion.div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative group"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="p-6 rounded-xl border border-white/10 hover:border-white/30 transition-colors bg-white/5 hover:bg-white/10 backdrop-blur-sm">
                  <div className="text-4xl font-bold text-white/20 mb-4">{step.number}</div>
                  <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{step.description}</p>

                  {/* Connector Line */}
                  {index < steps.length - 1 && (
                    <motion.div
                      className="hidden lg:block absolute -right-3 top-1/2 w-6 h-0.5 bg-gradient-to-r from-white/30 to-transparent"
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    />
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div variants={itemVariants} className="h-72 rounded-2xl overflow-hidden border border-white/10">
            <Suspense fallback={<div className="w-full h-full bg-black/50" />}>
              <Canvas camera={{ position: [0, 0, 3] }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <AnimatedBox />
                <OrbitControls autoRotate autoRotateSpeed={3} enableZoom={false} />
              </Canvas>
            </Suspense>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
