"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function UploadRecordPage() {
  const [files, setFiles] = useState<File[]>([])
  const [recordType, setRecordType] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadedRecords, setUploadedRecords] = useState<
    Array<{ name: string; type: string; date: string; hash: string }>
  >([])

  const recordTypes = [
    "Lab Results",
    "X-Ray",
    "MRI Scan",
    "CT Scan",
    "Blood Test",
    "Prescription",
    "Vaccination Record",
    "Other",
  ]

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files))
    }
  }

  const handleUpload = async () => {
    if (!files.length || !recordType) {
      alert("Please select files and record type")
      return
    }

    setIsUploading(true)
    setUploadProgress(0)

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval)
          return prev
        }
        return prev + Math.random() * 30
      })
    }, 300)

    // Simulate blockchain upload
    setTimeout(() => {
      clearInterval(interval)
      setUploadProgress(100)

      // Add to uploaded records
      files.forEach((file) => {
        const mockHash = `0x${Math.random().toString(16).substring(2, 10)}`
        setUploadedRecords((prev) => [
          ...prev,
          {
            name: file.name,
            type: recordType,
            date: new Date().toLocaleDateString(),
            hash: mockHash,
          },
        ])
      })

      setIsUploading(false)
      setUploadProgress(0)
      setFiles([])
      setRecordType("")
    }, 2000)
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
      <motion.div variants={itemVariants} className="space-y-2">
        <h1 className="text-4xl font-bold">Upload Medical Records</h1>
        <p className="text-muted-foreground">Securely upload your medical documents to the blockchain</p>
      </motion.div>

      {/* Upload Form */}
      <motion.div variants={itemVariants}>
        <Card>
          <CardHeader>
            <CardTitle>Add New Record</CardTitle>
            <CardDescription>Upload your medical documents securely</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Record Type Selection */}
            <div className="space-y-2">
              <Label htmlFor="record-type">Record Type</Label>
              <Select value={recordType} onValueChange={setRecordType}>
                <SelectTrigger id="record-type">
                  <SelectValue placeholder="Select record type" />
                </SelectTrigger>
                <SelectContent>
                  {recordTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* File Upload Area */}
            <div className="space-y-2">
              <Label htmlFor="file-input">Select Files</Label>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                <input
                  id="file-input"
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                />
                <label htmlFor="file-input" className="cursor-pointer block">
                  <div className="text-4xl mb-2">📄</div>
                  <p className="font-medium">Click to upload or drag and drop</p>
                  <p className="text-sm text-muted-foreground">PDF, JPG, PNG, DOC up to 10MB</p>
                </label>
              </div>

              {/* Selected Files */}
              {files.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-medium">Selected files:</p>
                  {files.map((file, i) => (
                    <div key={i} className="flex items-center justify-between p-2 bg-muted rounded">
                      <span className="text-sm">{file.name}</span>
                      <span className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(2)} KB</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Upload Progress */}
            {isUploading && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Uploading to blockchain...</span>
                  <span className="text-sm text-muted-foreground">{Math.round(uploadProgress)}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <motion.div
                    className="bg-primary h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${uploadProgress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>
            )}

            {/* Upload Button */}
            <Button
              onClick={handleUpload}
              disabled={!files.length || !recordType || isUploading}
              className="w-full"
              size="lg"
            >
              {isUploading ? "Uploading..." : "Upload to Blockchain"}
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Uploaded Records */}
      {uploadedRecords.length > 0 && (
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle>Uploaded Records</CardTitle>
              <CardDescription>Your records stored on the Solana blockchain</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {uploadedRecords.map((record, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted transition-colors"
                  >
                    <div className="flex-1">
                      <p className="font-medium">{record.name}</p>
                      <div className="flex gap-4 text-sm text-muted-foreground mt-1">
                        <span>{record.type}</span>
                        <span>{record.date}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-mono text-muted-foreground mb-2">{record.hash}</p>
                      <Button variant="outline" size="sm" className="bg-transparent">
                        View
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Info Alert */}
      <motion.div variants={itemVariants}>
        <Alert>
          <AlertDescription>
            Your medical records are encrypted and stored on the Solana blockchain. Only you and authorized healthcare
            providers can access them.
          </AlertDescription>
        </Alert>
      </motion.div>
    </motion.div>
  )
}
