import { Page, Locator } from '@playwright/test';
import { parsePrice } from '../../utils/productUtils';

export class CheckoutPage {
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly itemTotalLabel: Locator;
  readonly finishButton: Locator;
  readonly completeHeader: Locator;
  readonly backHomeButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.itemTotalLabel = page.locator('[data-test="subtotal-label"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.completeHeader = page.locator('[data-test="complete-header"]');
    this.backHomeButton = page.locator('[data-test="back-to-products"]');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async fillInformation(info: { firstName: string; lastName: string; postalCode: string }) {
    await this.continueButton.waitFor();

    await this.firstNameInput.fill(info.firstName);
    await this.lastNameInput.fill(info.lastName);
    await this.postalCodeInput.fill(info.postalCode);
    await this.continueButton.click();
  }

  async getItemTotal(): Promise<number> {
    return parsePrice(await this.itemTotalLabel.innerText());
  }

  async finishOrder() {
    await this.finishButton.click();
  }

  async backHome() {
    await this.backHomeButton.click();
  }
}