import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { getSession } from '@/lib/auth'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

async function resolveShopIdFromAuth() {
  const session = await getSession()
  if (session?.shopId) return session.shopId

  const cookieStore = await cookies()
  const supabaseServer = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll() },
        setAll() {},
      },
    },
  )

  const { data: authData } = await supabaseServer.auth.getUser()
  const user = authData.user
  const email = user?.email?.toLowerCase().trim()
  const meta = (user?.user_metadata || {}) as {
    shop_id?: string
    shop_name?: string
    shopName?: string
  }

  if (meta.shop_id) return meta.shop_id

  const metaShopName = meta.shop_name || meta.shopName
  if (metaShopName && typeof metaShopName === 'string') {
    const { data: shopByName } = await supabaseServer
      .from('Shop')
      .select('id')
      .eq('name', metaShopName.trim())
      .maybeSingle()
    if (shopByName?.id) return shopByName.id
  }

  if (!email) return null

  const { data: shopkeeper } = await supabaseServer
    .from('Shopkeeper')
    .select('shopId')
    .eq('email', email)
    .maybeSingle()

  return shopkeeper?.shopId || process.env.NEXT_PUBLIC_SHOP_ID || null
}

export async function GET(req: NextRequest) {
  const shopId =
    (await resolveShopIdFromAuth()) ||
    req.nextUrl.searchParams.get('shopId') ||
    process.env.NEXT_PUBLIC_SHOP_ID

  if (!shopId)
    return NextResponse.json({ error: 'Unauthorized: shop context not found' }, { status: 401 })

  // Resolve date range (defaults to today in IST)
  const dateParam = req.nextUrl.searchParams.get('date')
  let reportDate: string
  if (dateParam && /^\d{4}-\d{2}-\d{2}$/.test(dateParam)) {
    reportDate = dateParam
  } else {
    const now = new Date()
    // IST offset +5:30
    const ist = new Date(now.getTime() + 5.5 * 60 * 60 * 1000)
    reportDate = ist.toISOString().slice(0, 10)
  }

  const dayStart = `${reportDate}T00:00:00.000Z`
  const dayEnd = `${reportDate}T23:59:59.999Z`

  // ── Shop name ──────────────────────────────────────────────────
  const { data: shopData } = await supabase
    .from('Shop')
    .select('name')
    .eq('id', shopId)
    .maybeSingle()

  const shopName = shopData?.name || 'My Shop'

  // ── Daily sales (Fetch Sales first) ──────────────────────────
  const { data: rawSales, error: salesErr } = await supabase
    .from('Sales')
    .select('id, productName, quantity, createdAt, batchId')
    .eq('shopId', shopId)
    .gte('createdAt', dayStart)
    .lte('createdAt', dayEnd)
    .order('createdAt', { ascending: true })

  if (salesErr) {
    console.error('Sales fetch error:', salesErr)
    return NextResponse.json({ error: 'Failed to fetch sales data' }, { status: 500 })
  }

  // Fetch unique batches separately because no foreign key exists in schema cache
  const batchIds = Array.from(new Set((rawSales || []).map((s: any) => s.batchId).filter(Boolean)))
  let batchMap: Record<string, any> = {}
  
  if (batchIds.length > 0) {
    const { data: batches } = await supabase
      .from('Batch')
      .select('id, batchNumber, expiryDate, purchasePrice')
      .in('id', batchIds)
    
    batchMap = (batches || []).reduce((acc: any, b: any) => {
      acc[b.id] = b
      return acc
    }, {})
  }

  const sales = (rawSales || []).map((s: any) => {
    const batch = batchMap[s.batchId] || {}
    return {
      id: s.id,
      productName: s.productName || 'Unknown',
      quantity: s.quantity || 0,
      createdAt: s.createdAt,
      batchNumber: batch.batchNumber || null,
      expiryDate: batch.expiryDate || null,
      purchasePrice: batch.purchasePrice || null,
    }
  })

  // ── 7-day trend (Already simple query) ───────────────────────
  const trendStart = new Date(reportDate)
  trendStart.setDate(trendStart.getDate() - 6)
  const trendStartStr = trendStart.toISOString().slice(0, 10) + 'T00:00:00.000Z'

  const { data: trendRaw } = await supabase
    .from('Sales')
    .select('quantity, productName, createdAt')
    .eq('shopId', shopId)
    .gte('createdAt', trendStartStr)
    .lte('createdAt', dayEnd)

  const trendMap: Record<string, { items: number; products: Set<string> }> = {}
  for (let i = 0; i < 7; i++) {
    const d = new Date(trendStart)
    d.setDate(d.getDate() + i)
    const key = d.toISOString().slice(0, 10)
    trendMap[key] = { items: 0, products: new Set() }
  }

  for (const row of trendRaw || []) {
    const day = (row.createdAt as string).slice(0, 10)
    if (trendMap[day]) {
      trendMap[day].items += row.quantity || 0
      trendMap[day].products.add(row.productName || '')
    }
  }

  const trend7 = Object.entries(trendMap).map(([date, v]) => ({
    date,
    itemsSold: v.items,
    uniqueProducts: v.products.size,
  }))

  // ── All-time performance (Fetch Sales, then merge prices) ──────
  const { data: perfRaw } = await supabase
    .from('Sales')
    .select('productName, quantity, batchId')
    .eq('shopId', shopId)

  // Extract all batch IDs for performance data
  const perfBatchIds = Array.from(new Set((perfRaw || []).map((s: any) => s.batchId).filter(Boolean)))
  let perfBatchMap: Record<string, number> = {} // batchId -> purchasePrice
  
  if (perfBatchIds.length > 0) {
    const { data: pBatches } = await supabase
      .from('Batch')
      .select('id, purchasePrice')
      .in('id', perfBatchIds)
    
    perfBatchMap = (pBatches || []).reduce((acc: any, b: any) => {
      acc[b.id] = b.purchasePrice || 0
      return acc
    }, {})
  }

  const perfMap: Record<string, { totalSold: number; totalRevenue: number; count: number }> = {}
  for (const row of perfRaw || []) {
    const name = (row as any).productName || 'Unknown'
    const qty = (row as any).quantity || 0
    const price = perfBatchMap[(row as any).batchId] || 0
    if (!perfMap[name]) perfMap[name] = { totalSold: 0, totalRevenue: 0, count: 0 }
    perfMap[name].totalSold += qty
    perfMap[name].totalRevenue += qty * price
    perfMap[name].count += 1
  }

  const totalRevenue = Object.values(perfMap).reduce((s, v) => s + v.totalRevenue, 0)

  const productPerf = Object.entries(perfMap)
    .map(([name, v]) => ({
      productName: name,
      totalSold: v.totalSold,
      totalRevenue: Math.round(v.totalRevenue * 100) / 100,
      avgUnitPrice: v.totalSold > 0 ? Math.round((v.totalRevenue / v.totalSold) * 100) / 100 : 0,
      revenuePercent:
        totalRevenue > 0
          ? Math.round((v.totalRevenue / totalRevenue) * 10000) / 100
          : 0,
    }))
    .sort((a, b) => b.totalRevenue - a.totalRevenue)

  return NextResponse.json({ shopName, reportDate, sales, trend7, productPerf })
}
