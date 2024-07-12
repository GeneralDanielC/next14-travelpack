"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { getUserById } from "@/data/auth/user";
import { createSafeAction } from "@/lib/create-safe-action";

import { InputType, ReturnType } from "./types";
import { CreateCategory } from "./schema";
import { Types } from "@/types";
import { incrementAvailableCount, hasAvailableCount } from "@/lib/list-limit";
import { checkSubscription } from "@/lib/subscription";

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
    const { displayName, listTypeId } = data;

    let category;

    try {
        // throw new Error("a"); // artificial error - to be removed
        category = await db.category.create({
            data: {
                displayName,
                workName: removeEmojis(displayName.toLowerCase()).trim(),
                originalName: removeEmojis(displayName.toLowerCase()).trim(),
                listTypeId,
                userId: dbUser.id,
            }
        });

    } catch (error) {
        return { error: "Failed to create" }
    }

    revalidatePath(`/settings/categories`);
    return { data: category };
}

function removeEmojis(text: string) {
    return text.replace(/[\u{1F600}-\u{1F6FF}|\u{1F300}-\u{1F5FF}|\u{1F700}-\u{1F77F}|\u{1F780}-\u{1F7FF}|\u{1F800}-\u{1F8FF}|\u{1F900}-\u{1F9FF}|\u{1FA00}-\u{1FA6F}|\u{1FA70}-\u{1FAFF}|\u{2600}-\u{26FF}|\u{2700}-\u{27BF}|\u{FE0F}]/gu, '');
}

export const createCategory = createSafeAction(CreateCategory, handler);