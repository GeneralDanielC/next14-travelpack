"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { getUserById } from "@/data/auth/user";
import { createSafeAction } from "@/lib/create-safe-action";

import { InputType, ReturnType } from "./types";
import { UpdateCategory } from "./schema";
import OpenAI from "openai";
import { removeEmojis } from "@/lib/string";

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
    const { categoryId, displayName, workName } = data;

    if (!categoryId) {
        return { error: "No category found." };
    }

    const existingCategory = await db.category.findUnique({
        where: {
            id: categoryId
        }, select: {
            removable: true,
        }
    });

    if (!existingCategory) return { error: "Failed to update category." }

    let category;

    if (existingCategory.removable) {
        try {
            // throw new Error("a"); // artificial error - to be removed
            category = await db.category.update({
                where: {
                    userId: user.id,
                    id: categoryId,
                },
                data: {
                    displayName,
                    workName: removeEmojis(displayName.toLowerCase()).trim()
                }
            });
        } catch (error) {
            return { error: "Failed to update category." }
        }
    } else {
        const prompt = `Are the following phrases essentially the same in meaning? Space and emojis should be allowed either, and thus should not be included in the evaluation between the two phrases. \n\nPhrase 1: "${displayName}" \nPhrase 2: "${workName}"\n\nAnswer with true or false.`;

        let isSimilar;

        try {
            const response = await openai.completions.create({
                model: "gpt-3.5-turbo-instruct",
                prompt: prompt,
                temperature: 0,
                max_tokens: 10,
                top_p: 1,
                frequency_penalty: 0,
                presence_penalty: 0,
                stop: ["\\n"],
            });

            // Assuming a simple true or false response from GPT
            isSimilar = response.choices[0].text.trim().toLowerCase() === 'true';

        } catch (error) {
            console.error("Error comparing category names:", error);
            return { error: "Failed to compare category names." };
        }

        if (!isSimilar) {
            return { error: "New name is too unsimilar to the original one." }
        }

        try {
            // throw new Error("a"); // artificial error - to be removed
            category = await db.category.update({
                where: {
                    userId: user.id,
                    id: categoryId,
                },
                data: {
                    displayName,
                }
            });
        } catch (error) {
            return { error: "Failed to update category." }
        }
    }

    revalidatePath(`/settings/categories`);
    return { data: category };
}

export const updateCategory = createSafeAction(UpdateCategory, handler);