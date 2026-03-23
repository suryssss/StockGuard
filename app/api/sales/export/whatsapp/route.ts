import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { getSession } from '@/lib/auth'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import * as XLSX from 'xlsx'
import { sendWhatsAppMedia } from '@/lib/twilio'

// Create a service-role client for storage operations
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

async function resolveShopInfoFromAuth() {
  const session = await getSession()
  let shopId = session?.shopId
  console.log('Auth Resolve: Session shopId:', shopId)

  if (!shopId) {
    const cookieStore = await cookies()
    const supabaseServer = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() { return cookieStore.getAll() },
          setAll() {},
        },
      },
    )

    const { data: authData } = await supabaseServer.auth.getUser()
    const user = authData.user
    console.log('Auth Resolve: User found:', !!user)
    
    if (user) {
      const email = user.email?.toLowerCase().trim()
      const meta = (user.user_metadata || {}) as { shop_id?: string; shop_name?: string; shopName?: string }
      
      if (meta.shop_id) {
        shopId = meta.shop_id
        console.log('Auth Resolve: Meta shopId:', shopId)
      } else if (email) {
        const { data: shopkeeper } = await supabaseAdmin
          .from('Shopkeeper')
          .select('shopId')
          .eq('email', email)
          .maybeSingle()
        shopId = shopkeeper?.shopId
        console.log('Auth Resolve: Shopkeeper lookup shopId:', shopId)
      }
    }
  }

  shopId = shopId || process.env.NEXT_PUBLIC_SHOP_ID
  console.log('Auth Resolve: Final shopId:', shopId)

  if (!shopId) return null

  const { data: shop } = await supabaseAdmin.from('Shop').select('*').eq('id', shopId).maybeSingle()
  console.log('Auth Resolve: Shop record found:', !!shop)
  return shop
}

export async function POST(req: NextRequest) {
  try {
    const shop = await resolveShopInfoFromAuth()
    if (!shop) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const shopId = shop.id
    const shopName = shop.name || 'My Shop'
    const targetPhone = shop.whatsappNum || process.env.OWNER_PHONE

    if (!targetPhone) return NextResponse.json({ error: 'No WhatsApp number configured for this shop' }, { status: 400 })

    // 1. Resolve date
    const { date: dateParam } = await req.json().catch(() => ({}))
    let reportDate: string
    if (dateParam && /^\d{4}-\d{2}-\d{2}$/.test(dateParam)) {
      reportDate = dateParam
    } else {
      const now = new Date()
      const ist = new Date(now.getTime() + 5.5 * 60 * 60 * 1000)
      reportDate = ist.toISOString().slice(0, 10)
    }

    const dayStart = `${reportDate}T00:00:00.000Z`
    const dayEnd = `${reportDate}T23:59:59.999Z`

    // 2. Fetch Data (using same two-step logic as download API)
    const { data: rawSales } = await supabaseAdmin
      .from('Sales')
      .select('id, productName, quantity, createdAt, batchId')
      .eq('shopId', shopId)
      .gte('createdAt', dayStart)
      .lte('createdAt', dayEnd)
      .order('createdAt', { ascending: true })

    const batchIds = Array.from(new Set((rawSales || []).map((s: any) => s.batchId).filter(Boolean)))
    let batchMap: Record<string, any> = {}
    if (batchIds.length > 0) {
      const { data: batches } = await supabaseAdmin.from('Batch').select('id, batchNumber, expiryDate, purchasePrice').in('id', batchIds)
      batchMap = (batches || []).reduce((acc: any, b: any) => { acc[b.id] = b; return acc }, {})
    }

    const salesList = (rawSales || []).map((s: any, i: number) => {
      const batch = batchMap[s.batchId] || {}
      return [
        i + 1,
        s.productName,
        batch.batchNumber || 'N/A',
        s.quantity,
        batch.purchasePrice ?? '',
        batch.purchasePrice ? (s.quantity * batch.purchasePrice) : '',
        batch.expiryDate ? batch.expiryDate.slice(0, 10) : 'N/A',
        s.createdAt ? new Date(s.createdAt).toLocaleTimeString('en-IN') : '',
      ]
    })

    // 3. Generate Excel Buffer
    const wb = XLSX.utils.book_new()
    const totalQty = (rawSales || []).reduce((s, r) => s + (r.quantity || 0), 0)
    const totalValue = (rawSales || []).reduce((s: number, r: any) => s + (r.quantity || 0) * (batchMap[r.batchId]?.purchasePrice || 0), 0)

    const sheet1Data: any[][] = [
      ['StockGuard — Daily Sales Report'],
      [`Shop: ${shopName}`, '', `Date: ${reportDate}`],
      [],
      ['#', 'Product Name', 'Batch No.', 'Qty Sold', 'Unit Price (₹)', 'Sale Value (₹)', 'Expiry Date', 'Time'],
      ...salesList,
      ['', 'TOTAL', '', totalQty, '', Math.round(totalValue * 100) / 100, '', ''],
    ]
    const ws1 = XLSX.utils.aoa_to_sheet(sheet1Data)
    ws1['!cols'] = [{ wch: 4 }, { wch: 28 }, { wch: 14 }, { wch: 10 }, { wch: 14 }, { wch: 14 }, { wch: 14 }, { wch: 12 }]
    ws1['!merges'] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 7 } }]
    XLSX.utils.book_append_sheet(wb, ws1, 'Daily Sales')

    const buf = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' })

    // 4. Ensure Bucket & Upload
    const bucketName = 'reports'
    const fileName = `${shopId}/Sales_${reportDate}_${Date.now()}.xlsx`
    console.log('WhatsApp Export: Preparing upload to bucket:', bucketName)

    // Check if bucket exists
    const { data: buckets, error: listErr } = await supabaseAdmin.storage.listBuckets()
    if (listErr) {
      console.error('WhatsApp Export: Failed to list buckets:', listErr)
      throw new Error(`Failed to verify storage: ${listErr.message}`)
    }

    const exists = buckets.some((b) => b.name === bucketName)
    if (!exists) {
      console.log('WhatsApp Export: Creating missing bucket:', bucketName)
      const { error: createErr } = await supabaseAdmin.storage.createBucket(bucketName, {
        public: true,
        fileSizeLimit: 5242880, // 5MB limit
      })
      if (createErr && createErr.message !== 'Already exists') {
        console.error('WhatsApp Export: Failed to create bucket:', createErr)
        throw new Error(`Could not create storage bucket: ${createErr.message}`)
      }
    }

    console.log('WhatsApp Export: Uploading file:', fileName)
    const { error: uploadErr } = await supabaseAdmin.storage
      .from(bucketName)
      .upload(fileName, buf, {
        contentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        upsert: true,
      })

    if (uploadErr) {
      console.error('WhatsApp Export: Upload failed:', uploadErr)
      throw new Error(`Upload to storage failed: ${uploadErr.message}`)
    }

    const { data: urlData } = supabaseAdmin.storage.from(bucketName).getPublicUrl(fileName)
    const publicUrl = urlData.publicUrl

    // 5. Send WhatsApp
    const message = `📊 *Daily Sales Report Available*\n\nShop: ${shopName}\nDate: ${reportDate}\nTotal Items: ${totalQty}\nTotal Value: ₹${Math.round(totalValue)}\n\nYou can download the full Excel report from the link below:`
    
    await sendWhatsAppMedia(targetPhone, message, publicUrl)

    return NextResponse.json({ success: true, url: publicUrl })
  } catch (err: any) {
    console.error('WhatsApp Export Error:', err)
    return NextResponse.json({ error: err.message || 'Internal error' }, { status: 500 })
  }
}
