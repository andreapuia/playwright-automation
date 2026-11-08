import { test, expect } from '../../fixtures/uiPlaygroundFixtures';

test.describe('Frames - state and isolation', () => {

    test('result is empty in both frames before any click',
        async ({ framesPage }) => {
            await expect(framesPage.getResult('outer')).toBeEmpty();
            await expect(framesPage.getResult('inner')).toBeEmpty();
        });

    test('click in one frame does not change the other frame',
        async ({ framesPage }) => {
            await test.step('Click in the inner frame', async () => {
                await framesPage.clickButton('inner', 'Edit');
                await expect(framesPage.getResult('inner')).toHaveText('Button pressed: Edit');
                await expect(framesPage.getResult('outer')).toBeEmpty();
            });

            await test.step('Click in the outer frame',
                async () => {
                    await framesPage.clickButton('outer', 'Submit');
                    await expect(framesPage.getResult('outer')).toHaveText('Button pressed: Submit');
                    await expect(framesPage.getResult('inner')).toHaveText('Button pressed: Edit');
                });
        });
});