"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { getUserById } from "@/data/auth/user";
import { createSafeAction } from "@/lib/create-safe-action";

import { InputType, ReturnType } from "./types";
import { DeleteItem } from "./schema";
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
    const { listId, itemId } = data;

    let item;

    try {
        item = await db.item.delete({
            where: {
                listId,
                id: itemId
            },
        });

        await pusher.trigger(`list-${listId}`, 'item-deleted', {
            item: item,
            action: 'update'
        });
       
    } catch (error) {
        return { error: "Failed to delete" }
    }

    revalidatePath(`/list/${listId}`);
    return { data: item };
}

export const deleteItem = createSafeAction(DeleteItem, handler);