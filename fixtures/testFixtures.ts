import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/sauceDemo/LoginPage';
import { InventoryPage } from '../pages/sauceDemo/InventoryPage';
import { CartPage } from '../pages/sauceDemo/CartPage';
import { CheckoutPage } from '../pages/sauceDemo/CheckoutPage';
import { USERS, PASSWORD } from '../testData/users';

type Fixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
};

type Options = {
  user: string;
};

export const test = base.extend<Fixtures & Options>({
  // implicit standard_user, se schimba cu test.use({ user: ... })
  user: [USERS.standard, { option: true }],

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  // user already logged in when the test receives this fixture
  inventoryPage: async ({ page, loginPage, user }, use) => {
    await loginPage.goto();
    await loginPage.login(user, PASSWORD);

    const inventoryPage = new InventoryPage(page);
    // timeout mai mare pentru performance_glitch_user
    await expect(inventoryPage.title).toHaveText('Products', { timeout: 10_000 });
    await use(inventoryPage);
  },

  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },

  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },
});

export { expect };