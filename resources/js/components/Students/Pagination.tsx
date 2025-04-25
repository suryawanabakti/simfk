import { Button } from "@/components/ui/button"
import { Link } from "@inertiajs/react"

interface PaginationProps {
  links: any[]
  current_page: number
  last_page: number
}

export default function Pagination({ links, current_page, last_page }: PaginationProps) {
  if (last_page <= 1) return null

  return (
    <div className="border-t p-4 flex items-center justify-between">
      <div className="text-sm text-gray-500">
        Showing page {current_page} of {last_page}
      </div>
      <div className="flex gap-2">
        {links.map((link, i) => {
          if (link.url === null) {
            return (
              <Button key={i} disabled variant="outline" size="sm">
                {link.label.replace("&laquo;", "«").replace("&raquo;", "»")}
              </Button>
            )
          }
          return (
            <Link key={i} href={link.url}>
              <Button
                variant={link.active ? "default" : "outline"}
                size="sm"
                className={link.active ? "bg-rose-600 hover:bg-rose-700" : ""}
                dangerouslySetInnerHTML={{
                  __html: link.label.replace("&laquo;", "«").replace("&raquo;", "»"),
                }}
              />
            </Link>
          )
        })}
      </div>
    </div>
  )
}
