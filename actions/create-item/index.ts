"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { getUserById } from "@/data/auth/user";
import { createSafeAction } from "@/lib/create-safe-action";

import { InputType, ReturnType } from "./types";
import { CreateItem } from "./schema";

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
    const { title, categoryId, quantity, listId } = data;

    let item;

    try {
        // throw new Error("a"); // artificial error - to be removed
        item = await db.item.create({
            data: {
                title,
                categoryId,
                quantity,
                listId,
            }
        });
    } catch (error) {
        return { error: "Failed to create" }
    }

    revalidatePath(`/list/${listId}`);
    return { data: item };
}

export const createItem = createSafeAction(CreateItem, handler);