export interface Profile {
  id: string
  full_name: string | null
  username: string | null
  bio: string | null
  avatar_url: string | null
  phone_number: string | null
  shop_name: string | null
  business_category: string | null
  shop_address: string | null
  gst_number: string | null
  created_at: string
  updated_at: string
}

export interface ProfileFormData {
  full_name: string
  username: string
  bio: string
  phone_number: string
  shop_name: string
  business_category: string
  shop_address: string
  gst_number: string
}

export const BUSINESS_CATEGORIES = [
  { value: 'pharmacy', label: 'Pharmacy / Medical Store' },
  { value: 'grocery', label: 'Grocery / Kirana' },
  { value: 'electronics', label: 'Electronics' },
  { value: 'clothing', label: 'Clothing / Garments' },
  { value: 'stationery', label: 'Stationery / Books' },
  { value: 'hardware', label: 'Hardware / Tools' },
  { value: 'cosmetics', label: 'Cosmetics / Beauty' },
  { value: 'fmcg', label: 'FMCG / Daily Essentials' },
  { value: 'other', label: 'Other' },
] as const
