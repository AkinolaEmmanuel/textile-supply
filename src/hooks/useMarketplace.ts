import { useQuery } from "@tanstack/react-query"
import api from "@/services/api"
import type { ApiResponse, ProducerProfile, SearchFilters, MarketplaceResults } from "@/types"

export function useMarketplace(filters: SearchFilters, page: number = 1) {
  return useQuery({
    queryKey: ["producers", filters, page],
    queryFn: async () => {
      const { data } = await api.get<ApiResponse<MarketplaceResults>>("/marketplace/producers", {
        params: { ...filters, page, limit: 12 },
      })
      return data.data
    },
    placeholderData: (previousData) => previousData,
  })
}

export function useProducer(id: string) {
  return useQuery({
    queryKey: ["producer", id],
    queryFn: async () => {
      const { data } = await api.get<ApiResponse<{ profile: ProducerProfile }>>(`/producers/${id}`)
      return data.data.profile
    },
    enabled: !!id,
  })
}
