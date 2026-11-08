import { test, expect } from '../../fixtures/uiPlaygroundFixtures';
import { createFile, MAX_FILE_SIZE } from '../../testData/uploadFiles';

test.describe('Upload - file types ', () => {

    const supportedFiles = [
        createFile('document.pdf', 'application/pdf'),
        createFile('document.docx', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'),
        createFile('slides.pptx', 'application/vnd.openxmlformats-officedocument.presentationml.presentation'),
        createFile('notes.txt', 'text/plain'),
        createFile('sheet.xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'),
    ];

    for (const file of supportedFiles) {
        test(`supported type is accepted - ${file.name}`, async ({ uploadPage }) => {
            await uploadPage.uploadFiles([file]);

            await expect(uploadPage.fileNames).toHaveText([file.name]);
            await expect(uploadPage.successMessage).toHaveText('1 file(s) selected');
        });
    }

    const unsupportedFiles = [
        createFile('program.exe', 'application/octet-stream'),
        createFile('image.png', 'image/png'),
    ];

    for (const file of unsupportedFiles) {
        test(`unsupported type is rejected - ${file.name}`, {
            tag: '@known-bug',
        }, async ({ uploadPage }) => {
            //test.fail(true, 'BUG-008: Upload - unsupported file types are accepted');

            await uploadPage.uploadFiles([file]);

            await expect(uploadPage.fileItems).toHaveCount(0);
            await expect(uploadPage.successMessage).toBeHidden();
        });
    }
});

test.describe('Upload - file size ', () => {

    test('file of exactly 15MB is accepted', async ({ uploadPage }) => {
        await uploadPage.uploadFiles([createFile('max-size.txt', 'text/plain', MAX_FILE_SIZE)]);

        await expect(uploadPage.successMessage).toHaveText('1 file(s) selected');
    });

    test('file over 15MB is rejected', {
        tag: '@known-bug',
    }, async ({ uploadPage }) => {
        //test.fail(true, 'BUG-009: Upload - files over the 15MB limit are accepted');

        await uploadPage.uploadFiles([createFile('too-large.txt', 'text/plain', MAX_FILE_SIZE + 1)]);

        await expect(uploadPage.fileItems).toHaveCount(0);
        await expect(uploadPage.successMessage).toBeHidden();
    });
});

test.describe('Upload - file list', () => {

    test('removing files updates the list and the message', async ({ uploadPage }) => {
        await uploadPage.uploadFiles([
            createFile('first.txt', 'text/plain'),
            createFile('second.txt', 'text/plain'),
        ]);
        await expect(uploadPage.successMessage).toHaveText('2 file(s) selected');

        await test.step('Remove the first file', async () => {
            await uploadPage.removeFile(0);
            await expect(uploadPage.fileNames).toHaveText(['second.txt']);
            await expect(uploadPage.successMessage).toHaveText('1 file(s) selected');
        });

        await test.step('Remove the last file', async () => {
            await uploadPage.removeFile(0);
            await expect(uploadPage.fileItems).toHaveCount(0);
            await expect(uploadPage.successMessage).toBeHidden();
        });
    });

    test('a second upload adds files to the list', async ({ uploadPage }) => {
        await uploadPage.uploadFiles([createFile('first.txt', 'text/plain')]);
        await uploadPage.uploadFiles([createFile('second.txt', 'text/plain')]);

        await expect(uploadPage.fileNames).toHaveText(['first.txt', 'second.txt']);
        await expect(uploadPage.successMessage).toHaveText('2 file(s) selected');
    });
});