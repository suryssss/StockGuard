export async function lookupBarcode(code: string): Promise<string | null> {
  try {
    const res = await fetch(
      `https://world.openfoodfacts.org/api/v0/product/${code}.json`,
    );
    const data = await res.json();
    if (data.status !== 1) return null;
    return data.product?.product_name_en || data.product?.product_name || null;
  } catch {
    return null;
  }
}
