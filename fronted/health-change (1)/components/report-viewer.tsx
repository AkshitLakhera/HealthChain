"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface ReportViewerProps {
  report: {
    id: string
    name: string
    type: string
    date: string
    doctor: string
    status: "Verified" | "Pending" | "Archived"
    preview: string
  }
}

export default function ReportViewer({ report }: ReportViewerProps) {
  const [isOpen, setIsOpen] = useState(false)

  const statusColors = {
    Verified: "bg-green-600",
    Pending: "bg-yellow-600",
    Archived: "bg-gray-600",
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{report.name}</CardTitle>
                  <CardDescription>{report.type}</CardDescription>
                </div>
                <Badge className={statusColors[report.status]}>{report.status}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Date:</span>
                  <span className="font-medium">{report.date}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Doctor:</span>
                  <span className="font-medium">{report.doctor}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </DialogTrigger>

      <DialogContent className="max-w-2xl max-h-96 overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{report.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Type</p>
              <p className="font-medium">{report.type}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Date</p>
              <p className="font-medium">{report.date}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Doctor</p>
              <p className="font-medium">{report.doctor}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Status</p>
              <Badge className={statusColors[report.status]}>{report.status}</Badge>
            </div>
          </div>

          <div className="bg-muted p-4 rounded-lg max-h-48 overflow-y-auto">
            <p className="text-sm whitespace-pre-wrap">{report.preview}</p>
          </div>

          <div className="flex gap-2">
            <Button className="flex-1">Download</Button>
            <Button variant="outline" className="flex-1 bg-transparent">
              Share
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
