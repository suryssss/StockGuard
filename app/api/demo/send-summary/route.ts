import { NextResponse } from 'next/server'
import { generateAndSendDailySummary } from '@/lib/summaryService'

export async function POST(request: Request) {
  try {
    const shopId = process.env.NEXT_PUBLIC_SHOP_ID || '11111111-1111-1111-1111-111111111111'
    
    // Allow optional phone override for testing
    const body = await request.json().catch(() => ({}))
    const phoneOverride = body.phone || process.env.OWNER_PHONE

    await generateAndSendDailySummary(shopId, phoneOverride)
    
    return NextResponse.json({ 
        success: true, 
        message: 'Demo Summary Sent! Check your WhatsApp.' 
    })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
