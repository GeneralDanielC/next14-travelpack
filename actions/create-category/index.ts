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
                workName: displayName.toLowerCase().replace(/[^a-zA-Z0-9\s]/g, '').trim(),
                originalName: displayName.toLowerCase().replace(/[^a-zA-Z0-9\s]/g, '').trim(),
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

export const createCategory = createSafeAction(CreateCategory, handler);