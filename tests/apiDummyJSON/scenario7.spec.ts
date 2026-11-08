
import { test, expect } from '../../fixtures/apiDemoFixtures';
import { API_USER } from '../../testData/apiUsers';
import { decodeJwt, modifyJwtPayload } from '../../utils/jwtUtils';

test('auth via API and validate current user',
    async ({ dummyJsonClient }) => {

        const loginBody = await test.step('Log in with POST /auth/login',
            async () => {
                const response = await dummyJsonClient.login(
                    API_USER.username,
                    API_USER.password
                );

                expect(response.status()).toBe(200);

                return await response.json();
            }
        );

        const accessToken: string = await test.step('Extract the JWT from accessToken',
            async () => {
                const token = loginBody.accessToken;

                expect(typeof token).toBe('string');
                expect(token.length).toBeGreaterThan(0);

                const maskedToken = `${token.slice(0, 12)}...${token.slice(-6)}`;

                console.log('JWT successfully extracted:', maskedToken);

                return token;
            }
        );

        await test.step('Decode and inspect the JWT',
            async () => {
                const { header, payload } = decodeJwt(accessToken);

                expect(header.alg).toEqual(expect.any(String));
                expect(payload.username).toBe(API_USER.username);

                expect(typeof payload.exp).toBe('number');
                expect(payload.exp).toBeGreaterThan(
                    Math.floor(Date.now() / 1000)
                );

                console.log('JWT format: valid');
                console.log('JWT payload username:', payload.username);
                console.log('JWT expiration: valid');
            });

        await test.step('Get the current user with GET /auth/me',
            async () => {
                const response = await dummyJsonClient.getCurrentUser(
                    accessToken
                );

                expect(response.status()).toBe(200);

                const user = await response.json();

                expect(user.username).toBe(API_USER.username);
                expect(user.id).toBe(loginBody.id);
                expect(user.email).toBe(loginBody.email);
            }
        );
    }
);

test('GET /auth/me with an invalid token returns 401',
    async ({ dummyJsonClient }) => {
        const response = await dummyJsonClient.getCurrentUser('invalid-token');

        expect(response.status()).toBe(401);
    }
);

test('modified JWT is rejected', { tag: ['@api', '@known-bug'] }, 
    async ({ dummyJsonClient }) => {
    const loginResponse = await dummyJsonClient.login(API_USER.username, API_USER.password);
    expect(loginResponse.status()).toBe(200);

    const { accessToken } = await loginResponse.json();

    const modifiedToken = modifyJwtPayload(accessToken, { id: 2, username: 'michaelw' });
    expect(decodeJwt(modifiedToken).payload.username).toBe('michaelw');

    const response = await dummyJsonClient.getCurrentUser(modifiedToken);
    const body = await response.json();
    console.log('Response for modified JWT:', response.status(), body);

    
    expect(response.status()).not.toBe(200);
    expect(body.username).toBeUndefined();

    // BUG-010: Modified JWT returns 500 instead of 401 on GET /auth/me
    expect(response.status()).toBe(401);
});
