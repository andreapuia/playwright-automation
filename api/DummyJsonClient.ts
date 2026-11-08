
import { APIRequestContext, APIResponse } from '@playwright/test';

const BASE_URL = 'https://dummyjson.com';

export class DummyJsonClient {
    constructor(private readonly loginRequest: APIRequestContext, private readonly authenticatedRequest: APIRequestContext) { }

    async login(username: string, password: string): Promise<APIResponse> {
        return this.loginRequest.post(
            `${BASE_URL}/auth/login`,
            {
                data: {
                    username,
                    password,
                },
            }
        );
    }

    async getCurrentUser(accessToken: string): Promise<APIResponse> {
        return this.authenticatedRequest.get(
            `${BASE_URL}/auth/me`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
    }
}

