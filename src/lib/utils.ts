import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNaira(amount: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(amount)
}

export function formatPhoneNG(phone: string) {
  // Basic normalization: remove spaces, dashes, etc.
  let cleaned = phone.replace(/\D/g, "")
  
  // If starts with 0, replace with +234
  if (cleaned.startsWith("0")) {
    cleaned = "234" + cleaned.substring(1)
  }
  
  // Ensure starts with +
  return cleaned.startsWith("234") ? `+${cleaned}` : cleaned
}

export function getWhatsAppLink(phone: string, message: string = "Hello, I saw your profile on fab.") {
  const cleanedPhone = phone.replace(/\D/g, "")
  const finalPhone = cleanedPhone.startsWith("0") ? "234" + cleanedPhone.substring(1) : cleanedPhone
  return `https://wa.me/${finalPhone}?text=${encodeURIComponent(message)}`
}
