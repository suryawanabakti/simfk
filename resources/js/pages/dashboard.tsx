"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AppLayout from "@/layouts/app-layout"
import type { BreadcrumbItem } from "@/types"
import { Head } from "@inertiajs/react"
import {
  BarChart3,
  BookOpen,
  GraduationCap,
  LineChart,
  MapPin,
  PieChart,
  School,
  Search,
  Users,
  UserPlus,
  UserCheck,
  Calendar,
  Filter,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from "react"
import { RecentStudentsTable } from "@/components/Admin/RecentStudentsTable"
import { StudentsByGenderChart } from "@/components/Admin/StudentsByGenderChart"
import { StudentsByAdmissionChart } from "@/components/Admin/StudentsByAdmissionChart"
import { StudentsByYearChart } from "@/components/Admin/StudentsByYearChart"
import { StudentsByReligionChart } from "@/components/Admin/StudentsByReligionChart"

interface DashboardProps {
  totalStudents: number
  activeStudents: number
  newStudentsThisMonth: number
  completedProfiles: number
  studentsByGender: {
    male: number
    female: number
  }
  studentsByAdmission: {
    SNMPTN: number
    SBMPTN: number
    Mandiri: number
    INTERNASIONAL: number
  }
  studentsByYear: Record<string, number>
  studentsByReligion: Record<string, number>
  recentStudents: Array<{
    id: number
    name: string
    prodi: string
    jalur_penerimaan: string
    angkatan: number
    created_at: string
    photo: string | null
  }>
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
  },
]

export default function Dashboard({
  totalStudents = 1250,
  activeStudents = 1180,
  newStudentsThisMonth = 45,
  completedProfiles = 980,
  studentsByGender = { male: 650, female: 600 },
  studentsByAdmission = { SNMPTN: 450, SBMPTN: 350, Mandiri: 400, INTERNASIONAL: 50 },
  studentsByYear = { "2020": 300, "2021": 320, "2022": 310, "2023": 320 },
  studentsByReligion = { Islam: 800, Protestan: 200, Katolik: 150, Hindu: 50, Budha: 30, Konghucu: 20 },
  recentStudents = [],
}: DashboardProps) {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dashboard Admin" />
      <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-4">
        {/* Header with search and filters */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard Admin</h1>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            {/* <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input type="search" placeholder="Cari mahasiswa..." className="w-full pl-8 sm:w-[250px]" />
            </div> */}
            {/* <Button variant="outline" size="icon" className="h-9 w-9">
              <Filter className="h-4 w-4" />
              <span className="sr-only">Filter</span>
            </Button> */}
            {/* <Select defaultValue="all">
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Angkatan" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Angkatan</SelectLabel>
                  <SelectItem value="all">Semua Angkatan</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2022">2022</SelectItem>
                  <SelectItem value="2021">2021</SelectItem>
                  <SelectItem value="2020">2020</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select> */}
          </div>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="border-none shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Mahasiswa</p>
                  <h3 className="mt-1 text-3xl font-bold text-rose-600">{totalStudents}</h3>
                  <p className="mt-1 text-xs text-gray-500">Dari semua angkatan</p>
                </div>
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-rose-100">
                  <Users className="h-6 w-6 text-rose-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Mahasiswa Aktif</p>
                  <h3 className="mt-1 text-3xl font-bold text-rose-600">{activeStudents}</h3>
                  <p className="mt-1 text-xs text-gray-500">
                    {Math.round((activeStudents / totalStudents) * 100)}% dari total
                  </p>
                </div>
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-rose-100">
                  <UserCheck className="h-6 w-6 text-rose-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Mahasiswa Baru</p>
                  <h3 className="mt-1 text-3xl font-bold text-rose-600">{newStudentsThisMonth}</h3>
                  <p className="mt-1 text-xs text-gray-500">Bulan ini</p>
                </div>
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-rose-100">
                  <UserPlus className="h-6 w-6 text-rose-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Profil Lengkap</p>
                  <h3 className="mt-1 text-3xl font-bold text-rose-600">{completedProfiles}</h3>
                  <p className="mt-1 text-xs text-gray-500">
                    {Math.round((completedProfiles / totalStudents) * 100)}% dari total
                  </p>
                </div>
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-rose-100">
                  <BookOpen className="h-6 w-6 text-rose-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs for different views */}
        <Tabs defaultValue="overview" className="w-full" onValueChange={(value) => setActiveTab(value)}>
          <TabsList className="mb-4 grid w-full grid-cols-3 md:w-auto">
            <TabsTrigger value="overview" className={`${activeTab === "overview" ? "bg-rose-100 text-rose-700" : ""}`}>
              <BarChart3 className="mr-2 h-4 w-4" />
              Ikhtisar
            </TabsTrigger>
            <TabsTrigger
              value="demographics"
              className={`${activeTab === "demographics" ? "bg-rose-100 text-rose-700" : ""}`}
            >
              <PieChart className="mr-2 h-4 w-4" />
              Demografi
            </TabsTrigger>
            <TabsTrigger value="academic" className={`${activeTab === "academic" ? "bg-rose-100 text-rose-700" : ""}`}>
              <GraduationCap className="mr-2 h-4 w-4" />
              Akademik
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Charts row */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Card className="border-none shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Mahasiswa Berdasarkan Jenis Kelamin</CardTitle>
                  <CardDescription>Distribusi mahasiswa berdasarkan jenis kelamin</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <StudentsByGenderChart data={studentsByGender} />
                </CardContent>
              </Card>

              <Card className="border-none shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Mahasiswa Berdasarkan Jalur Penerimaan</CardTitle>
                  <CardDescription>Distribusi mahasiswa berdasarkan jalur masuk</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <StudentsByAdmissionChart data={studentsByAdmission} />
                </CardContent>
              </Card>
            </div>

            {/* Recent students table */}
            <Card className="border-none shadow-md">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg font-medium">Mahasiswa Terbaru</CardTitle>
                    <CardDescription>Daftar mahasiswa yang baru terdaftar</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" className="text-rose-600 hover:bg-rose-50 hover:text-rose-700">
                    Lihat Semua
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <RecentStudentsTable students={recentStudents} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="demographics" className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Card className="border-none shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Mahasiswa Berdasarkan Angkatan</CardTitle>
                  <CardDescription>Distribusi mahasiswa per tahun angkatan</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <StudentsByYearChart data={studentsByYear} />
                </CardContent>
              </Card>

              <Card className="border-none shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Mahasiswa Berdasarkan Agama</CardTitle>
                  <CardDescription>Distribusi mahasiswa berdasarkan agama</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <StudentsByReligionChart data={studentsByReligion} />
                </CardContent>
              </Card>
            </div>

            <Card className="border-none shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Peta Sebaran Mahasiswa</CardTitle>
                <CardDescription>Distribusi mahasiswa berdasarkan asal daerah</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px] p-0">
                <div className="flex h-full w-full items-center justify-center bg-rose-50 p-6">
                  <div className="flex flex-col items-center justify-center text-center">
                    <MapPin className="h-12 w-12 text-rose-300" />
                    <h3 className="mt-4 text-lg font-medium text-gray-700">Peta Sebaran Mahasiswa</h3>
                    <p className="mt-2 text-sm text-gray-500">
                      Visualisasi peta sebaran mahasiswa berdasarkan provinsi asal
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="academic" className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Card className="border-none shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Mahasiswa Berdasarkan Program Studi</CardTitle>
                  <CardDescription>Distribusi mahasiswa per program studi</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <div className="flex h-full w-full items-center justify-center">
                    <div className="flex flex-col items-center justify-center text-center">
                      <School className="h-12 w-12 text-rose-300" />
                      <p className="mt-4 text-sm text-gray-500">Data program studi sedang dimuat</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Tren Pendaftaran</CardTitle>
                  <CardDescription>Tren pendaftaran mahasiswa per bulan</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <div className="flex h-full w-full items-center justify-center">
                    <div className="flex flex-col items-center justify-center text-center">
                      <LineChart className="h-12 w-12 text-rose-300" />
                      <p className="mt-4 text-sm text-gray-500">Data tren pendaftaran sedang dimuat</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border-none shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Kalender Akademik</CardTitle>
                <CardDescription>Jadwal dan kegiatan akademik penting</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <div className="flex h-full w-full items-center justify-center">
                  <div className="flex flex-col items-center justify-center text-center">
                    <Calendar className="h-12 w-12 text-rose-300" />
                    <p className="mt-4 text-sm text-gray-500">Kalender akademik sedang dimuat</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  )
}
