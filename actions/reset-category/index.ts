"use server";

import { revalidatePath } from "next/cache";
import lodash from "lodash";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { getUserById } from "@/data/auth/user";
import { createSafeAction } from "@/lib/create-safe-action";

import { InputType, ReturnType } from "./types";
import { ResetCategory } from "./schema";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const handler = async (data: InputType): Promise<ReturnType> => {
    const user = await currentUser();

    if (!user) {
        return { error: "Unauthorized" }
    }

    const dbUser = await getUserById(user.id);

    if (!dbUser) {
        return { error: "Unauthorized" }
    }

    // No need to validate this input data since it is already done in the create-safe-action.
    const { categoryId } = data;

    if (!categoryId) {
        return { error: "No category found." };
    }

    const oldCategory = await db.category.findFirst({
        where: {
            userId: user.id,
            id: categoryId,
        }
    });

    if (!oldCategory) {
        return { error: "No category found." };
    }

    let category;

    try {
        // throw new Error("a"); // artificial error - to be removed
        category = await db.category.update({
            where: {
                userId: user.id,
                id: categoryId,
            },
            data: {
                displayName: lodash.startCase(oldCategory.workName),
            }
        });
    } catch (error) {
        return { error: "Failed to reset category." }
    }

    revalidatePath(`/categories`);
    return { data: category };
}

export const resetCategory = createSafeAction(ResetCategory, handler);