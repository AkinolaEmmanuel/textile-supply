export const NIGERIAN_STATES = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno",
  "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "Gombe", "Imo",
  "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos",
  "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers",
  "Sokoto", "Taraba", "Yobe", "Zamfara", "Federal Capital Territory"
] as const

export const FABRIC_TYPES = [
  "Ankara",
  "Adire",
  "Lace",
  "Cotton",
  "Aso-oke",
  "Brocade",
  "Chiffon",
  "Silk",
  "Velvet",
  "Guinee",
  "Kampala"
] as const

export const API_BASE_URL = import.meta.env.VITE_API_URL || "https://market-place-1-q80m.onrender.com"
