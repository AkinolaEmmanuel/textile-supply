import { NIGERIAN_STATES, FABRIC_TYPES } from "@/lib/constants"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { useState } from "react"

interface FilterSidebarProps {
  filters: any
  onFilterChange: (filters: any) => void
  onReset: () => void
}

export function FilterSidebar({ filters, onFilterChange, onReset }: FilterSidebarProps) {
  const [allFabrics, setAllFabrics] = useState<string[]>([...FABRIC_TYPES])
  const [customFabric, setCustomFabric] = useState("")

  const handleStateChange = (value: string) => {
    onFilterChange({ ...filters, locationState: value === "all" ? undefined : value })
  }

  const handleFabricToggle = (fabric: string) => {
    const next = filters.fabricType === fabric ? undefined : fabric
    onFilterChange({ ...filters, fabricType: next })
  }

  const handleAddCustomFabric = () => {
    const trimmed = customFabric.trim()
    if (!trimmed) return
    
    if (!allFabrics.includes(trimmed)) {
      setAllFabrics(prev => [...prev, trimmed])
    }
    
    handleFabricToggle(trimmed)
    setCustomFabric("")
  }

  return (
    <div className="space-y-8 p-6 bg-white rounded-2xl border shadow-sm sticky top-24">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-lg">Filters</h2>
        <Button variant="ghost" size="sm" onClick={onReset} className="text-xs text-muted-foreground hover:text-primary">Reset</Button>
      </div>

      {/* State Filter */}
      <div className="space-y-3">
        <Label className="text-xs uppercase tracking-widest font-bold text-muted-foreground">Location (State)</Label>
        <Select onValueChange={handleStateChange} value={filters.locationState || "all"}>
          <SelectTrigger className="h-10">
            <SelectValue placeholder="All Nigeria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Nigeria</SelectItem>
            {NIGERIAN_STATES.map(state => (
              <SelectItem key={state} value={state}>{state}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Fabric Type Filter */}
      <div className="space-y-3">
        <Label className="text-xs uppercase tracking-widest font-bold text-muted-foreground">Fabric Types</Label>
        <div className="grid grid-cols-1 gap-2 max-h-56 overflow-y-auto pr-2 custom-scrollbar">
          {allFabrics.map(fabric => (
            <div key={fabric} className="flex items-center space-x-2">
              <Checkbox 
                id={`fabric-${fabric}`} 
                checked={filters.fabricType === fabric}
                onCheckedChange={() => handleFabricToggle(fabric)}
              />
              <label 
                htmlFor={`fabric-${fabric}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                {fabric}
              </label>
            </div>
          ))}
        </div>
        <div className="flex gap-2 pt-2">
          <Input 
            placeholder="Add other..." 
            className="h-9 text-xs" 
            value={customFabric}
            onChange={(e) => setCustomFabric(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddCustomFabric()}
          />
          <Button variant="outline" size="sm" className="h-9 px-3 text-xs" onClick={handleAddCustomFabric}>Add</Button>
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="space-y-3">
        <Label className="text-xs uppercase tracking-widest font-bold text-muted-foreground">Price Range (₦)</Label>
        <div className="flex items-center gap-2">
          <Input 
            type="number" 
            placeholder="Min" 
            className="h-10"
            value={filters.minPrice || ""}
            onChange={(e) => onFilterChange({ ...filters, minPrice: e.target.value ? Number(e.target.value) : undefined })}
          />
          <span className="text-muted-foreground">-</span>
          <Input 
            type="number" 
            placeholder="Max" 
            className="h-10"
            value={filters.maxPrice || ""}
            onChange={(e) => onFilterChange({ ...filters, maxPrice: e.target.value ? Number(e.target.value) : undefined })}
          />
        </div>
      </div>
    </div>
  )
}
