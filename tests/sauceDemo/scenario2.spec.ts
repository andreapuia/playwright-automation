import { test, expect } from '../../fixtures/testFixtures';
import { USERS } from '../../testData/users';

const usersToTest = [
  { user: USERS.standard },
  { user: USERS.problem, knownBug: 'BUG-004: Sorting - selecting a price sort option has no effect, list stays sorted by name' },
  { user: USERS.performance, slow: true },
  { user: USERS.error, knownBug: 'BUG-005: Sorting - selecting a price sort option has no effect, list stays sorted by name' },
  { user: USERS.visual, knownBug: 'BUG-003: Price mismatch - displayed prices are wrong, so the list does not appear sorted by price' },
];

const priceSorts = [
  { option: 'lohi' as const, name: 'low to high', compare: (a: number, b: number) => a - b },
  { option: 'hilo' as const, name: 'high to low', compare: (a: number, b: number) => b - a },
];

for (const { user, knownBug, slow } of usersToTest) {
  test.describe(`user: ${user}`, () => {
    test.use({ user });

    test('sort products by price', {
      tag: knownBug ? '@known-bug' : [],
    }, async ({ inventoryPage }) => {
      test.fail(!!knownBug, knownBug);
      test.slow(!!slow, 'PERF-001: slow user');

      const initialNames = (await inventoryPage.getProducts()).map(p => p.name).sort();

      for (const sort of priceSorts) {
        await test.step(`Sort by price ${sort.name}`, async () => {
          await inventoryPage.sortBy(sort.option);

          const products = await inventoryPage.getProducts();
          const prices = products.map(p => p.price);
          console.log(`Price ${sort.name}:`, prices);

          expect(prices).toEqual([...prices].sort(sort.compare));
          expect(products.map(p => p.name).sort()).toEqual(initialNames);
        });
      }
    });
  });
}