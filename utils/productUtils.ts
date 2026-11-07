import { type Product } from '../models/Product';
import { type Locator } from '@playwright/test';

export function parsePrice(text: string): number {
  const match = text.match(/\$\s*(\d+(?:\.\d{1,2})?)/);

  if (!match) {
    throw new Error(`Invalid format: ${text}`);
  }

  return Number(match[1]);
}

export async function extractProducts(items: Locator): Promise<Product[]> {
  await items.first().waitFor({ state: 'visible' });

  const products: Product[] = [];

  for (const item of await items.all()) {
    const name = await item.locator('.inventory_item_name').innerText();
    const priceText = await item.locator('.inventory_item_price').innerText();

    products.push({
      name,
      price: parsePrice(priceText),
    });
  }

  return products;
}
