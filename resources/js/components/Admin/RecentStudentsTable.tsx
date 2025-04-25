import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Eye } from "lucide-react"
import { Link } from "@inertiajs/react"

interface Student {
  id: number
  name: string
  prodi: string
  jalur_penerimaan: string
  angkatan: number
  created_at: string
  photo: string | null
}

interface RecentStudentsTableProps {
  students: Student[]
}

export function RecentStudentsTable({ students = [] }: RecentStudentsTableProps) {
  
  const displayStudents = students.length > 0 ? students : students

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date)
  }

  // Get badge color based on admission path
  const getAdmissionBadgeColor = (path: string) => {
    switch (path) {
      case "SNMPTN":
        return "bg-green-100 text-green-800"
      case "SBMPTN":
        return "bg-blue-100 text-blue-800"
      case "Mandiri":
        return "bg-orange-100 text-orange-800"
      case "INTERNASIONAL":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="overflow-hidden rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px]">Nama Mahasiswa</TableHead>
            <TableHead>Program Studi</TableHead>
            <TableHead>Jalur Masuk</TableHead>
            <TableHead>Angkatan</TableHead>
            <TableHead>Tanggal Daftar</TableHead>
            <TableHead className="text-right">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {displayStudents.map((student) => (
            <TableRow key={student.id}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={student.photo || "/placeholder.svg"} alt={student.name} />
                    <AvatarFallback className="bg-rose-100 text-rose-600">{getInitials(student.name)}</AvatarFallback>
                  </Avatar>
                  <span>{student.name}</span>
                </div>
              </TableCell>
              <TableCell>{student.prodi || "-"}</TableCell>
              <TableCell>
                <Badge variant="outline" className={getAdmissionBadgeColor(student.jalur_penerimaan)}>
                  {student.jalur_penerimaan}
                </Badge>
              </TableCell>
              <TableCell>{student.angkatan}</TableCell>
              <TableCell>{formatDate(student.created_at)}</TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="icon"
                  asChild
                  className="text-gray-500 hover:bg-rose-50 hover:text-rose-600"
                >
                  <Link href={`/admin/students/${student.id}`}>
                    <Eye className="h-4 w-4" />
                    <span className="sr-only">Lihat detail</span>
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
