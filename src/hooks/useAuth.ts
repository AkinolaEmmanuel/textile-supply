import { useMutation, useQuery } from "@tanstack/react-query"
import api from "@/services/api"
import { useAuthStore } from "@/store/auth-store"
import type { ApiResponse, AuthData, User } from "@/types"

export function useAuth() {
  const { setAuth, logout, user, isAuthenticated } = useAuthStore()

  const loginMutation = useMutation({
    mutationFn: async (credentials: any) => {
      const { data } = await api.post<ApiResponse<AuthData>>("/auth/login", credentials)
      return data.data
    },
    onSuccess: (data) => {
      setAuth(data.user, data.token)
    },
  })

  const registerMutation = useMutation({
    mutationFn: async (payload: any) => {
      const { data } = await api.post<ApiResponse<AuthData>>("/auth/register", payload)
      return data.data
    },
    onSuccess: (data) => {
      setAuth(data.user, data.token)
    },
  })

  const meQuery = useQuery({
    queryKey: ["auth-me"],
    queryFn: async () => {
      const { data } = await api.get<ApiResponse<User>>("/auth/me")
      return data.data
    },
    enabled: !!localStorage.getItem("auth_token") && !user,
  })

  return {
    user,
    isAuthenticated,
    login: loginMutation.mutateAsync,
    register: registerMutation.mutateAsync,
    logout,
    isLoading: loginMutation.isPending || registerMutation.isPending || meQuery.isLoading,
  }
}
