import { Page, Locator, FrameLocator } from '@playwright/test';

export type FrameLevel = 'outer' | 'inner';
export type FrameButton = 'Edit' | 'Submit' | 'Click me' | 'Primary';

export const FRAME_BUTTONS: FrameButton[] = ['Edit', 'Submit', 'Click me', 'Primary'];

export class FramesPage {
    readonly page: Page;
    readonly outerFrame: FrameLocator;
    readonly innerFrame: FrameLocator;

    constructor(page: Page) {
        this.page = page;
        this.outerFrame = page.frameLocator('#frame-outer');
        this.innerFrame = this.outerFrame.frameLocator('#frame-inner');
    }

    async goto() {
        await this.page.goto('/frames');
    }

    async clickButton(level: FrameLevel, button: FrameButton) {
        await this.getButton(level, button).click();
    }

    getResult(level: FrameLevel): Locator {
        return this.getFrame(level).locator('#result');
    }

    private getFrame(level: FrameLevel): FrameLocator {
        return level === 'outer' ? this.outerFrame : this.innerFrame;
    }

    private getButton(level: FrameLevel, button: FrameButton): Locator {
        const frame = this.getFrame(level);

        switch (button) {
            case 'Edit':
                return frame.locator('[data-action="edit"]');
            case 'Submit':
                return frame.getByText('Submit', { exact: true });
            case 'Click me':
                return frame.locator('[name="my-button"]');
            case 'Primary':
                return frame.locator('xpath=//button[@class="btn-class"]');
        }
    }
}