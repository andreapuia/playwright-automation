import { test, expect } from '../../fixtures/uiPlaygroundFixtures';
import { FRAME_BUTTONS, FrameLevel } from '../../pages/uiPlayground/FramesPage';

const frameLevels: { level: FrameLevel; name: string }[] = [
    { level: 'outer', name: 'outer frame (level 1)' },
    { level: 'inner', name: 'inner frame (level 2)' },
];

test('click the buttons in each frame',
    async ({ framesPage }) => {
        for (const { level, name } of frameLevels) {
            for (const button of FRAME_BUTTONS) {
                await test.step(`${name} - click ${button}`, async () => {
                    await framesPage.clickButton(level, button);
                    await expect(framesPage.getResult(level)).toHaveText(`Button pressed: ${button}`);
                });
            }
        }
    });