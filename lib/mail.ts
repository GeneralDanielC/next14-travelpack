import { getUserByEmail } from "@/data/auth/user";
import { Resend } from "resend";

// Create a new instance of the Resend class using the API key from environment variables.
const resend = new Resend(process.env.RESEND_API_KEY);

// Define the domain variable using the environment variable which holds the application's URL.
const domain = process.env.NEXT_PUBLIC_APP_URL;

// Define an asynchronous function to send a two-factor authentication (2FA) code via email.
export const sendTwoFactorTokenEmail = async (
    email: string,
    token: string
) => {
    await resend.emails.send({
        from: "info@pakkit.app",
        to: email,
        subject: "2FA Code",
        html: `<p>Your 2FA code: ${token}</p>`,
    });
}

// Define an asynchronous function to send a password reset email.
export const sendPasswordResetEmail = async (
    email: string,
    token: string,
) => {
    const resetLink = `${domain}/auth/new-password?token=${token}`;

    await resend.emails.send({
        from: "info@pakkit.app", // TODO: change domain to real domain to be able to send to all addresses. See video @ 07:54:00
        to: email,
        subject: "Reset your password",
        html: `<p>Click <a href="${resetLink}">here</a> to reset password.</p>`,
    });
}

// Define an asynchronous function to send an email verification email.
export const sendVerificationEmail = async (
    email: string,
    token: string,
) => {
    const confirmLink = `${domain}/auth/new-verification?token=${token}`;

    await resend.emails.send({
        from: "info@pakkit.app", // TODO: change domain to real domain to be able to send to all addresses. See video @ 07:54:00
        to: email,
        subject: "Confirm your email",
        html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`
    });
}

export const sendSharedToNotificationEmail = async (
    email: string,
    listId: string,
) => {
    const link = `${domain}/lists/${listId}`;

    await resend.emails.send({
        from: "info@pakkit.app", // TODO: change domain to real domain to be able to send to all addresses. See video @ 07:54:00
        to: email,
        subject: `New List Shared`,
        html: `<p>${email} shared a list with you. Click <a href="${link}">here</a> see the list.</p>`
    });
}