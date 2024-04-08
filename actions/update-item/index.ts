"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { getUserById } from "@/data/auth/user";
import { createSafeAction } from "@/lib/create-safe-action";

import { InputType, ReturnType } from "./types";
import { UpdateItem } from "./schema";

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
    const { title, categoryId, quantity, listId, itemId } = data;

    if (!listId) {
        return { error: "No list found." };
    }

    if (!itemId) {
        return { error: "No item found." };
    }

    let item;

    try {
        // throw new Error("a"); // artificial error - to be removed
        item = await db.item.update({
            where: {
                listId,
                id: itemId,
            },
            data: {
                title,
                categoryId,
                quantity,
            }
        });
    } catch (error) {
        return { error: "Failed to update" }
    }

    revalidatePath(`/list/${listId}`);
    return { data: item };
}

export const updateItem = createSafeAction(UpdateItem, handler);