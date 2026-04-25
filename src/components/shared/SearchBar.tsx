import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"

interface SearchBarProps {
  onSearch: (value: string) => void
  initialValue?: string
  placeholder?: string
}

export function SearchBar({ onSearch, initialValue = "", placeholder = "Search by business name or city..." }: SearchBarProps) {
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(value)
    }, 400)

    return () => clearTimeout(timer)
  }, [value, onSearch])

  return (
    <div className="relative w-full max-w-2xl">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="pl-10 pr-10 h-12 text-lg shadow-sm"
        placeholder={placeholder}
      />
      {value && (
        <button
          onClick={() => setValue("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}
