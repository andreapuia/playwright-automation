import { Page, Locator } from '@playwright/test';
import { Product } from '../../models/Product';
import { extractProducts } from '../../utils/productUtils';

export class CartPage {
  readonly items: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.items = page.locator('[data-test="inventory-item"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  async getProducts(): Promise<Product[]> {
    await this.checkoutButton.waitFor();
    return extractProducts(this.items);
  }

  async checkout() {
    await this.checkoutButton.click();
  }
}