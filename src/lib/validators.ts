import { z } from "zod"

const phoneRegex = /^(\+234|0)[789][01]\d{8}$/

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

export const registerBaseSchema = z.object({
  fullName: z.string().min(3, "Full name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phone: z.string().regex(phoneRegex, "Invalid Nigerian phone number"),
  role: z.enum(["DESIGNER", "PRODUCER"]),
})

export const registerProducerSchema = registerBaseSchema.extend({
  businessName: z.string().min(2, "Business name is required"),
  state: z.string().min(1, "Please select a state"),
  city: z.string().min(1, "Please enter your city"),
  fabricTypes: z.array(z.string()).min(1, "Select at least one fabric type"),
  whatsappNumber: z.string().regex(phoneRegex, "Invalid WhatsApp number"),
})

export const profileUpdateSchema = z.object({
  bio: z.string().max(500, "Bio must be under 500 characters"),
  address: z.string().min(5, "Address is required"),
  moq: z.number().min(1, "Minimum order quantity must be at least 1"),
  priceMin: z.number().min(0),
  priceMax: z.number().min(0),
}).refine((data) => data.priceMax >= data.priceMin, {
  message: "Max price cannot be less than min price",
  path: ["priceMax"],
})

export const searchFiltersSchema = z.object({
  state: z.string().optional(),
  fabricTypes: z.array(z.string()).optional(),
  deliveryAvailable: z.boolean().optional(),
  priceMin: z.number().optional(),
  priceMax: z.number().optional(),
  query: z.string().optional(),
})
