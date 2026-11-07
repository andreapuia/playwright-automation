import { test, expect } from '../../fixtures/testFixtures';
import { USERS, PASSWORD } from '../../testData/users';

test.describe('Cart - state and boundaries', () => {

    test('checkout is not possible with an empty cart', {
        tag: '@known-bug',
    }, async ({ page, inventoryPage, cartPage }) => {
        test.fail(true, 'BUG-006: Checkout - an order can be started with an empty cart');

        await test.step('Open the empty cart', async () => {
            await inventoryPage.openCart();
            await expect(cartPage.checkoutButton).toBeVisible();

            await expect(cartPage.items).toHaveCount(0);
        });

        await test.step('Try to go to checkout', async () => {
            await cartPage.checkout();

            await expect(page).not.toHaveURL(/checkout-step-one\.html/);
        });
    });

    test('cart is not shared between users after logout', {
        tag: '@known-bug',
    }, async ({ inventoryPage, loginPage }) => {
        test.fail(true, 'BUG-007: Cart - products added by one user are visible to the next user after logout');

        await test.step('Add a product as standard_user', async () => {
            const products = await inventoryPage.getProducts();
            await inventoryPage.addToCart(products[0].name);
            await expect(inventoryPage.cartBadge).toHaveText('1');
        });

        await test.step('Log out and log in as another user', async () => {
            await inventoryPage.logout();
            await loginPage.login(USERS.problem, PASSWORD);
            await expect(inventoryPage.title).toHaveText('Products');
        });

        await test.step('The new user starts with an empty cart', async () => {
            await expect(inventoryPage.cartBadge).toHaveCount(0);
        });
    });
});