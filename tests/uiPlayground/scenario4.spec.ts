import { test, expect } from '../../fixtures/uiPlaygroundFixtures';
import { UPLOAD_FILES } from '../../testData/uploadFiles';

test('upload two files', async ({ uploadPage }) => {

  await test.step('Upload two files',
    async () => {
      await uploadPage.uploadFiles(UPLOAD_FILES);
    });

  await test.step('Verify the success message',
    async () => {
      await expect(uploadPage.successMessage).toHaveText(`${UPLOAD_FILES.length} file(s) selected`);
    });
});