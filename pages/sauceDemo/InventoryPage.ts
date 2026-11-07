import { Page, Locator } from '@playwright/test';
import { Product } from '../../models/Product';
import { extractProducts } from '../../utils/productUtils';

export class InventoryPage {
  readonly page: Page;
  readonly title: Locator;
  readonly items: Locator;
  readonly addCart: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('[data-test="title"]');
    this.items = page.locator('[data-test="inventory-item"]');
    this.addCart = page.locator('[data-test="shopping-cart-link"]');
  }

  async getProducts(): Promise<Product[]> {
    return extractProducts(this.items);
  }

  async addToCart(productName: string) {

    const item = this.items.filter({
      has: this.page.getByText(productName, { exact: true }),
    });

    await item.getByRole('button', { name: 'Add to cart' }).click();
  }

  async openCart() {
    await this.addCart.click();
  }
}