import type { ReactNode } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface StudentFormSectionProps {
  title: string
  icon: ReactNode
  color: string
  children: ReactNode
}

export default function StudentFormSection({ title, icon, color, children }: StudentFormSectionProps) {
  return (
    <Card className={`border-t-4 border-t-${color}-500`}>
      <CardHeader className="bg-gray-50">
        <CardTitle className={`flex items-center gap-2 text-${color}-700`}>
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6 pt-6">{children}</CardContent>
    </Card>
  )
}
