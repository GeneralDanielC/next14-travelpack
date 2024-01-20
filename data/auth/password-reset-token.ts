import { db } from "@/lib/db";

// Define an asynchronous function to retrieve password reset token by token from the database.
export const getPasswordResetTokenByToken = async (token: string) => {
    try {
        const passwordResetToken = await db.passwordResetToken.findUnique({
            where: { token }
        });

        return passwordResetToken;
    } catch {
        return null;
    }
};

// Define an asynchronous function to retrieve password reset token by email from the database.
export const getPasswordResetTokenByEmail = async (email: string) => {
    try {
        const passwordResetToken = await db.passwordResetToken.findFirst({
            where: { email }
        });

        return passwordResetToken;
    } catch {
        return null;
    }
};