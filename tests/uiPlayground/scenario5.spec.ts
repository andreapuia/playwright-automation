import { test, expect } from '../../fixtures/uiPlaygroundFixtures';

const selections = [
  { selectId: 'selectLanguage', value: 'js' },
  { selectId: 'selectCity', value: 'nyc' },
  { selectId: 'selectProduct', value: 'v3.0-beta' },
  { selectId: 'selectColors', value: 'purple' },
  { selectId: 'selectFruits', value: 'date' }, // deselecteaza si optiunile preselectate
] as const;

test('select values from all controls', async ({ selectPage }) => {
  for (const selection of selections) {
    await test.step(`Select ${selection.value} in ${selection.selectId}`, async () => {
      await selectPage.selectByValue(selection.selectId, selection.value);
    });
  }

  await test.step('Verify the overall status', async () => {
    await expect(selectPage.overallStatus).toHaveText(
      'selectLanguage: JavaScript | selectCity: New York | selectProduct: Release 3.0 Beta | selectColors: Purple | selectFruits: Date'
    );
  });

});