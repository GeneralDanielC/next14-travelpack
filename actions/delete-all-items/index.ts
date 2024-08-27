"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { getUserById } from "@/data/auth/user";
import { createSafeAction } from "@/lib/create-safe-action";

import { InputType, ReturnType } from "./types";
import { DeleteAllItems } from "./schema";
import { redirect } from "next/navigation";
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
    const { listId } = data;

    let item;

    try {
        // Delete the item
        item = await db.item.deleteMany({
            where: {
                listId
            },
        });

        await pusher.trigger(`list-${listId}`, 'all-item-deleted', {
            item: item,
            action: 'delete'
        });

    } catch (error) {
        console.error(error);
        return { error: "Failed to delete" }
    }

    revalidatePath(`/list/${listId}`);
    return { data: "Success" };
}

export const deleteAllItems = createSafeAction(DeleteAllItems, handler);