import { test as base, expect } from '@playwright/test';
import { ScrollToClickPage } from '../pages/uiPlayground/ScrollToClickPage';
import { UploadPage } from '../pages/uiPlayground/UploadPage';
import { SelectPage } from '../pages/uiPlayground/SelectPage';
import { FramesPage } from '../pages/uiPlayground/FramesPage';

type Fixtures = {
  scrollToClickPage: ScrollToClickPage;
  uploadPage: UploadPage;
  selectPage: SelectPage;
  framesPage: FramesPage;
};


export const test = base.extend<Fixtures>({
  baseURL: 'http://uitestingplayground.com',

  scrollToClickPage: async ({ page }, use) => {
    const scrollToClickPage = new ScrollToClickPage(page);
    await scrollToClickPage.goto();
    await use(scrollToClickPage);
  },

  uploadPage: async ({ page }, use) => {
    const uploadPage = new UploadPage(page);
    await uploadPage.goto();
    await use(uploadPage);
  },

  selectPage: async ({ page }, use) => {
    const selectPage = new SelectPage(page);
    await selectPage.goto();
    await use(selectPage);
  },

  framesPage: async ({ page }, use) => {
    const framesPage = new FramesPage(page);
    await framesPage.goto();
    await use(framesPage);
  },
});

export { expect };