import { test, expect } from '../../fixtures/testFixtures';
import { CHECKOUT_DATA } from '../../testData/users';

test.describe('Checkout information - invalid classes', () => {
  
  test.beforeEach(async ({ inventoryPage, cartPage }) => {
    const products = await inventoryPage.getProducts();
    await inventoryPage.addToCart(products[0].name);
    await inventoryPage.openCart();
    await cartPage.checkout();
  });

  
  const invalidData = [
    { name: 'empty first name', data: { ...CHECKOUT_DATA, firstName: '' }, error: 'First Name is required' },
    { name: 'empty last name', data: { ...CHECKOUT_DATA, lastName: '' }, error: 'Last Name is required' },
    { name: 'empty postal code', data: { ...CHECKOUT_DATA, postalCode: '' }, error: 'Postal Code is required' },
  ];

  for (const testCase of invalidData) {
    test(`checkout fails - ${testCase.name}`, async ({ page, checkoutPage }) => {
      await checkoutPage.fillInformation(testCase.data);

      await expect(checkoutPage.errorMessage).toContainText(testCase.error);
      await expect(page).toHaveURL(/checkout-step-one\.html/);
    });
  }
});