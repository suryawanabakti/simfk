"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { GraduationCapIcon } from "lucide-react"
import StudentFormSection from "../StudentFormSection"

interface AcademicInfoFormProps {
  data: any
  setData: (key: string, value: any) => void
  errors: any
  options: {
    jalurOptions: string[]
    prodiOptions: string[]
  }
}

export default function AcademicInfoForm({ data, setData, errors, options }: AcademicInfoFormProps) {
  const { jalurOptions, prodiOptions } = options

  return (
    <StudentFormSection title="Academic Information" icon={<GraduationCapIcon className="h-5 w-5" />} color="blue">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="jalur_penerimaan" className="text-blue-700">
            Admission Path
          </Label>
          <Select value={data.jalur_penerimaan} onValueChange={(value) => setData("jalur_penerimaan", value)}>
            <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500">
              <SelectValue placeholder="Select admission path" />
            </SelectTrigger>
            <SelectContent>
              {jalurOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.jalur_penerimaan && <p className="text-sm text-red-500">{errors.jalur_penerimaan}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="angkatan" className="text-blue-700">
            Batch Year
          </Label>
          <Input
            id="angkatan"
            type="number"
            value={data.angkatan}
            onChange={(e) => setData("angkatan", e.target.value)}
            className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.angkatan && <p className="text-sm text-red-500">{errors.angkatan}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="prodi" className="text-blue-700">
            Study Program
          </Label>
          <Select value={data.prodi} onValueChange={(value) => setData("prodi", value)}>
            <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500">
              <SelectValue placeholder="Select study program" />
            </SelectTrigger>
            <SelectContent>
              {prodiOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.prodi && <p className="text-sm text-red-500">{errors.prodi}</p>}
        </div>
      </div>
    </StudentFormSection>
  )
}
