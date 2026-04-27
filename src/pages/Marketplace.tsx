import { useState } from "react"
import { useSearchParams } from "react-router-dom"
import { FilterSidebar } from "@/components/marketplace/FilterSidebar"
import { ProducerCard } from "@/components/marketplace/ProducerCard"
import { SearchBar } from "@/components/shared/SearchBar"
import { useMarketplace } from "@/hooks/useMarketplace"
import type { SearchFilters } from "@/types"
import { Loader2, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Marketplace() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false)

  // Sync state with URL params
  const filters: SearchFilters = {
    search: searchParams.get("q") || undefined,
    locationState: searchParams.get("state") || undefined,
    fabricType: searchParams.get("fabric") || undefined,
    minPrice: searchParams.get("min") ? Number(searchParams.get("min")) : undefined,
    maxPrice: searchParams.get("max") ? Number(searchParams.get("max")) : undefined,
  }

  const { data, isLoading } = useMarketplace(filters)

  const handleFilterChange = (newFilters: SearchFilters) => {
    const params = new URLSearchParams()
    if (newFilters.search) params.set("q", newFilters.search)
    if (newFilters.locationState) params.set("state", newFilters.locationState)
    if (newFilters.fabricType) params.set("fabric", newFilters.fabricType)
    if (newFilters.minPrice) params.set("min", String(newFilters.minPrice))
    if (newFilters.maxPrice) params.set("max", String(newFilters.maxPrice))
    setSearchParams(params)
  }

  const resetFilters = () => setSearchParams(new URLSearchParams())

  return (
    <div className="w-full px-6 md:px-32 py-8">
      <div className="flex flex-col gap-8">
        {/* Header Area */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="space-y-1 text-center md:text-left">
            <h1 className="text-3xl font-display font-bold text-primary italic">Textile Marketplace</h1>
            <p className="text-muted-foreground">Find verified producers across all 36 Nigerian states.</p>
          </div>
          
          <SearchBar 
            onSearch={(q) => handleFilterChange({ ...filters, search: q })}
            initialValue={filters.search}
          />
          
          <Button 
            variant="outline" 
            className="md:hidden flex gap-2 w-full"
            onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
          >
            <SlidersHorizontal className="h-4 w-4" />
            {isMobileFiltersOpen ? "Hide Filters" : "Show Filters"}
          </Button>
        </div>

        <div className="flex flex-col md:grid md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className={isMobileFiltersOpen ? "block" : "hidden md:block"}>
            <FilterSidebar 
              filters={filters} 
              onFilterChange={handleFilterChange}
              onReset={resetFilters}
            />
          </div>

          {/* Results Grid */}
          <div className="md:col-span-3">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-4">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
                <p className="text-muted-foreground animate-pulse">Fetching producers...</p>
              </div>
            ) : data?.items && data.items.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.items.map(producer => (
                  <ProducerCard key={producer.id} producer={producer} />
                ))}
              </div>
            ) : (
              <div className="bg-white border rounded-2xl p-12 text-center space-y-4">
                <div className="mx-auto h-20 w-20 rounded-full bg-slate-50 flex items-center justify-center">
                  <SlidersHorizontal className="h-10 w-10 text-slate-300" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">No producers found</h3>
                  <p className="text-muted-foreground">Try adjusting your filters or location to find more results.</p>
                </div>
                <Button onClick={resetFilters} variant="outline">Clear All Filters</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
