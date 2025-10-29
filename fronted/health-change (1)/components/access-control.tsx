"use client"

import { motion } from "framer-motion"
import { useState } from "react"

interface AccessGrant {
  id: string
  doctorName: string
  doctorAddress: string
  expiresAt: string
  records: string[]
}

const mockAccess: AccessGrant[] = [
  {
    id: "1",
    doctorName: "Dr. Sarah Johnson",
    doctorAddress: "5Ey...xyz",
    expiresAt: "2025-02-15",
    records: ["Blood Test", "X-Ray"],
  },
  {
    id: "2",
    doctorName: "Dr. Michael Chen",
    doctorAddress: "7Ax...abc",
    expiresAt: "2025-03-01",
    records: ["Prescription", "Lab Report"],
  },
]

export default function AccessControl() {
  const [showNewAccess, setShowNewAccess] = useState(false)

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2">Share Access</h2>
          <p className="text-black/60">Manage who can access your medical records</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowNewAccess(!showNewAccess)}
          className="px-4 py-2 bg-black text-white rounded-lg font-medium"
        >
          + Grant Access
        </motion.button>
      </div>

      {showNewAccess && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 bg-black/5 rounded-lg border border-black/10 space-y-4"
        >
          <input
            type="text"
            placeholder="Doctor's Solana Address"
            className="w-full px-4 py-2 border border-black/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />
          <div>
            <label className="block text-sm font-medium mb-2">Access Duration</label>
            <select className="w-full px-4 py-2 border border-black/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-black">
              <option>7 days</option>
              <option>30 days</option>
              <option>90 days</option>
              <option>1 year</option>
            </select>
          </div>
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              className="flex-1 px-4 py-2 bg-black text-white rounded-lg font-medium"
            >
              Grant Access
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              onClick={() => setShowNewAccess(false)}
              className="flex-1 px-4 py-2 border border-black text-black rounded-lg font-medium"
            >
              Cancel
            </motion.button>
          </div>
        </motion.div>
      )}

      <div className="space-y-3">
        {mockAccess.map((access, index) => (
          <motion.div
            key={access.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-4 border border-black/10 rounded-lg"
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="font-semibold">{access.doctorName}</p>
                <p className="text-sm text-black/60">{access.doctorAddress}</p>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                className="text-red-500 hover:text-red-700 font-medium text-sm"
              >
                Revoke
              </motion.button>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-black/60">Records: {access.records.join(", ")}</span>
              <span className="text-black/40">Expires: {access.expiresAt}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
