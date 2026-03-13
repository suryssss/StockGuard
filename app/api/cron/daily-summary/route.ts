import { NextResponse } from 'next/server'
import { generateAndSendDailySummary } from '@/lib/summaryService'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const authHeader = request.headers.get('Authorization')
  
  // Basic check for hackathon security
  if (process.env.NODE_ENV === 'production' && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const shopId = process.env.NEXT_PUBLIC_SHOP_ID || '11111111-1111-1111-1111-111111111111'
    await generateAndSendDailySummary(shopId)
    
    return NextResponse.json({ success: true, message: 'Daily summary dispatched' })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
