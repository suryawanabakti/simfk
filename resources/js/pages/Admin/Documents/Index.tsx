"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import AppLayout from "@/layouts/app-layout"
import type { BreadcrumbItem } from "@/types"
import { Head, Link, router, usePage } from "@inertiajs/react"
import { Download, FileText, Pencil, Plus, Trash2 } from "lucide-react"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface Document {
  id: number
  name: string
  file_path: string
  file_name: string
  file_size: string
  file_type: string
  created_at: string
  uploader: {
    id: number
    name: string
  }
}

interface Props {
  documents: Document[]
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
  },
  {
    title: "Documents",
    href: "/admin/documents",
  },
]

export default function Index({ documents }: Props) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [documentToDelete, setDocumentToDelete] = useState<Document | null>(null)


  const confirmDelete = (document: Document) => {
    setDocumentToDelete(document)
    setDeleteDialogOpen(true)
  }

  const handleDelete = () => {
    if (documentToDelete) {
      router.delete(route("admin.documents.destroy", documentToDelete.id), {
        onSuccess: () => {
          setDeleteDialogOpen(false)
          setDocumentToDelete(null)
        },
      })
    }
  }

  const formatFileSize = (bytes: string) => {
    const size = Number.parseInt(bytes)
    if (size < 1024) return size + " bytes"
    else if (size < 1048576) return (size / 1024).toFixed(2) + " KB"
    else return (size / 1048576).toFixed(2) + " MB"
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Documents Management" />
      <div className="flex h-full flex-1 flex-col gap-4 p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Documents Management</h1>
          <Link href={route("admin.documents.create")}>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Document
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Documents</CardTitle>
            <CardDescription>Manage your documents here</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>File</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Uploaded By</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {documents.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No documents found. Add your first document.
                    </TableCell>
                  </TableRow>
                ) : (
                  documents.map((document) => (
                    <TableRow key={document.id}>
                      <TableCell className="font-medium">{document.name}</TableCell>
                      <TableCell className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span className="max-w-[200px] truncate">{document.file_name}</span>
                      </TableCell>
                      <TableCell>{formatFileSize(document.file_size)}</TableCell>
                      <TableCell>{document.uploader.name}</TableCell>
                      <TableCell>{formatDate(document.created_at)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <a
                            href={route("admin.documents.download", document.id)}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-input bg-background text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          >
                            <Download className="h-4 w-4" />
                            <span className="sr-only">Download</span>
                          </a>
                          <Link
                            href={route("admin.documents.edit", document.id)}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-input bg-background text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          >
                            <Pencil className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Link>
                          <button
                            onClick={() => confirmDelete(document)}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-input bg-background text-sm font-medium ring-offset-background transition-colors hover:bg-destructive hover:text-destructive-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the document "{documentToDelete?.name}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppLayout>
  )
}
