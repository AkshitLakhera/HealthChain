"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface MedicalRecordUploadProps {
  onUploadComplete?: (record: { name: string; type: string; hash: string }) => void
}

export default function MedicalRecordUpload({ onUploadComplete }: MedicalRecordUploadProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [recordType, setRecordType] = useState("")
  const [isUploading, setIsUploading] = useState(false)

  const recordTypes = ["Lab Results", "X-Ray", "MRI Scan", "CT Scan", "Blood Test", "Prescription", "Other"]

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  const handleUpload = async () => {
    if (!file || !recordType) return

    setIsUploading(true)

    // Simulate blockchain upload
    setTimeout(() => {
      const mockHash = `0x${Math.random().toString(16).substring(2, 10)}`
      onUploadComplete?.({
        name: file.name,
        type: recordType,
        hash: mockHash,
      })

      setIsUploading(false)
      setFile(null)
      setRecordType("")
      setIsOpen(false)
    }, 1500)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Upload Record</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Medical Record</DialogTitle>
          <DialogDescription>Add a new medical document to your blockchain records</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="type">Record Type</Label>
            <Select value={recordType} onValueChange={setRecordType}>
              <SelectTrigger id="type">
                <SelectValue placeholder="Select type" />
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

          <div className="space-y-2">
            <Label htmlFor="file">File</Label>
            <Input id="file" type="file" onChange={handleFileChange} accept=".pdf,.jpg,.png,.doc" />
            {file && <p className="text-sm text-muted-foreground">{file.name}</p>}
          </div>

          <Button onClick={handleUpload} disabled={!file || !recordType || isUploading} className="w-full">
            {isUploading ? "Uploading..." : "Upload"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
