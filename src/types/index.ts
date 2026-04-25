export type UserRole = "DESIGNER" | "PRODUCER";

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
  producerProfile: EmbeddedProducerProfile | null;
}

export interface OwnerSummary {
  id: string;
  fullName: string;
}

export interface EmbeddedProducerProfile {
  id: string;
  businessName: string;
  description: string;
  locationState: string;
  locationCity: string;
  address: string;
  fabricTypes: string[];
  priceRangeMin: number | null;
  priceRangeMax: number | null;
  minimumOrderQuantity: number;
  deliveryAvailable: boolean;
  whatsappNumber: string;
  profileImageUrl: string | null;
  isVerified: boolean;
  ratingAverage: number;
  ratingCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProducerProfile extends EmbeddedProducerProfile {
  owner: OwnerSummary;
}

export interface AuthData {
  token: string;
  user: User;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface MarketplaceResults {
  items: ProducerProfile[];
  pagination: Pagination;
}

export interface SearchFilters {
  locationState?: string;
  locationCity?: string;
  fabricType?: string;
  deliveryAvailable?: boolean;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: "newest" | "rating" | "businessName";
}
