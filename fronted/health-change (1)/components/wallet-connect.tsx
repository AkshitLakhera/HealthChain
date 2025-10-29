"use client"

import { useWallet } from "@solana/wallet-adapter-react"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import { motion } from "framer-motion"
import { useEffect } from "react"

// Custom CSS override
import "./walletButton.css"
interface WalletConnectProps {
  isConnected: boolean
  setIsConnected: (connected: boolean) => void
}
export default function WalletConnect({ isConnected, setIsConnected }: WalletConnectProps) {
  const { publicKey, connected } = useWallet()

  useEffect(() => {
    if (connected && publicKey) {
      console.log("Connected wallet:", publicKey.toBase58())
    }
  }, [connected, publicKey])

  return (
    <div className="flex items-center justify-center space-x-3">
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <WalletMultiButton className="wallet-custom-button" />
      </motion.div>

      {connected && publicKey && (
        <p className="text-xs text-gray-400">
          {publicKey.toBase58().slice(0, 6)}...{publicKey.toBase58().slice(-4)}
        </p>
      )}
    </div>
  )
}
