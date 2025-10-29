"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const isPatientDashboard = pathname.includes("/patient")
  const isDoctorDashboard = pathname.includes("/doctor")

  const navItems = [
    { label: "Patient Dashboard", href: "/dashboard/patient", icon: "👤", active: isPatientDashboard },
    { label: "Doctor Dashboard", href: "/dashboard/doctor", icon: "👨‍⚕️", active: isDoctorDashboard },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-0 w-full bg-white/95 backdrop-blur-md border-b border-border z-40"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold tracking-tight">
            <span className="text-black">Health</span>
            <span className="text-black/60">Change</span>
          </Link>
          <Button variant="outline" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            {isSidebarOpen ? "Hide" : "Show"} Menu
          </Button>
        </div>
      </motion.header>

      <div className="flex pt-20">
        {/* Sidebar */}
        <motion.aside
          initial={{ x: -250 }}
          animate={{ x: isSidebarOpen ? 0 : -250 }}
          transition={{ duration: 0.3 }}
          className="w-64 bg-card border-r border-border min-h-screen fixed left-0 top-20 overflow-y-auto"
        >
          <nav className="p-6 space-y-2">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <motion.button
                  whileHover={{ x: 4 }}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    item.active ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"
                  }`}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.label}
                </motion.button>
              </Link>
            ))}
          </nav>
        </motion.aside>

        {/* Main Content */}
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className={`flex-1 ${isSidebarOpen ? "ml-64" : "ml-0"} transition-all duration-300`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</div>
        </motion.main>
      </div>
    </div>
  )
}
