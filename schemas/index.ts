import { UserRole } from "@prisma/client";
import * as z from "zod";

// Define a schema for user settings with optional and required fields.

// This is used for field validation from user input on various forms, like settings update, password reset, login, and registration. Using zod, these validations ensure that the input received follows the expected format before any further processing
export const SettingsSchema = z.object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum([UserRole.ADMIN, UserRole.USER]),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
})
    // A refine method to add additional validation: if a password is provided, a new password must also be provided.
    .refine((data) => {
        if (data.password && !data.newPassword) {
            return false;
        }

        return true;
    }, {
        message: "New password is required", // Custom error message for the validation.
        path: ["newPassword"], // The path in the data object that the message applies to.
    })
    // Another refine method for the opposite case: if a new password is provided, the old password must also be provided.
    .refine((data) => {
        if (data.newPassword && !data.password) {
            return false;
        }
        return true;
    }, {
        message: "Password is required",
        path: ["password"]
    });

// Define a schema for updating a user's password.
export const NewPasswordSchema = z.object({
    password: z.string().min(6, {
        message: "Minimum of 6 characters is required"
    }),
});

// Define a schema for resetting a user's password.
export const ResetSchema = z.object({
    email: z.string().email({
        message: "Email is required"
    }),
});

// Define a schema for logging in a user.
export const LoginSchema = z.object({
    email: z.string().email({
        message: "Email is required"
    }),
    password: z.string().min(1, {
        message: "Password is required"
    }),
    code: z.optional(z.string()),
});

// Define a schema for registering a new user.
export const RegisterSchema = z.object({
    email: z.string().email({
        message: "Email is required"
    }),
    password: z.string().min(6, {
        message: "Minimum 6 characters required"
    }),
    name: z.string().min(1, {
        message: "Name is required"
    })
});

export const ListSchema = z.object({
    title: z.string().min(1, {
        message: "Minimum 1 character required"
    }),
    departAt: z.optional(z.date()),
    themeId: z.string(),
});

export const ThemeSchema = z.object({
    title: z.string().min(1, {
        message: "Minimum 1 character required"
    }),
    emoji: z.string().min(1).max(1),
    emojiBackground: z.string(), // Tailwind classname
});

export const ItemSchema = z.object({
    title: z.string().min(1, {
        message: "Minimum 1 character required"
    }),
    quantity: z.optional(z.number().min(1, {
        message: "Minimum quantity of 1"
    }).max(99, {
        message: "Maximum quantity of 99"
    })),
    category: z.string(),
});

export const CategorySchema = z.object({
    name: z.string().min(1, {
        message: "Minimum 1 character required"
    }),
});
