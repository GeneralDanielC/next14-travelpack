import crypto from "crypto";
import { getVerificationTokenByEmail } from "@/data/auth/verification-token";
import { v4 as uuidv4 } from "uuid";
import { db } from "@/lib/db";
import { getTwoFactorTokenByEmail } from "@/data/auth/two-factor-token";
import { getPasswordResetTokenByEmail } from "@/data/auth/password-reset-token";

// Define an asynchronous function to generate a two factor authentication token.
export const generateTwoFactorToken = async (email: string) => {
    // Creates a random six digit token.
    const token = crypto.randomInt(100_000, 1_000_000).toString();
    
    // Expiration time in 5 minutes.
    const expires = new Date(new Date().getTime() + 5 * 60 * 1000);

    // Retrieving an existing token via email.
    const existingToken = await getTwoFactorTokenByEmail(email);

    // If an existing token for the user exists, the token gets removed.
    if (existingToken) {
        await db.twoFactorToken.delete({
            where: { id: existingToken.id }
        });
    }

    // Saving a new token for the user in the db.
    const twoFactorToken = await db.twoFactorToken.create({
        data: {
            email,
            token,
            expires,
        }
    });

    // Returning the token.
    return twoFactorToken;
}

// Define an asynchronous function to generate a password reset token
export const generatePasswordResetToken = async (email: string) => {
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 3600 * 1000); // expire after 1h

    const existingToken = await getPasswordResetTokenByEmail(email);

    if (existingToken) {
        await db.passwordResetToken.delete({
            where: {
                id: existingToken.id,
            }
        });
    }

    const passwordResetToken = await db.passwordResetToken.create({
        data: {
            email,
            token,
            expires
        }
    });

    return passwordResetToken;
}

export const generateVerificationToken = async (
    email: string
) => {
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 3600 * 1000);

    const existingToken = await getVerificationTokenByEmail(email);

    if (existingToken) {
        await db.verificationToken.delete({
            where: {
                id: existingToken.id
            },
        });
    }

    const verificationToken = await db.verificationToken.create({
        data: {
            email,
            token,
            expires
        }
    });
    
    return verificationToken;
}