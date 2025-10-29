"use client"

import { motion } from "framer-motion"

export default function Footer() {
  return (
    <footer className="bg-black text-white py-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <span className="text-black font-bold text-sm">HC</span>
              </div>
              <h3 className="text-lg font-bold">HealthChain</h3>
            </div>
            <p className="text-white/60 text-sm leading-relaxed font-light">
              Decentralized health records on Solana blockchain. Own your data, control your privacy.
            </p>
          </motion.div>

          {/* Product Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold mb-4 text-white">Product</h4>
            <ul className="space-y-3 text-sm text-white/60">
              <li>
                <motion.a href="#" whileHover={{ x: 4, color: "#fff" }} className="transition-colors">
                  Features
                </motion.a>
              </li>
              <li>
                <motion.a href="#" whileHover={{ x: 4, color: "#fff" }} className="transition-colors">
                  Pricing
                </motion.a>
              </li>
              <li>
                <motion.a href="#" whileHover={{ x: 4, color: "#fff" }} className="transition-colors">
                  Security
                </motion.a>
              </li>
              <li>
                <motion.a href="#" whileHover={{ x: 4, color: "#fff" }} className="transition-colors">
                  Roadmap
                </motion.a>
              </li>
            </ul>
          </motion.div>

          {/* Company Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold mb-4 text-white">Company</h4>
            <ul className="space-y-3 text-sm text-white/60">
              <li>
                <motion.a href="#" whileHover={{ x: 4, color: "#fff" }} className="transition-colors">
                  About
                </motion.a>
              </li>
              <li>
                <motion.a href="#" whileHover={{ x: 4, color: "#fff" }} className="transition-colors">
                  Blog
                </motion.a>
              </li>
              <li>
                <motion.a href="#" whileHover={{ x: 4, color: "#fff" }} className="transition-colors">
                  Careers
                </motion.a>
              </li>
              <li>
                <motion.a href="#" whileHover={{ x: 4, color: "#fff" }} className="transition-colors">
                  Contact
                </motion.a>
              </li>
            </ul>
          </motion.div>

          {/* Legal Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold mb-4 text-white">Legal</h4>
            <ul className="space-y-3 text-sm text-white/60">
              <li>
                <motion.a href="#" whileHover={{ x: 4, color: "#fff" }} className="transition-colors">
                  Privacy Policy
                </motion.a>
              </li>
              <li>
                <motion.a href="#" whileHover={{ x: 4, color: "#fff" }} className="transition-colors">
                  Terms of Service
                </motion.a>
              </li>
              <li>
                <motion.a href="#" whileHover={{ x: 4, color: "#fff" }} className="transition-colors">
                  Cookie Policy
                </motion.a>
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6"
        >
          <p className="text-sm text-white/60 font-light">&copy; 2025 HealthChain. All rights reserved.</p>
          <div className="flex gap-6">
            {[
              { name: "Twitter", href: "#" },
              { name: "Discord", href: "#" },
              { name: "GitHub", href: "#" },
            ].map((social) => (
              <motion.a
                key={social.name}
                href={social.href}
                whileHover={{ y: -2, color: "#fff" }}
                className="text-sm text-white/60 hover:text-white transition-colors"
              >
                {social.name}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
