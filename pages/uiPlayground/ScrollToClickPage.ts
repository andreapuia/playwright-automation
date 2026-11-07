import { Page, Locator } from '@playwright/test';

export class ScrollToClickPage {
  readonly page: Page;
  readonly pageScrollButton: Locator;
  readonly containerScrollButton: Locator;
  readonly nestedScrollButton: Locator;
  readonly hoverRow: Locator;
  readonly hoverButton: Locator;
  readonly progressText: Locator;

  constructor(page: Page) {
    this.page = page;
    
    this.pageScrollButton = page.locator('#scrollTarget1');
    this.containerScrollButton = page.locator('#scrollTarget2');
    this.nestedScrollButton = page.locator('#scrollTarget3');
    this.hoverRow = page.locator('#targetRow4');
    this.hoverButton = page.locator('#scrollTarget4');
    this.progressText = page.locator('#progressText');
  }

  async goto() {
    await this.page.goto('http://uitestingplayground.com/scrolltoclick');
  }

  async scrollAndClick(button: Locator) {
    await button.scrollIntoViewIfNeeded();
    await button.click();
  }

  async clickHoverButton() {
    await this.hoverRow.hover();
    await this.hoverButton.click();
  }
}