'use client'

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { HeartIcon } from "lucide-react"
import StudentFormSection from "../StudentFormSection"

interface HealthFormProps {
  data: any
  setData: (key: string, value: any) => void
  errors: any
  options: {
    golDarahOptions: string[]
  }
}

export default function HealthForm({ data, setData, errors, options }: HealthFormProps) {
  const { golDarahOptions } = options

  return (
    <StudentFormSection title="Informasi Kesehatan" icon={<HeartIcon className="h-5 w-5" />} color="rose">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="tinggi" className="text-rose-700">
            Tinggi Badan (cm)
          </Label>
          <Input
            id="tinggi"
            type="number"
            value={data.tinggi}
            onChange={(e) => setData("tinggi", e.target.value)}
            className="border-gray-300 focus:border-rose-500 focus:ring-rose-500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="berat" className="text-rose-700">
            Berat Badan (kg)
          </Label>
          <Input
            id="berat"
            type="number"
            value={data.berat}
            onChange={(e) => setData("berat", e.target.value)}
            className="border-gray-300 focus:border-rose-500 focus:ring-rose-500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="tekanan_darah" className="text-rose-700">
            Tekanan Darah
          </Label>
          <Input
            id="tekanan_darah"
            type="number"
            value={data.tekanan_darah}
            onChange={(e) => setData("tekanan_darah", e.target.value)}
            className="border-gray-300 focus:border-rose-500 focus:ring-rose-500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="gol_darah" className="text-rose-700">
            Golongan Darah
          </Label>
          <Select value={data.gol_darah} onValueChange={(value) => setData("gol_darah", value)}>
            <SelectTrigger className="border-gray-300 focus:border-rose-500 focus:ring-rose-500">
              <SelectValue placeholder="Pilih golongan darah" />
            </SelectTrigger>
            <SelectContent>
              {golDarahOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </StudentFormSection>
  )
}
