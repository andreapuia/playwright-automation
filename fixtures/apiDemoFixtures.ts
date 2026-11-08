import { test as base, expect } from '@playwright/test';
import { DummyJsonClient } from '../api/DummyJsonClient';

type ApiFixtures = {
    dummyJsonClient: DummyJsonClient;
};

export const test = base.extend<ApiFixtures>({
    dummyJsonClient: async ({ request, playwright }, use) => {
        const cleanRequest = await playwright.request.newContext();

        const client = new DummyJsonClient(
            request,
            cleanRequest
        );

        try {
            await use(client);
        } finally {
            await cleanRequest.dispose();
        }
    },
});

export { expect };
