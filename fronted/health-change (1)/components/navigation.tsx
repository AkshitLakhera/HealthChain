"use client"

import { motion } from "framer-motion"
import WalletConnect from "./wallet-connect"

interface NavigationProps {
  isConnected: boolean
  setIsConnected: (connected: boolean) => void
}

export default function Navigation({ isConnected, setIsConnected }: NavigationProps) {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 w-full bg-white/80 backdrop-blur-xl border-b border-black/5 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">HC</span>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-black">HealthChain</span>
            <span className="text-xs text-black/50 -mt-1">Decentralized Health</span>
          </div>
        </motion.div>

        <div className="flex items-center gap-8">
          <div className="hidden md:flex gap-8 text-sm font-medium">
            <motion.a
              href="#features"
              whileHover={{ color: "#000" }}
              className="text-black/60 hover:text-black transition-colors"
            >
              Features
            </motion.a>
            <motion.a
              href="#how-it-works"
              whileHover={{ color: "#000" }}
              className="text-black/60 hover:text-black transition-colors"
            >
              How It Works
            </motion.a>
            <motion.a
              href="#benefits"
              whileHover={{ color: "#000" }}
              className="text-black/60 hover:text-black transition-colors"
            >
              Benefits
            </motion.a>
          </div>

          <WalletConnect isConnected={isConnected} setIsConnected={setIsConnected} />
        </div>
      </div>
    </motion.nav>
  )
}
