export type JwtPayload = {
    id?: number;
    username?: string;
    email?: string;
    iat?: number;
    exp?: number;
    [key: string]: unknown;
};

export function decodeJwt(token: string) {
    const parts = token.split('.');

    if (parts.length !== 3) {
        throw new Error(
            `Invalid JWT: expected 3 parts, got ${parts.length}`
        );
    }

    const decodePart = (part: string) => {
        const decoded = Buffer
            .from(part, 'base64url')
            .toString('utf8');

        return JSON.parse(decoded);
    };

    return {
        header: decodePart(parts[0]) as Record<string, unknown>,
        payload: decodePart(parts[1]) as JwtPayload,
    };
}

export function modifyJwtPayload(token: string, changes: Partial<JwtPayload>): string {
    const [header, , signature] = token.split('.');
    const { payload } = decodeJwt(token);

    const newPayload = Buffer
        .from(JSON.stringify({ ...payload, ...changes }))
        .toString('base64url');

    return `${header}.${newPayload}.${signature}`;
}
