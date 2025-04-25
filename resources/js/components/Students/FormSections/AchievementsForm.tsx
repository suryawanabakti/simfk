'use client'

import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { BookOpenIcon } from "lucide-react"
import StudentFormSection from "../StudentFormSection"

interface AchievementsFormProps {
  data: any
  setData: (key: string, value: any) => void
  errors: any
}

export default function AchievementsForm({ data, setData, errors }: AchievementsFormProps) {
  return (
    <StudentFormSection title="Prestasi & Bakat" icon={<BookOpenIcon className="h-5 w-5" />} color="rose">
      <div className="space-y-2">
        <Label htmlFor="akademik" className="text-rose-700">
          Prestasi Akademik
        </Label>
        <Textarea
          id="akademik"
          value={data.akademik}
          onChange={(e) => setData("akademik", e.target.value)}
          rows={3}
          className="border-gray-300 focus:border-rose-500 focus:ring-rose-500"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="non_akademik" className="text-rose-700">
          Prestasi Non-Akademik
        </Label>
        <Textarea
          id="non_akademik"
          value={data.non_akademik}
          onChange={(e) => setData("non_akademik", e.target.value)}
          rows={3}
          className="border-gray-300 focus:border-rose-500 focus:ring-rose-500"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="olahraga" className="text-rose-700">
          Bidang Olahraga
        </Label>
        <Textarea
          id="olahraga"
          value={data.olahraga}
          onChange={(e) => setData("olahraga", e.target.value)}
          rows={3}
          className="border-gray-300 focus:border-rose-500 focus:ring-rose-500"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="kesenian" className="text-rose-700">
          Bidang Kesenian
        </Label>
        <Textarea
          id="kesenian"
          value={data.kesenian}
          onChange={(e) => setData("kesenian", e.target.value)}
          rows={3}
          className="border-gray-300 focus:border-rose-500 focus:ring-rose-500"
        />
      </div>
    </StudentFormSection>
  )
}
