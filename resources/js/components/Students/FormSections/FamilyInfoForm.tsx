"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users2Icon } from "lucide-react"
import StudentFormSection from "../StudentFormSection"

interface FamilyInfoFormProps {
  data: any
  setData: (key: string, value: any) => void
  errors: any
  options: {
    agamaOptions: string[]
    pendidikanOptions: string[]
  }
}

export default function FamilyInfoForm({ data, setData, errors, options }: FamilyInfoFormProps) {
  const { agamaOptions, pendidikanOptions } = options

  return (
    <StudentFormSection title="Family Information" icon={<Users2Icon className="h-5 w-5" />} color="purple">
      <div>
        <h3 className="mb-4 text-lg font-medium text-purple-700">Father's Information</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="nama_ayah" className="text-purple-700">
              Father's Name
            </Label>
            <Input
              id="nama_ayah"
              value={data.nama_ayah}
              onChange={(e) => setData("nama_ayah", e.target.value)}
              className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="agama_ayah" className="text-purple-700">
              Father's Religion
            </Label>
            <Select value={data.agama_ayah} onValueChange={(value) => setData("agama_ayah", value)}>
              <SelectTrigger className="border-gray-300 focus:border-purple-500 focus:ring-purple-500">
                <SelectValue placeholder="Select religion" />
              </SelectTrigger>
              <SelectContent>
                {agamaOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="pendidikan_ayah" className="text-purple-700">
              Father's Education
            </Label>
            <Select value={data.pendidikan_ayah} onValueChange={(value) => setData("pendidikan_ayah", value)}>
              <SelectTrigger className="border-gray-300 focus:border-purple-500 focus:ring-purple-500">
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
            <Label htmlFor="pekerjaan_ayah" className="text-purple-700">
              Father's Occupation
            </Label>
            <Input
              id="pekerjaan_ayah"
              value={data.pekerjaan_ayah}
              onChange={(e) => setData("pekerjaan_ayah", e.target.value)}
              className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="penghasilan_ayah" className="text-purple-700">
              Father's Income
            </Label>
            <Input
              id="penghasilan_ayah"
              type="number"
              value={data.penghasilan_ayah}
              onChange={(e) => setData("penghasilan_ayah", e.target.value)}
              className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="nohp_ayah" className="text-purple-700">
              Father's Phone
            </Label>
            <Input
              id="nohp_ayah"
              value={data.nohp_ayah}
              onChange={(e) => setData("nohp_ayah", e.target.value)}
              className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-medium text-purple-700">Mother's Information</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="nama_ibu" className="text-purple-700">
              Mother's Name
            </Label>
            <Input
              id="nama_ibu"
              value={data.nama_ibu}
              onChange={(e) => setData("nama_ibu", e.target.value)}
              className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="agama_ibu" className="text-purple-700">
              Mother's Religion
            </Label>
            <Select value={data.agama_ibu} onValueChange={(value) => setData("agama_ibu", value)}>
              <SelectTrigger className="border-gray-300 focus:border-purple-500 focus:ring-purple-500">
                <SelectValue placeholder="Select religion" />
              </SelectTrigger>
              <SelectContent>
                {agamaOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="pendidikan_ibu" className="text-purple-700">
              Mother's Education
            </Label>
            <Select value={data.pendidikan_ibu} onValueChange={(value) => setData("pendidikan_ibu", value)}>
              <SelectTrigger className="border-gray-300 focus:border-purple-500 focus:ring-purple-500">
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
            <Label htmlFor="pekerjaan_ibu" className="text-purple-700">
              Mother's Occupation
            </Label>
            <Input
              id="pekerjaan_ibu"
              value={data.pekerjaan_ibu}
              onChange={(e) => setData("pekerjaan_ibu", e.target.value)}
              className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="penghasilan_ibu" className="text-purple-700">
              Mother's Income
            </Label>
            <Input
              id="penghasilan_ibu"
              type="number"
              value={data.penghasilan_ibu}
              onChange={(e) => setData("penghasilan_ibu", e.target.value)}
              className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="nohp_ibu" className="text-purple-700">
              Mother's Phone
            </Label>
            <Input
              id="nohp_ibu"
              value={data.nohp_ibu}
              onChange={(e) => setData("nohp_ibu", e.target.value)}
              className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="alamat_orangtua" className="text-purple-700">
          Parents' Address
        </Label>
        <Textarea
          id="alamat_orangtua"
          value={data.alamat_orangtua}
          onChange={(e) => setData("alamat_orangtua", e.target.value)}
          rows={3}
          className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="daya_listrik" className="text-purple-700">
          Electricity Power (Watt)
        </Label>
        <Input
          id="daya_listrik"
          type="number"
          value={data.daya_listrik}
          onChange={(e) => setData("daya_listrik", e.target.value)}
          className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
        />
      </div>
    </StudentFormSection>
  )
}
