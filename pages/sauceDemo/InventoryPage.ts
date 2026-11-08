import { Page, Locator, expect } from '@playwright/test';
import { Product } from '../../models/Product';
import { extractProducts } from '../../utils/productUtils';

export type SortOption = 'az' | 'za' | 'lohi' | 'hilo';

const SORT_LABELS: Record<SortOption, string> = {
  az: 'Name (A to Z)',
  za: 'Name (Z to A)',
  lohi: 'Price (low to high)',
  hilo: 'Price (high to low)',
};

export class InventoryPage {
  readonly page: Page;
  readonly title: Locator;
  readonly items: Locator;
  readonly addCart: Locator;
  readonly sortDropdown: Locator;
  readonly activeSortOption: Locator;
  readonly cartBadge: Locator;
  readonly menuButton: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('[data-test="title"]');
    this.items = page.locator('[data-test="inventory-item"]');
    this.addCart = page.locator('[data-test="shopping-cart-link"]');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.activeSortOption = page.locator('[data-test="active-option"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.menuButton = page.getByRole('button', { name: 'Open Menu' });
    this.logoutLink = page.locator('[data-test="logout-sidebar-link"]');
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

  async sortBy(option: SortOption) {
    await this.sortDropdown.selectOption(option);
    await expect(this.activeSortOption).toHaveText(SORT_LABELS[option]);
  }

  async logout() {
    await this.menuButton.click();
    await this.logoutLink.click();
  }

}