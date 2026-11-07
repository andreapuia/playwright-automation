import { Page, Locator, FrameLocator } from '@playwright/test';

export type UploadFile = { name: string; mimeType: string; buffer: Buffer };

export class UploadPage {
  readonly page: Page;
  readonly uploadFrame: FrameLocator;
  readonly fileInput: Locator;
  readonly successMessage: Locator;
  readonly fileItems: Locator;
  readonly fileNames: Locator;

  constructor(page: Page) {
    this.page = page;
  
    this.uploadFrame = page.frameLocator('iframe[src="/static/upload.html"]');
    this.fileInput = this.uploadFrame.locator('#browse');
    this.successMessage = this.uploadFrame.locator('.success-file');
    this.fileItems = this.uploadFrame.locator('.file-item');
    this.fileNames = this.uploadFrame.locator('.file-info p');
  }

  async goto() {
    await this.page.goto('http://uitestingplayground.com/upload');
  }

  async uploadFiles(files: UploadFile[]) {
    await this.fileInput.setInputFiles(files);
  }

   async removeFile(index: number) {
    await this.fileItems.nth(index).locator('.file-actions svg').click();
  }
}