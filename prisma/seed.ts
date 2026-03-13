import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function daysFromNow(n: number): Date {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d;
}

async function main() {
  // Shop
  const shop = await prisma.shop.create({
    data: {
      name: "Ram Medical Store",
      ownerName: "Ramesh Kumar",
      whatsappNum: "+919876543210",
    },
  });

  // Distributors
  const sharmaP = await prisma.distributor.create({
    data: {
      shopId: shop.id,
      name: "Sharma Pharma Dist.",
      whatsappNum: "+919111111111",
    },
  });
  const krishna = await prisma.distributor.create({
    data: {
      shopId: shop.id,
      name: "Krishna FMCG",
      whatsappNum: "+919222222222",
    },
  });
  const mehta = await prisma.distributor.create({
    data: {
      shopId: shop.id,
      name: "Mehta Wholesale",
      whatsappNum: "+919333333333",
    },
  });

  // Products + Batches
  const items = [
    {
      name: "Paracetamol 500mg",
      batch: "B241",
      days: 4,
      qty: 60,
      price: 8,
      dist: sharmaP,
    },
    {
      name: "Amoxicillin 250mg",
      batch: "A102",
      days: 6,
      qty: 30,
      price: 22,
      dist: sharmaP,
    },
    {
      name: "Azithromycin 500mg",
      batch: "C881",
      days: 18,
      qty: 45,
      price: 38,
      dist: krishna,
    },
    {
      name: "Ibuprofen 400mg",
      batch: "D334",
      days: 25,
      qty: 90,
      price: 6,
      dist: krishna,
    },
    {
      name: "Cetirizine 10mg",
      batch: "E119",
      days: 28,
      qty: 120,
      price: 4,
      dist: mehta,
    },
    {
      name: "Maggi Noodles 70g",
      batch: "F556",
      days: 45,
      qty: 200,
      price: 14,
      dist: mehta,
    },
    {
      name: "Amul Butter 500g",
      batch: "G773",
      days: 52,
      qty: 36,
      price: 56,
      dist: sharmaP,
    },
    {
      name: "Dettol Soap 75g",
      batch: "I221",
      days: 90,
      qty: 144,
      price: 38,
      dist: mehta,
    },
    {
      name: "ORS Sachet Lemon",
      batch: "J448",
      days: 120,
      qty: 80,
      price: 12,
      dist: krishna,
    },
  ];

  for (const item of items) {
    const product = await prisma.product.create({
      data: { shopId: shop.id, name: item.name },
    });
    await prisma.batch.create({
      data: {
        productId: product.id,
        distributorId: item.dist.id,
        batchNumber: item.batch,
        expiryDate: daysFromNow(item.days),
        quantity: item.qty,
        purchasePrice: item.price,
      },
    });
  }

  const allBatches = await prisma.batch.findMany({ take: 7 });

  const returnSeeds = [
    { b: allBatches[0], d: sharmaP, outcome: "accepted" },
    { b: allBatches[1], d: sharmaP, outcome: "accepted" },
    { b: allBatches[2], d: sharmaP, outcome: "accepted" },
    { b: allBatches[6], d: sharmaP, outcome: "accepted" },
    { b: allBatches[2], d: krishna, outcome: "accepted" },
    { b: allBatches[3], d: krishna, outcome: "rejected" },
    { b: allBatches[4], d: krishna, outcome: "rejected" },
    { b: allBatches[4], d: mehta, outcome: "accepted" },
    { b: allBatches[5], d: mehta, outcome: "accepted" },
    { b: allBatches[6], d: mehta, outcome: "rejected" },
  ];

  for (const r of returnSeeds) {
    await prisma.returnLog.create({
      data: { batchId: r.b.id, distributorId: r.d.id, outcome: r.outcome },
    });
  }

  console.log("");
  console.log("SEEDED SUCCESSFULLY!");
  console.log("Shop ID:", shop.id);
  console.log("-> Please set NEXT_PUBLIC_SHOP_ID=" + shop.id + " in .env.local");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
