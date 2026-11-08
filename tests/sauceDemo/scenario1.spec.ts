import { test, expect } from '../../fixtures/sauceDemoFixtures';
import { USERS, CHECKOUT_DATA } from '../../testData/users';

const usersToTest = [
  { user: USERS.standard },
  { user: USERS.problem, knownBug: 'BUG-001: Cart - only 1 of 3 products is added, Add to cart button does nothing for the others' },
  { user: USERS.performance, slow: true },
  { user: USERS.error, knownBug: 'BUG-002: Cart - only 1 of 3 products is added, Add to cart fails silently for the others' },
  { user: USERS.visual, knownBug: 'BUG-003: Price mismatch - inventory shows a different price than the cart for the same product' },
];

for (const { user, knownBug, slow } of usersToTest) {
  test.describe(`user: ${user}`, () => {
    test.use({ user });

    test('place an order with 3 most expensive products', {
      tag: knownBug ? '@known-bug' : [],
    }, async ({
      page,
      inventoryPage,
      cartPage,
      checkoutPage,
    }) => {
      //test.fail(!!knownBug, knownBug);
      test.slow(!!slow, 'PERF-001: slow user');

      const allProducts = await test.step('Extract all available products',
        async () => {
          const products = await inventoryPage.getProducts();
          console.log('All products:');
          console.table(products);
          expect(products.length).toBeGreaterThanOrEqual(3);
          return products;
        });

      const topProducts = await test.step('Find the 3 most expensive products',
        async () => {
          const top = [...allProducts].sort((a, b) => b.price - a.price).slice(0, 3);
          console.log('Top 3 most expensive:');
          console.table(top);
          return top;
        });

      await test.step('Add the products to the cart',
        async () => {
          for (const product of topProducts) {
            await inventoryPage.addToCart(product.name);
          }

          await expect(inventoryPage.cartBadge).toHaveText(String(topProducts.length));
        });

      await test.step('Verify products and prices in the cart',
        async () => {
          await inventoryPage.openCart();
          const cartProducts = await cartPage.getProducts();

          expect(cartProducts).toHaveLength(topProducts.length);

          for (const expectedProduct of topProducts) {
            const cartProduct = cartProducts.find(
              product => product.name === expectedProduct.name
            );

            expect(cartProduct, `Not found: ${expectedProduct.name}`).toBeDefined();
            expect(cartProduct!.price).toBe(expectedProduct.price);
          }
        });

      await test.step('Validate Item total on checkout',
        async () => {
          await cartPage.checkout();
          await checkoutPage.fillInformation(CHECKOUT_DATA);

          const expectedTotalInCents = topProducts.reduce(
            (sum, product) => sum + Math.round(product.price * 100),
            0
          );
          const actualTotalInCents = Math.round((await checkoutPage.getItemTotal()) * 100);

          expect(actualTotalInCents).toBe(expectedTotalInCents);
        });

      await test.step('Place the order',
        async () => {
          await checkoutPage.finishOrder();
          await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');
        });

      await test.step('Go back to the inventory page',
        async () => {
          await checkoutPage.backHome();
          await expect(page).toHaveURL(/inventory\.html/);
          await expect(inventoryPage.title).toHaveText('Products', { timeout: 10_000 });
        });
    });
  });
}