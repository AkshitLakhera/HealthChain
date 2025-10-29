"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface WalletConnectProps {
  isConnected: boolean
  setIsConnected: (connected: boolean) => void
}

export default function WalletConnect({ isConnected, setIsConnected }: WalletConnectProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [walletAddress, setWalletAddress] = useState<string | null>(null)

  const walletProviders = [
    { name: "Phantom", icon: "👻" },
    { name: "Solflare", icon: "🔥" },
    { name: "Magic Eden", icon: "✨" },
  ]

  const handleConnect = async (provider: string) => {
    setIsLoading(true)
    // Simulate wallet connection with provider
    setTimeout(() => {
      const mockAddress = `${provider.toLowerCase()}...${Math.random().toString(36).substring(7)}`
      setWalletAddress(mockAddress)
      setIsConnected(true)
      setIsLoading(false)
    }, 1000)
  }

  const handleDisconnect = () => {
    setIsConnected(false)
    setWalletAddress(null)
  }

  if (isConnected && walletAddress) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 rounded-full font-semibold text-sm bg-black text-white hover:bg-black/80 transition-all"
          >
            ✓ {walletAddress.substring(0, 6)}...{walletAddress.substring(walletAddress.length - 4)}
          </motion.button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem disabled className="text-xs text-muted-foreground">
            {walletAddress}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleDisconnect} className="text-red-600">
            Disconnect
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={isLoading}
          className="px-6 py-2 rounded-full font-semibold text-sm bg-black text-white hover:bg-black/80 transition-all disabled:opacity-50"
        >
          {isLoading ? (
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
              className="inline-block"
            >
              ⟳
            </motion.span>
          ) : (
            "Connect Wallet"
          )}
        </motion.button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <div className="px-2 py-1.5 text-sm font-semibold text-muted-foreground">Select Wallet</div>
        {walletProviders.map((provider) => (
          <DropdownMenuItem key={provider.name} onClick={() => handleConnect(provider.name)} className="cursor-pointer">
            <span className="mr-2">{provider.icon}</span>
            {provider.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
