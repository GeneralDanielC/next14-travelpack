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
    id: z.string(),
    title: z.string(),
    departAt: z.date().optional(),
    typeId: z.string(),
    themeId: z.string().optional(),
    userId: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
});


export const ThemeSchema = z.object({
    id: z.string(),
    title: z.string(),
    emoji: z.string(),
    emojiBackground: z.string(),
    description: z.string().optional(),
    isListType: z.boolean().default(false),
});

export const ItemSchema = z.object({
    id: z.string(),
    title: z.string(),
    quantity: z.number().optional(),
    isChecked: z.boolean().default(false),
    createdAt: z.date(),
    listId: z.string(),
    categoryId: z.string(),
});


export const CategorySchema = z.object({
    id: z.string(),
    displayName: z.string(),
    workName: z.string(),
    userId: z.string(),
});
