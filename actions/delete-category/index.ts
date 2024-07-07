"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { getUserById } from "@/data/auth/user";
import { createSafeAction } from "@/lib/create-safe-action";

import { InputType, ReturnType } from "./types";
import { DeleteCategory } from "./schema";
import pusher from "@/lib/pusher";

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
    const { categoryId, removable } = data;

    if (!removable) return { error: "Category cannot be deleted" }

    let category;

    try {
        category = await db.category.delete({
            where: {
                id: categoryId
            },
        });

    } catch (error) {
        return { error: "Failed to delete. Try remove all list items in this category." }
    }

    revalidatePath(`/settings/categories`);
    return { data: category };
}

export const deleteCategory = createSafeAction(DeleteCategory, handler);