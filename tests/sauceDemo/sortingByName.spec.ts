import { test, expect } from '../../fixtures/sauceDemoFixtures';

test.describe('Inventory sorting - default state and sort by name', () => {

    test('default sort is Name (A to Z)', async ({ inventoryPage }) => {
        await expect(inventoryPage.activeSortOption).toHaveText('Name (A to Z)');

        const names = (await inventoryPage.getProducts()).map(p => p.name);
        expect(names).toEqual([...names].sort((a, b) => a.localeCompare(b)));
    });

    const nameSorts = [
        { option: 'za' as const, label: 'Name (Z to A)', compare: (a: string, b: string) => b.localeCompare(a) },
        { option: 'az' as const, label: 'Name (A to Z)', compare: (a: string, b: string) => a.localeCompare(b) },
    ];

    for (const sort of nameSorts) {
        test(`sort by ${sort.label}`, async ({ inventoryPage }) => {
            
            await inventoryPage.sortBy(sort.option);

            const names = (await inventoryPage.getProducts()).map(p => p.name);
            expect(names).toEqual([...names].sort(sort.compare));
        });
    }
});