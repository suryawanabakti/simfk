"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UserIcon } from "lucide-react"
import StudentFormSection from "../StudentFormSection"

interface PersonalInfoFormProps {
  data: any
  setData: (key: string, value: any) => void
  errors: any
  options: {
    jkOptions: string[]
    agamaOptions: string[]
    statusHuniOptions: string[]
  }
}

export default function PersonalInfoForm({ data, setData, errors, options }: PersonalInfoFormProps) {
  const { jkOptions, agamaOptions, statusHuniOptions } = options

  return (
    <StudentFormSection title="Personal Information" icon={<UserIcon className="h-5 w-5" />} color="indigo">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="no_test" className="text-indigo-700">
            Test Number
          </Label>
          <Input
            id="no_test"
            value={data.no_test}
            onChange={(e) => setData("no_test", e.target.value)}
            className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
          />
          {errors.no_test && <p className="text-sm text-red-500">{errors.no_test}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="jk" className="text-indigo-700">
            Gender
          </Label>
          <Select value={data.jk} onValueChange={(value) => setData("jk", value)}>
            <SelectTrigger className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500">
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              {jkOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.jk && <p className="text-sm text-red-500">{errors.jk}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="tmp_lahir" className="text-indigo-700">
            Birth Place
          </Label>
          <Input
            id="tmp_lahir"
            value={data.tmp_lahir}
            onChange={(e) => setData("tmp_lahir", e.target.value)}
            className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
          />
          {errors.tmp_lahir && <p className="text-sm text-red-500">{errors.tmp_lahir}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="tgl_lahir" className="text-indigo-700">
            Birth Date
          </Label>
          <Input
            id="tgl_lahir"
            type="date"
            value={data.tgl_lahir}
            onChange={(e) => setData("tgl_lahir", e.target.value)}
            className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
          />
          {errors.tgl_lahir && <p className="text-sm text-red-500">{errors.tgl_lahir}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="kab_lahir" className="text-indigo-700">
            Birth District
          </Label>
          <Input
            id="kab_lahir"
            value={data.kab_lahir}
            onChange={(e) => setData("kab_lahir", e.target.value)}
            className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
          />
          {errors.kab_lahir && <p className="text-sm text-red-500">{errors.kab_lahir}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="prov_lahir" className="text-indigo-700">
            Birth Province
          </Label>
          <Input
            id="prov_lahir"
            value={data.prov_lahir}
            onChange={(e) => setData("prov_lahir", e.target.value)}
            className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
          />
          {errors.prov_lahir && <p className="text-sm text-red-500">{errors.prov_lahir}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="nohp" className="text-indigo-700">
            Phone Number
          </Label>
          <Input
            id="nohp"
            value={data.nohp}
            onChange={(e) => setData("nohp", e.target.value)}
            className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
          />
          {errors.nohp && <p className="text-sm text-red-500">{errors.nohp}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="agama" className="text-indigo-700">
            Religion
          </Label>
          <Select value={data.agama} onValueChange={(value) => setData("agama", value)}>
            <SelectTrigger className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500">
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
          {errors.agama && <p className="text-sm text-red-500">{errors.agama}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="suku" className="text-indigo-700">
            Ethnicity
          </Label>
          <Input
            id="suku"
            value={data.suku}
            onChange={(e) => setData("suku", e.target.value)}
            className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
          />
          {errors.suku && <p className="text-sm text-red-500">{errors.suku}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="kewarnegaraan" className="text-indigo-700">
            Nationality
          </Label>
          <Input
            id="kewarnegaraan"
            value={data.kewarnegaraan}
            onChange={(e) => setData("kewarnegaraan", e.target.value)}
            className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
          />
          {errors.kewarnegaraan && <p className="text-sm text-red-500">{errors.kewarnegaraan}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="jml_kakak" className="text-indigo-700">
            Number of Older Siblings
          </Label>
          <Input
            id="jml_kakak"
            type="number"
            value={data.jml_kakak}
            onChange={(e) => setData("jml_kakak", e.target.value)}
            className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
          />
          {errors.jml_kakak && <p className="text-sm text-red-500">{errors.jml_kakak}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="jml_adik" className="text-indigo-700">
            Number of Younger Siblings
          </Label>
          <Input
            id="jml_adik"
            type="number"
            value={data.jml_adik}
            onChange={(e) => setData("jml_adik", e.target.value)}
            className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
          />
          {errors.jml_adik && <p className="text-sm text-red-500">{errors.jml_adik}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="status_huni_rumah" className="text-indigo-700">
            Living Status
          </Label>
          <Select value={data.status_huni_rumah} onValueChange={(value) => setData("status_huni_rumah", value)}>
            <SelectTrigger className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500">
              <SelectValue placeholder="Select living status" />
            </SelectTrigger>
            <SelectContent>
              {statusHuniOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.status_huni_rumah && <p className="text-sm text-red-500">{errors.status_huni_rumah}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="alamat" className="text-indigo-700">
          Address
        </Label>
        <Textarea
          id="alamat"
          value={data.alamat}
          onChange={(e) => setData("alamat", e.target.value)}
          rows={3}
          className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
        />
        {errors.alamat && <p className="text-sm text-red-500">{errors.alamat}</p>}
      </div>
    </StudentFormSection>
  )
}
