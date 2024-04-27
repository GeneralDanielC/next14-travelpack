"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";

import { RegisterSchema } from "@/schemas";
import { getUserByEmail } from "@/data/auth/user";
import { db } from "@/lib/db";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";
import { setupInitialData } from "@/data/initial-data/initial-data";

export const register = async (
    values: z.infer<typeof RegisterSchema>,
) => {
    const validatedFields = RegisterSchema.safeParse(values);

    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }

    const { email, password, name } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
        return { error: "Email already in use!" };
    }

    const user = await db.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        },
    });

    if (!user) return { error: "Something went wrong." }

    await setupInitialData(user.id);

    // const listTypePacking = await db.theme.findFirst({
    //     where: {
    //         isListType: true,
    //         title: "PACKING"
    //     }
    // });
    // if (!listTypePacking) return { error: "Something went wrong initalizing your profile." }
    // await db.category.createMany({
    //     data: initialCategories(user.id, listTypePacking.id),
    // });

    const verificationToken = await generateVerificationToken(email);

    await sendVerificationEmail(verificationToken.email, verificationToken.token);

    return { success: "Confirmation email sent!" };
}