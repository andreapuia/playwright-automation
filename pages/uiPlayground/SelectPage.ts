import { Page, Locator } from '@playwright/test';

export type SelectId = 'selectLanguage' | 'selectCity' | 'selectProduct' | 'selectColors' | 'selectFruits';

export class SelectPage {
    readonly page: Page;
    readonly overallStatus: Locator;

    constructor(page: Page) {
        this.page = page;
        this.overallStatus = page.locator('#opstatus');
    }

    async goto() {
        await this.page.goto('/select');
    }

    async selectByValue(selectId: SelectId, value: string | string[]) {
        await this.page.locator(`#${selectId}`).selectOption(value);
    }

    async selectByLabel(selectId: SelectId, label: string) {
        await this.page.locator(`#${selectId}`).selectOption({ label });
    }

    getStatus(selectId: SelectId): Locator {
        return this.page.locator(`#${selectId.replace('select', 'status')}`);
    }

    async addToSelection(selectId: SelectId, value: string) {
        const current = await this.getSelectedValues(selectId);
        await this.selectByValue(selectId, [...current, value]);
    }

    async removeFromSelection(selectId: SelectId, value: string) {
        const current = await this.getSelectedValues(selectId);
        await this.selectByValue(selectId, current.filter(v => v !== value));
    }

    async selectByRegex(selectId: SelectId, pattern: RegExp) {
        const select = this.page.locator(`#${selectId}`);
        const labels = await select.locator('option').allTextContents();
        const label = labels.find(text => pattern.test(text));

        if (!label) {
            throw new Error(`No option matches ${pattern} in ${selectId}`);
        }

        await select.selectOption({ label });
    }

    private async getSelectedValues(selectId: SelectId): Promise<string[]> {
        return this.page.locator(`#${selectId}`).evaluate((select: HTMLSelectElement) =>
            Array.from(select.selectedOptions).map(option => option.value)
        );
    }

}

