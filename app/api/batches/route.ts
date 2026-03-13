import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { shouldBlockReorder } from "@/lib/reorderCheck";
import { z } from "zod";

export async function GET(req: NextRequest) {
  const shopId = req.nextUrl.searchParams.get("shopId");
  if (!shopId)
    return NextResponse.json({ error: "shopId required" }, { status: 400 });

  const batches = await prisma.batch.findMany({
    where: { product: { shopId } },
    include: { product: true, distributor: true },
    orderBy: { expiryDate: "asc" },
  });

  const today = new Date();
  const result = batches.map((b) => ({
    ...b,
    daysUntilExpiry: Math.ceil(
      (b.expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
    ),
  }));

  return NextResponse.json(result);
}

const BatchSchema = z.object({
  shopId: z.string().uuid(),
  productName: z.string().min(1),
  batchNumber: z.string().optional(),
  expiryDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  quantity: z.number().int().positive(),
  purchasePrice: z.number().positive().optional(),
  distributorName: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = BatchSchema.parse(await req.json());

    // Upsert product
    let product = await prisma.product.findFirst({
      where: { shopId: body.shopId, name: body.productName },
    });
    if (!product)
      product = await prisma.product.create({
        data: { shopId: body.shopId, name: body.productName },
      });

    // Upsert distributor
    let distributorId: string | undefined;
    if (body.distributorName) {
      let dist = await prisma.distributor.findFirst({
        where: { shopId: body.shopId, name: body.distributorName },
      });
      if (!dist)
        dist = await prisma.distributor.create({
          data: { shopId: body.shopId, name: body.distributorName },
        });
      distributorId = dist.id;
    }

    // Create batch
    const batch = await prisma.batch.create({
      data: {
        productId: product.id,
        distributorId: distributorId ?? null,
        batchNumber: body.batchNumber ?? null,
        expiryDate: new Date(body.expiryDate),
        quantity: body.quantity,
        purchasePrice: body.purchasePrice ?? null,
      },
    });

    // Reorder check
    const existingBatches = await prisma.batch.findMany({
      where: { productId: product.id },
    });
    const reorderWarning = shouldBlockReorder(
      existingBatches.map((b) => ({
        expiryDate: b.expiryDate,
        quantity: b.quantity,
        purchasePrice: b.purchasePrice,
      })),
    );

    return NextResponse.json({
      batch,
      reorderWarning: reorderWarning.block ? reorderWarning : null,
    });
  } catch (err) {
    if (err instanceof z.ZodError)
      return NextResponse.json({ error: err.errors }, { status: 400 });
    console.error(err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
