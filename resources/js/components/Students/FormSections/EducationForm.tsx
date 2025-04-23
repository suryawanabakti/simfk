"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { GraduationCapIcon } from "lucide-react"
import StudentFormSection from "../StudentFormSection"

interface EducationFormProps {
  data: any
  setData: (key: string, value: any) => void
  errors: any
}

export default function EducationForm({ data, setData, errors }: EducationFormProps) {
  return (
    <StudentFormSection title="Education Background" icon={<GraduationCapIcon className="h-5 w-5" />} color="green">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="nama_sekolah" className="text-green-700">
            School Name
          </Label>
          <Input
            id="nama_sekolah"
            value={data.nama_sekolah}
            onChange={(e) => setData("nama_sekolah", e.target.value)}
            className="border-gray-300 focus:border-green-500 focus:ring-green-500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="kab_sekolah" className="text-green-700">
            School District
          </Label>
          <Input
            id="kab_sekolah"
            value={data.kab_sekolah}
            onChange={(e) => setData("kab_sekolah", e.target.value)}
            className="border-gray-300 focus:border-green-500 focus:ring-green-500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="prov_sekolah" className="text-green-700">
            School Province
          </Label>
          <Input
            id="prov_sekolah"
            value={data.prov_sekolah}
            onChange={(e) => setData("prov_sekolah", e.target.value)}
            className="border-gray-300 focus:border-green-500 focus:ring-green-500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="thn_masuk" className="text-green-700">
            Entry Year
          </Label>
          <Input
            id="thn_masuk"
            type="number"
            value={data.thn_masuk}
            onChange={(e) => setData("thn_masuk", e.target.value)}
            className="border-gray-300 focus:border-green-500 focus:ring-green-500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="thn_lulus" className="text-green-700">
            Graduation Year
          </Label>
          <Input
            id="thn_lulus"
            type="number"
            value={data.thn_lulus}
            onChange={(e) => setData("thn_lulus", e.target.value)}
            className="border-gray-300 focus:border-green-500 focus:ring-green-500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="jml_mapel" className="text-green-700">
            Number of Subjects
          </Label>
          <Input
            id="jml_mapel"
            type="number"
            value={data.jml_mapel}
            onChange={(e) => setData("jml_mapel", e.target.value)}
            className="border-gray-300 focus:border-green-500 focus:ring-green-500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="nilai" className="text-green-700">
            Score
          </Label>
          <Input
            id="nilai"
            type="number"
            value={data.nilai}
            onChange={(e) => setData("nilai", e.target.value)}
            className="border-gray-300 focus:border-green-500 focus:ring-green-500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="no_ijazah" className="text-green-700">
            Certificate Number
          </Label>
          <Input
            id="no_ijazah"
            type="number"
            value={data.no_ijazah}
            onChange={(e) => setData("no_ijazah", e.target.value)}
            className="border-gray-300 focus:border-green-500 focus:ring-green-500"
          />
        </div>
      </div>
    </StudentFormSection>
  )
}
