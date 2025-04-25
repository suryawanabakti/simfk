"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import AppLayout from "@/layouts/app-layout"
import type { BreadcrumbItem } from "@/types"
import { Head, useForm } from "@inertiajs/react"
import { FileUp, Loader2 } from "lucide-react"
import { type FormEventHandler, useRef, useState } from "react"

interface Document {
  id: number
  name: string
  file_name: string
}

interface Props {
  document: Document
}

export default function Edit({ document }: Props) {
  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: "Dashboard",
      href: "/dashboard",
    },
    {
      title: "Documents",
      href: "/admin/documents",
    },
    {
      title: "Edit Document",
      href: `/admin/documents/${document.id}/edit`,
    },
  ]

  const { data, setData, post, processing, errors } = useForm({
    name: document.name,
    file: null as File | null,
    _method: "PUT",
  })

  const fileInputRef = useRef<HTMLInputElement>(null)
  const [fileName, setFileName] = useState<string>(document.file_name)
  const [fileChanged, setFileChanged] = useState<boolean>(false)
  const [dragActive, setDragActive] = useState<boolean>(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    if (file) {
      setData("file", file)
      setFileName(file.name)
      setFileChanged(true)
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      setData("file", file)
      setFileName(file.name)
      setFileChanged(true)
    }
  }

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault()
    post(route("admin.documents.update", document.id), {
      forceFormData: true,
    })
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Edit Document" />
      <div className="flex h-full flex-1 flex-col gap-4 p-4">
        <h1 className="text-2xl font-bold">Edit Document</h1>

        <Card className="max-w-2xl">
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>Document Information</CardTitle>
              <CardDescription>Update document details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Document Name</Label>
                <Input
                  id="name"
                  value={data.name}
                  onChange={(e) => setData("name", e.target.value)}
                  placeholder="Enter document name"
                />
                {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="file">Document File</Label>
                <div
                  className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                    dragActive ? "border-primary bg-primary/5" : "border-muted-foreground/20"
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input ref={fileInputRef} id="file" type="file" className="hidden" onChange={handleFileChange} />
                  <div className="flex flex-col items-center gap-2">
                    <FileUp className="h-10 w-10 text-muted-foreground" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{fileChanged ? "Selected new file:" : "Current file:"}</p>
                      <p className="text-sm text-muted-foreground break-all max-w-md mx-auto">{fileName}</p>
                      {!fileChanged && (
                        <p className="text-xs text-muted-foreground">Click to upload a new file or drag and drop</p>
                      )}
                    </div>
                  </div>
                </div>
                {errors.file && <p className="text-sm text-destructive">{errors.file}</p>}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button type="button" variant="outline" onClick={() => window.history.back()}>
                Cancel
              </Button>
              <Button type="submit" disabled={processing}>
                {processing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Update Document"
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </AppLayout>
  )
}
