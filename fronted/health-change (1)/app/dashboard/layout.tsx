"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import DashboardLayout from "@/components/dashboard-layout"

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [isConnected] = useState(true)

  if (!isConnected) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-4">
          <h1 className="text-2xl font-bold">Connect Your Wallet</h1>
          <p className="text-muted-foreground">Please connect your wallet to access the dashboard</p>
          <button
            onClick={() => router.push("/")}
            className="px-6 py-2 bg-black text-white rounded-full hover:bg-black/80"
          >
            Go Home
          </button>
        </motion.div>
      </div>
    )
  }

  return <DashboardLayout>{children}</DashboardLayout>
}
