import { supabase } from '@/lib/supabase'
import ProductsList from '@/components/products/ProductsList'
import { getSession } from '@/lib/auth'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

const DEFAULT_SHOP_ID = process.env.NEXT_PUBLIC_SHOP_ID || ''

async function resolveShopId() {
  const session = await getSession()
  if (session?.shopId) return session.shopId

  const cookieStore = await cookies()
  const supabaseServer = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll() },
        setAll() { },
      },
    }
  )

  const { data: authData } = await supabaseServer.auth.getUser()
  const user = authData.user
  const email = user?.email?.toLowerCase().trim()
  const meta = (user?.user_metadata || {}) as { shop_id?: string; shop_name?: string; shopName?: string }

  if (meta.shop_id) return meta.shop_id

  const metaShopName = meta.shop_name || meta.shopName
  if (metaShopName) {
    const { data: shopByName } = await supabaseServer
      .from('Shop')
      .select('id')
      .eq('name', metaShopName)
      .maybeSingle()
    if (shopByName?.id) return shopByName.id
  }

  if (email) {
    const { data: shopkeeper } = await supabaseServer
      .from('Shopkeeper')
      .select('shopId')
      .eq('email', email)
      .maybeSingle()
    if (shopkeeper?.shopId) return shopkeeper.shopId
  }

  return DEFAULT_SHOP_ID
}

export const dynamic = 'force-dynamic'

export default async function ProductsPage() {
  const shopId = await resolveShopId()
  const today = new Date()

  // Fetch all products for this shop
  const { data: productsData } = await supabase
    .from('Product')
    .select('id, name')
    .eq('shopId', shopId)
    .order('name', { ascending: true })

  const products = productsData || []
  const productIds = products.map(p => p.id)

  // Fetch all batches for these products
  const { data: batchesData } = productIds.length > 0 
    ? await supabase
        .from('Batch')
        .select('*')
        .in('productId', productIds)
    : { data: [] }

  const batches = batchesData || []

  // Group batches by product and calculate stats
  const productList = products.map(p => {
    const productBatches = batches.filter(b => b.productId === p.id)
    
    let totalQty = 0
    let totalValue = 0
    let expiredBatchCount = 0
    let earliestExpiry: Date | null = null
    
    const formattedBatches = productBatches.map(b => {
      const qty = b.quantity || 0
      const price = b.purchasePrice || 0
      const expiry = new Date(b.expiryDate)
      const diffDays = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
      
      totalQty += qty
      totalValue += (qty * price)
      if (diffDays <= 0) expiredBatchCount++
      
      if (!earliestExpiry || expiry < earliestExpiry) {
        earliestExpiry = expiry
      }

      return {
        id: b.id,
        batchNumber: b.batchNumber,
        expiryDate: b.expiryDate,
        quantity: qty,
        purchasePrice: b.purchasePrice,
        daysUntilExpiry: diffDays
      }
    })

    const daysUntilExpiry = earliestExpiry 
      ? Math.ceil(((earliestExpiry as Date).getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
      : null

    return {
      id: p.id,
      name: p.name,
      totalQty,
      totalValue,
      batchCount: formattedBatches.length,
      expiredBatchCount,
      daysUntilExpiry,
      earliestExpiryDate: earliestExpiry ? (earliestExpiry as Date).toISOString() : null,
      batches: formattedBatches.sort((a, b) => a.daysUntilExpiry - b.daysUntilExpiry)
    }
  })

  return (
    <div className="p-4 md:p-6 lg:p-8 w-full max-w-6xl mx-auto flex-1">
      <ProductsList products={productList} shopId={shopId} />
    </div>
  )
}
