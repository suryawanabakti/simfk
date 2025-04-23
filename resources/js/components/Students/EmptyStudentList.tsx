import { GraduationCapIcon } from "lucide-react"

export default function EmptyStudentList() {
  return (
    <div className="px-6 py-8 text-center text-gray-500">
      <div className="flex flex-col items-center justify-center">
        <GraduationCapIcon className="h-12 w-12 text-gray-300 mb-2" />
        <p className="text-lg font-medium">No students found</p>
        <p className="text-sm">Try adjusting your search or add a new student</p>
      </div>
    </div>
  )
}
