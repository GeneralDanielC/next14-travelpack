import { db } from "@/lib/db";

// Define an asynchronous function to retrieve two factor token by token.
export const getTwoFactorTokenByToken = async (token: string) => {
    try {
        const twoFactorToken = await db.twoFactorToken.findUnique({
            where: { token }
        });

        return twoFactorToken;
    } catch {
        return null;
    }
}

// Define an asynchronous function to retrieve two factor token by email.
export const getTwoFactorTokenByEmail = async (email: string) => {
    try {
        const twoFactorToken = await db.twoFactorToken.findFirst({
            where: { email }
        });

        return twoFactorToken;
    } catch {
        return null;
    }
}