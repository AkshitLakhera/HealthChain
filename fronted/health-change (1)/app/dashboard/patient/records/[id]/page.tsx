"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function RecordViewerPage() {
  const [isExpanded, setIsExpanded] = useState(false)

  // Mock record data
  const record = {
    id: "rec-001",
    name: "Annual Checkup Report",
    type: "Medical Examination",
    date: "2024-10-15",
    doctor: "Dr. Sarah Smith",
    hospital: "City Medical Center",
    hash: "0x7f3a9c2e1b5d8f4a6c9e2b1d3f5a7c9e",
    status: "Verified",
    content: `ANNUAL CHECKUP REPORT

Patient Information:
- Name: John Doe
- Age: 35
- Blood Type: O+
- Height: 5'10"
- Weight: 180 lbs

Vital Signs:
- Blood Pressure: 120/80 mmHg
- Heart Rate: 72 bpm
- Temperature: 98.6°F
- Respiratory Rate: 16 breaths/min

Physical Examination:
- General: Patient appears healthy and well-nourished
- Head & Neck: No abnormalities noted
- Cardiovascular: Regular rate and rhythm, no murmurs
- Respiratory: Clear to auscultation bilaterally
- Abdomen: Soft, non-tender, no masses palpated
- Extremities: Full range of motion, no edema

Laboratory Results:
- Complete Blood Count: Normal
- Metabolic Panel: Normal
- Lipid Panel: Normal
- Thyroid Function: Normal

Recommendations:
1. Continue current exercise routine
2. Maintain balanced diet
3. Schedule follow-up in 12 months
4. Continue current medications as prescribed

Overall Assessment: Patient is in good health with no acute concerns.`,
    attachments: [
      { name: "blood_test_results.pdf", size: "2.4 MB", type: "PDF" },
      { name: "chest_xray.jpg", size: "1.8 MB", type: "Image" },
      { name: "ekg_report.pdf", size: "0.9 MB", type: "PDF" },
    ],
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
      {/* Header */}
      <motion.div variants={itemVariants} className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold">{record.name}</h1>
            <p className="text-muted-foreground">{record.type}</p>
          </div>
          <Badge className="bg-green-600">{record.status}</Badge>
        </div>
      </motion.div>

      {/* Record Info */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Date", value: record.date },
          { label: "Doctor", value: record.doctor },
          { label: "Hospital", value: record.hospital },
          { label: "Type", value: record.type },
        ].map((info, i) => (
          <Card key={i}>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">{info.label}</p>
              <p className="font-semibold mt-1">{info.value}</p>
            </CardContent>
          </Card>
        ))}
      </motion.div>

      {/* Blockchain Verification */}
      <motion.div variants={itemVariants}>
        <Alert>
          <AlertDescription>
            <div className="space-y-2">
              <p className="font-semibold">Blockchain Verified</p>
              <p className="text-sm font-mono break-all">{record.hash}</p>
              <p className="text-xs text-muted-foreground mt-2">
                This record has been cryptographically verified and stored on the Solana blockchain.
              </p>
            </div>
          </AlertDescription>
        </Alert>
      </motion.div>

      {/* Content Tabs */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle>Record Details</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="content" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="content">Report Content</TabsTrigger>
                <TabsTrigger value="attachments">Attachments</TabsTrigger>
              </TabsList>

              <TabsContent value="content" className="space-y-4">
                <div
                  className={`bg-muted p-6 rounded-lg font-mono text-sm whitespace-pre-wrap overflow-auto ${
                    isExpanded ? "max-h-none" : "max-h-96"
                  }`}
                >
                  {record.content}
                </div>
                <Button variant="outline" onClick={() => setIsExpanded(!isExpanded)} className="w-full bg-transparent">
                  {isExpanded ? "Show Less" : "Show More"}
                </Button>
              </TabsContent>

              <TabsContent value="attachments" className="space-y-4">
                {record.attachments.length > 0 ? (
                  <div className="space-y-3">
                    {record.attachments.map((attachment, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="text-2xl">{attachment.type === "PDF" ? "📄" : "🖼️"}</div>
                          <div>
                            <p className="font-medium">{attachment.name}</p>
                            <p className="text-sm text-muted-foreground">{attachment.size}</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="bg-transparent">
                          Download
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No attachments</p>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>

      {/* Actions */}
      <motion.div variants={itemVariants} className="flex gap-4">
        <Button className="flex-1">Share with Doctor</Button>
        <Button variant="outline" className="flex-1 bg-transparent">
          Download Report
        </Button>
        <Button variant="outline" className="flex-1 bg-transparent">
          Print
        </Button>
      </motion.div>
    </motion.div>
  )
}
