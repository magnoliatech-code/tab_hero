import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"

interface SortDropdownProps {
  onSortByTitle: () => void
  onSortByUrl: () => void
}

export function SortDropdown({ onSortByTitle, onSortByUrl }: SortDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 w-8 p-0">
          <ArrowUpDown className="h-4 w-4" />
          <span className="sr-only">Sort tabs</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={onSortByTitle}>
          Sort by Title
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onSortByUrl}>
          Sort by URL
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
