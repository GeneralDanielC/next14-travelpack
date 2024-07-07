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
    const { listId, itemId, categoryId } = data;

    let item;

    try {
        // Delete the item
        item = await db.item.delete({
            where: {
                id: itemId
            },
        });

        // Fetch remaining items in the same category and reorder them
        const remainingItems = await db.item.findMany({
            where: {
                categoryId,
                listId
            },
            orderBy: {
                order: 'asc'
            }
        });

        // Adjust the order of the remaining items
        const updatedItems = remainingItems.map((item, index) => ({
            ...item,
            order: index
        }));

        // Update items in db
        const transaction = updatedItems.map(item => db.item.update({
            where: {
                id: item.id,
            },
            data: {
                order: item.order
            }
        }));

        await db.$transaction(transaction);

        await pusher.trigger(`list-${listId}`, 'item-deleted', {
            item: item,
            action: 'delete'
        });

    } catch (error) {
        console.error(error);
        return { error: "Failed to delete" }
    }

    revalidatePath(`/list/${listId}`);
    return { data: item };
}

export const deleteItem = createSafeAction(DeleteItem, handler);