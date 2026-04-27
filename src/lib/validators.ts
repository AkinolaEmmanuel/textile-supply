import { z } from "zod"

const phoneRegex = /^(\+234|0)[789][01]\d{8}$/

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

export const registerBaseSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters").max(120),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters").max(72),
  phoneNumber: z.string().regex(phoneRegex, "Invalid Nigerian phone number"),
  role: z.enum(["DESIGNER", "PRODUCER"]),
})

export const registerProducerSchema = registerBaseSchema.extend({
  businessName: z.string().min(2, "Business name is required").max(120),
  description: z.string().min(10, "Description must be at least 10 characters").max(1000),
  locationState: z.string().min(1, "Please select a state"),
  locationCity: z.string().min(2, "City name must be at least 2 characters").max(120),
  address: z.string().min(5, "Address must be at least 5 characters").max(255),
  fabricTypes: z.array(z.string()).min(1, "Select at least one fabric type"),
  minimumOrderQuantity: z.number().min(1, "MOQ must be at least 1"),
  deliveryAvailable: z.boolean(),
  whatsappNumber: z.string().regex(phoneRegex, "Invalid WhatsApp number"),
})

export const profileUpdateSchema = z.object({
  businessName: z.string().min(2).max(120).optional(),
  description: z.string().min(10).max(1000).optional(),
  locationState: z.string().optional(),
  locationCity: z.string().min(2).max(120).optional(),
  address: z.string().min(5).max(255).optional(),
  fabricTypes: z.array(z.string()).min(1).optional(),
  priceRangeMin: z.number().min(0).nullable().optional(),
  priceRangeMax: z.number().min(0).nullable().optional(),
  minimumOrderQuantity: z.number().min(1).optional(),
  deliveryAvailable: z.boolean().optional(),
  whatsappNumber: z.string().regex(phoneRegex).optional(),
  profileImageUrl: z.string().url().nullable().optional(),
})

export const searchFiltersSchema = z.object({
  locationState: z.string().optional(),
  locationCity: z.string().optional(),
  fabricType: z.string().optional(),
  deliveryAvailable: z.boolean().optional(),
  minPrice: z.number().min(0).optional(),
  maxPrice: z.number().min(0).optional(),
  search: z.string().optional(),
  page: z.number().min(1).optional(),
  limit: z.number().min(1).max(100).optional(),
  sortBy: z.enum(["newest", "rating", "businessName"]).optional(),
})
