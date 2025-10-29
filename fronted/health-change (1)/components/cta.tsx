"use client"

import { motion } from "framer-motion"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei"
import { Suspense } from "react"

function CTASphere() {
  return (
    <Sphere args={[1, 100, 200]} scale={1.1}>
      <MeshDistortMaterial color="#ffffff" attach="material" distort={0.35} speed={2.5} roughness={0.3} />
    </Sphere>
  )
}

export default function CTA() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
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
    <section className="relative min-h-screen flex items-center justify-center py-20 overflow-hidden bg-white">
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(0deg, transparent 24%, rgba(0,0,0,.05) 25%, rgba(0,0,0,.05) 26%, transparent 27%, transparent 74%, rgba(0,0,0,.05) 75%, rgba(0,0,0,.05) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(0,0,0,.05) 25%, rgba(0,0,0,.05) 26%, transparent 27%, transparent 74%, rgba(0,0,0,.05) 75%, rgba(0,0,0,.05) 76%, transparent 77%, transparent)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">
        {/* Left content */}
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <motion.div variants={itemVariants} className="space-y-8">
            <div className="space-y-4">
              <motion.h2
                className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-balance"
                variants={itemVariants}
              >
                Ready to Take
                <br />
                <span className="bg-gradient-to-r from-black via-black to-black/70 bg-clip-text text-transparent">
                  Control?
                </span>
              </motion.h2>
              <motion.p
                className="text-base md:text-lg text-black/60 max-w-md leading-relaxed font-light"
                variants={itemVariants}
              >
                Join thousands of users who are already managing their health records on the blockchain with complete
                privacy and security.
              </motion.p>
            </div>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.12)" }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3.5 bg-black text-white rounded-full font-semibold text-base hover:bg-black/90 transition-all duration-300 shadow-lg"
              >
                Get Started Now
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "rgba(0,0,0,0.08)" }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3.5 border-2 border-black text-black rounded-full font-semibold text-base hover:bg-black/5 transition-all duration-300"
              >
                Schedule Demo
              </motion.button>
            </motion.div>

            <motion.div variants={itemVariants} className="flex gap-8 pt-4">
              {[
                { label: "Users", value: "10K+" },
                { label: "Records", value: "50K+" },
                { label: "Verified", value: "100%" },
              ].map((stat, i) => (
                <div key={i} className="space-y-1">
                  <p className="text-2xl md:text-3xl font-bold">{stat.value}</p>
                  <p className="text-xs md:text-sm text-black/60 font-light">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="h-64 md:h-80 lg:h-96 rounded-2xl overflow-hidden border border-black/5"
        >
          <Suspense fallback={<div className="w-full h-full bg-black/5" />}>
            <Canvas camera={{ position: [0, 0, 2.8] }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={1} />
              <CTASphere />
              <OrbitControls autoRotate autoRotateSpeed={5} enableZoom={false} />
            </Canvas>
          </Suspense>
        </motion.div>
      </div>
    </section>
  )
}
