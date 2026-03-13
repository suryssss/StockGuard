import { createClient } from '@supabase/supabase-js'
import { sendWhatsAppMessage } from '@/lib/twilio'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function generateAndSendDailySummary(shopId: string, phoneOverride?: string) {
  try {
    // 1. Fetch Today's Date Range
    const todayStart = new Date()
    todayStart.setHours(0, 0, 0, 0)
    
    const todayEnd = new Date()
    todayEnd.setHours(23, 59, 59, 999)

    // 2. Fetch Shop Details
    const { data: shop } = await supabase
      .from('Shop')
      .select('*')
      .eq('id', shopId)
      .single()

    if (!shop) throw new Error('Shop not found')

    const targetPhone = phoneOverride || shop.whatsappNum || process.env.OWNER_PHONE
    if (!targetPhone) throw new Error('No target phone number found')

    // 3. Fetch Data
    // Items Expiring Today or Tomorrow
    const { data: expiries } = await supabase
      .from('Batch')
      .select('*, product:Product(name)')
      .lte('expiryDate', todayEnd.toISOString())
      .gt('quantity', 0)

    // Sales Today
    const { data: sales } = await supabase
      .from('Sales')
      .select('*')
      .eq('shopId', shopId)
      .gte('createdAt', todayStart.toISOString())
      .lte('createdAt', todayEnd.toISOString())

    // Low Stock Items (Stock <= 10)
    const { data: batches } = await supabase
        .from('Batch')
        .select('productId, quantity, product:Product(name)')
        .eq('Product.shopId', shopId)

    const stockMap: Record<string, { name: string, stock: number }> = {}
    batches?.forEach((b: any) => {
        if (!stockMap[b.productId]) {
            stockMap[b.productId] = { name: b.product?.name || 'Unknown', stock: 0 }
        }
        stockMap[b.productId].stock += b.quantity
    })

    const lowStockItems = Object.values(stockMap).filter(item => item.stock > 0 && item.stock <= 10)

    // 4. Build Message
    let message = `Good Morning! ☀️\n\n`
    message += `Daily Summary for *${shop.name}*\n\n`

    message += `Today's Notifications:\n`
    if (expiries && expiries.length > 0) {
        expiries.forEach(e => {
            message += `• ${e.product?.name || 'Item'} - Expiring Today! 🚨\n`
        })
    } else {
        message += `• No items expiring today. Clear skies! ✅\n`
    }

    message += `\nLow Stock Alerts:\n`
    if (lowStockItems.length > 0) {
        lowStockItems.slice(0, 3).forEach(item => {
            message += `• ${item.name} - Remaining: ${item.stock}\n`
        })
        if (lowStockItems.length > 3) message += `• ...and ${lowStockItems.length - 3} more\n`
    } else {
        message += `• Stock levels are healthy. 👍\n`
    }

    message += `\nSales Status:\n`
    const totalSold = sales?.reduce((acc: number, s: any) => acc + s.quantity, 0) || 0
    message += `• Items Sold Today: ${totalSold}\n`
    
    message += `\nKeep up the great work! 🚀\n- StockGuard AI`

    // 5. Send Message
    await sendWhatsAppMessage(targetPhone, message)
    
    console.log(`Daily summary sent successfully to ${targetPhone}`)
    return { success: true, message: 'Summary sent' }

  } catch (error: any) {
    console.error('Daily summary generation failed', error)
    throw error
  }
}
