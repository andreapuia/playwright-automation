import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/sauceDemo/LoginPage';
import { InventoryPage } from '../pages/sauceDemo/InventoryPage';
import { CartPage } from '../pages/sauceDemo/CartPage';
import { CheckoutPage } from '../pages/sauceDemo/CheckoutPage';
import { USERS, PASSWORD } from '../testData/users';
import { ScrollToClickPage } from '../pages/uiPlayground/ScrollToClickPage';
import { UploadPage } from '../pages/uiPlayground/UploadPage';

type Fixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  //UI Test Playground
  scrollToClickPage: ScrollToClickPage
  uploadPage: UploadPage;
};

type Options = {
  user: string;
};

export const test = base.extend<Fixtures & Options>({
  
  user: [USERS.standard, { option: true }],

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  inventoryPage: async ({ page, loginPage, user }, use) => {
    await loginPage.goto();
    await loginPage.login(user, PASSWORD);

    const inventoryPage = new InventoryPage(page);

    await expect(inventoryPage.title).toHaveText('Products', { timeout: 10_000 });
    await use(inventoryPage);
  },

  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },

  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },

  //UI Testing Playwright
  scrollToClickPage: async ({ page }, use) => {
    const scrollToClickPage = new ScrollToClickPage(page);
    await scrollToClickPage.goto();
    await use(scrollToClickPage);
  },
  
   uploadPage: async ({ page }, use) => {
    const uploadPage = new UploadPage(page);
    await uploadPage.goto();
    await use(uploadPage);
  },

});

export { expect };