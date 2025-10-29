"use client"

import { motion } from "framer-motion"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Sphere, Torus, MeshDistortMaterial } from "@react-three/drei"
import { Suspense } from "react"

function FeatureSphere() {
  return (
    <Sphere args={[1, 100, 200]} scale={0.9}>
      <MeshDistortMaterial color="#000000" attach="material" distort={0.25} speed={2} roughness={0.3} />
    </Sphere>
  )
}

function FeatureTorus() {
  return (
    <Torus args={[1, 0.3, 16, 100]} scale={1.2}>
      <MeshDistortMaterial color="#000000" attach="material" distort={0.2} speed={2.5} roughness={0.4} />
    </Torus>
  )
}

export default function Features() {
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  }

  const features = [
    {
      title: "Decentralized Storage",
      description:
        "Your medical records live on the Solana blockchain. No central authority, no single point of failure.",
      icon: "🔐",
      model: "sphere",
    },
    {
      title: "Instant Access",
      description:
        "Access your complete health history anytime, anywhere. Lightning-fast retrieval powered by blockchain.",
      icon: "⚡",
      model: "torus",
    },
    {
      title: "Complete Control",
      description: "You own your data. Grant or revoke access to healthcare providers with granular permissions.",
      icon: "🎯",
      model: "sphere",
    },
  ]

  return (
    <section id="features" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-black/2 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/2 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <motion.div variants={itemVariants} className="text-center mb-20 space-y-4">
            <motion.span
              className="inline-block px-4 py-2 bg-black/5 border border-black/10 rounded-full text-xs font-semibold text-black/70 tracking-wide uppercase"
              variants={itemVariants}
            >
              Why HealthChain
            </motion.span>
            <h2 className="text-5xl md:text-6xl font-bold text-balance">Powerful Features</h2>
            <p className="text-lg text-black/60 max-w-2xl mx-auto font-light">
              Experience healthcare reimagined with blockchain security and complete data ownership
            </p>
          </motion.div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group relative"
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative h-72 rounded-2xl overflow-hidden bg-gradient-to-br from-black/2 to-black/5 border border-black/10 hover:border-black/20 transition-all duration-300 shadow-lg hover:shadow-xl">
                  {/* 3D Model Background */}
                  <Suspense fallback={<div className="w-full h-full bg-black/5" />}>
                    <Canvas camera={{ position: [0, 0, 2.5] }}>
                      <ambientLight intensity={0.5} />
                      <pointLight position={[10, 10, 10]} intensity={1} />
                      {feature.model === "sphere" ? <FeatureSphere /> : <FeatureTorus />}
                      <OrbitControls autoRotate autoRotateSpeed={3} enableZoom={false} />
                    </Canvas>
                  </Suspense>

                  {/* Content Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent flex flex-col justify-end p-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      viewport={{ once: true }}
                      className="space-y-3"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{feature.icon}</span>
                        <h3 className="text-xl font-bold text-white">{feature.title}</h3>
                      </div>
                      <p className="text-white/80 text-sm leading-relaxed font-light">{feature.description}</p>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
