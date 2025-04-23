"use client"

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
    <StudentFormSection title="Achievements & Talents" icon={<BookOpenIcon className="h-5 w-5" />} color="amber">
      <div className="space-y-2">
        <Label htmlFor="akademik" className="text-amber-700">
          Academic Achievements
        </Label>
        <Textarea
          id="akademik"
          value={data.akademik}
          onChange={(e) => setData("akademik", e.target.value)}
          rows={3}
          className="border-gray-300 focus:border-amber-500 focus:ring-amber-500"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="non_akademik" className="text-amber-700">
          Non-Academic Achievements
        </Label>
        <Textarea
          id="non_akademik"
          value={data.non_akademik}
          onChange={(e) => setData("non_akademik", e.target.value)}
          rows={3}
          className="border-gray-300 focus:border-amber-500 focus:ring-amber-500"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="olahraga" className="text-amber-700">
          Sports
        </Label>
        <Textarea
          id="olahraga"
          value={data.olahraga}
          onChange={(e) => setData("olahraga", e.target.value)}
          rows={3}
          className="border-gray-300 focus:border-amber-500 focus:ring-amber-500"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="kesenian" className="text-amber-700">
          Arts
        </Label>
        <Textarea
          id="kesenian"
          value={data.kesenian}
          onChange={(e) => setData("kesenian", e.target.value)}
          rows={3}
          className="border-gray-300 focus:border-amber-500 focus:ring-amber-500"
        />
      </div>
    </StudentFormSection>
  )
}
