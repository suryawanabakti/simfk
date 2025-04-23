"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { HomeIcon } from "lucide-react"
import StudentFormSection from "../StudentFormSection"

interface GuardianFormProps {
  data: any
  setData: (key: string, value: any) => void
  errors: any
  options: {
    pendidikanOptions: string[]
  }
}

export default function GuardianForm({ data, setData, errors, options }: GuardianFormProps) {
  const { pendidikanOptions } = options

  return (
    <StudentFormSection title="Guardian Information" icon={<HomeIcon className="h-5 w-5" />} color="rose">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="nama_wali" className="text-rose-700">
            Guardian's Name
          </Label>
          <Input
            id="nama_wali"
            value={data.nama_wali}
            onChange={(e) => setData("nama_wali", e.target.value)}
            className="border-gray-300 focus:border-rose-500 focus:ring-rose-500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="nipnrp" className="text-rose-700">
            NIP/NRP
          </Label>
          <Input
            id="nipnrp"
            value={data.nipnrp}
            onChange={(e) => setData("nipnrp", e.target.value)}
            className="border-gray-300 focus:border-rose-500 focus:ring-rose-500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="pangkat" className="text-rose-700">
            Rank
          </Label>
          <Input
            id="pangkat"
            value={data.pangkat}
            onChange={(e) => setData("pangkat", e.target.value)}
            className="border-gray-300 focus:border-rose-500 focus:ring-rose-500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="instansi" className="text-rose-700">
            Institution
          </Label>
          <Input
            id="instansi"
            value={data.instansi}
            onChange={(e) => setData("instansi", e.target.value)}
            className="border-gray-300 focus:border-rose-500 focus:ring-rose-500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="pendidikan_wali" className="text-rose-700">
            Guardian's Education
          </Label>
          <Select value={data.pendidikan_wali} onValueChange={(value) => setData("pendidikan_wali", value)}>
            <SelectTrigger className="border-gray-300 focus:border-rose-500 focus:ring-rose-500">
              <SelectValue placeholder="Select education" />
            </SelectTrigger>
            <SelectContent>
              {pendidikanOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="penghasilan_wali" className="text-rose-700">
            Guardian's Income
          </Label>
          <Input
            id="penghasilan_wali"
            type="number"
            value={data.penghasilan_wali}
            onChange={(e) => setData("penghasilan_wali", e.target.value)}
            className="border-gray-300 focus:border-rose-500 focus:ring-rose-500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="nohp_wali" className="text-rose-700">
            Guardian's Phone
          </Label>
          <Input
            id="nohp_wali"
            value={data.nohp_wali}
            onChange={(e) => setData("nohp_wali", e.target.value)}
            className="border-gray-300 focus:border-rose-500 focus:ring-rose-500"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="alamat_wali" className="text-rose-700">
          Guardian's Address
        </Label>
        <Textarea
          id="alamat_wali"
          value={data.alamat_wali}
          onChange={(e) => setData("alamat_wali", e.target.value)}
          rows={3}
          className="border-gray-300 focus:border-rose-500 focus:ring-rose-500"
        />
      </div>
    </StudentFormSection>
  )
}
