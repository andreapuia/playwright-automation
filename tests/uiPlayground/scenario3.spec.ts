import { test, expect } from '../../fixtures/uiPlaygroundFixtures';

test('click all buttons after scrolling', async ({ scrollToClickPage }) => {

    const scrollCases = [
        { name: 'page scroll', button: scrollToClickPage.pageScrollButton },
        { name: 'container scroll', button: scrollToClickPage.containerScrollButton },
        { name: 'nested scroll', button: scrollToClickPage.nestedScrollButton },
    ];

    await test.step('Verify initial progress',
        async () => {
            await expect(scrollToClickPage.progressText).toHaveText('Buttons clicked: 0 / 4');
        });

    for (const [index, scrollCase] of scrollCases.entries()) {
        await test.step(`Click button - ${scrollCase.name}`,
            async () => {
                await scrollToClickPage.scrollAndClick(scrollCase.button);
                await expect(scrollCase.button).toHaveText('Clicked!');
                await expect(scrollToClickPage.progressText).toHaveText(`Buttons clicked: ${index + 1} / 4`);
            });
    }

    await test.step('Click button - hover to reveal',
        async () => {
            await scrollToClickPage.clickHoverButton();
            await expect(scrollToClickPage.hoverButton).toHaveText('Clicked!');
        });

    await test.step('Verify final message',
        async () => {
            await expect(scrollToClickPage.progressText).toHaveText('All buttons clicked!');
        });
});