import { NextResponse } from 'next/server'
import { sendWhatsApp } from '@/lib/twilio'
import { createSupabaseServerClient } from '@/lib/supabase-server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { products, shopName, shopkeeperName, shopkeeperPhone } = body

    if (!products || !Array.isArray(products) || products.length === 0) {
      return NextResponse.json({ error: 'No products provided' }, { status: 400 })
    }

    // Build the message
    const productLines = products
      .map((p: { name: string; stock: number; limit: number }, i: number) =>
        `${i + 1}. ${p.name} — Current: ${p.stock} | Min: ${p.limit}`
      )
      .join('\n')

    const message = `📦 *Restock Request — StockGuard*\n\n` +
      `🏪 Shop: ${shopName || 'Shop'}\n` +
      `👤 Shopkeeper: ${shopkeeperName || 'Owner'}\n` +
      `📞 Contact: ${shopkeeperPhone || 'N/A'}\n\n` +
      `━━━━━━━━━━━━━━━━\n` +
      `⚠️ *Low Stock Products:*\n\n` +
      `${productLines}\n\n` +
      `━━━━━━━━━━━━━━━━\n` +
      `Please arrange restocking at the earliest.\n` +
      `_Sent via StockGuard_`

    // Send to the distributor's phone (or owner phone as fallback)
    const distributorPhone = body.distributorPhone || process.env.OWNER_PHONE || ''

    if (!distributorPhone) {
      return NextResponse.json({ error: 'No distributor phone configured' }, { status: 400 })
    }

    await sendWhatsApp(distributorPhone, message)

    return NextResponse.json({
      success: true,
      message: 'Restock notification sent successfully',
      sentTo: distributorPhone.replace(/whatsapp:/, ''),
    })
  } catch (err: any) {
    console.error('Restock notification error:', err)
    return NextResponse.json(
      { error: err.message || 'Failed to send restock notification' },
      { status: 500 }
    )
  }
}
