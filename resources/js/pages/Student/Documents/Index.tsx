'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import AppLayout from "@/layouts/app-layout"
import type { BreadcrumbItem } from "@/types"
import { Head, usePage } from "@inertiajs/react"
import { Download, FileText, Search } from "lucide-react"
import { useState } from "react"
import { Input } from "@/components/ui/input"

interface Document {
  id: number
  name: string
  file_path: string
  file_name: string
  file_size: string
  file_type: string
  created_at: string
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
    title: "Dokumen",
    href: "/student/documents",
  },
]

export default function Index({ documents }: Props) {
  const [searchTerm, setSearchTerm] = useState("")

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

  const filteredDocuments = documents.filter(
    (doc) =>
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.file_name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dokumen Tersedia" />
      <div className="flex h-full flex-1 flex-col gap-4 p-4">
        <h1 className="text-2xl font-bold">Dokumen Tersedia</h1>

        <Card>
          <CardHeader>
            <CardTitle>Dokumen</CardTitle>
            <CardDescription>Telusuri dan unduh dokumen yang tersedia</CardDescription>
            <div className="relative mt-4">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Cari dokumen..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama</TableHead>
                  <TableHead>File</TableHead>
                  <TableHead>Ukuran</TableHead>
                  <TableHead>Tanggal</TableHead>
                  <TableHead className="text-right">Tindakan</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDocuments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                      {searchTerm ? "Tidak ada dokumen yang sesuai dengan pencarian Anda" : "Belum ada dokumen tersedia."}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredDocuments.map((document) => (
                    <TableRow key={document.id}>
                      <TableCell className="font-medium">{document.name}</TableCell>
                      <TableCell className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span className="max-w-[200px] truncate">{document.file_name}</span>
                      </TableCell>
                      <TableCell>{formatFileSize(document.file_size)}</TableCell>
                      <TableCell>{formatDate(document.created_at)}</TableCell>
                      <TableCell className="text-right">
                        <a
                          href={route("student.documents.download", { id: document.id })}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-input bg-background text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        >
                          <Download className="h-4 w-4" />
                          <span className="sr-only">Unduh</span>
                        </a>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}
