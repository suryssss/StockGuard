import { NextRequest, NextResponse } from "next/server";
import { lookupBarcode } from "@/lib/openFoodFacts";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");
  if (!code)
    return NextResponse.json({ error: "code required" }, { status: 400 });
  const productName = await lookupBarcode(code);
  return NextResponse.json({ productName });
}
