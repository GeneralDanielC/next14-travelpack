"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { createSafeAction } from "@/lib/create-safe-action";

import { InputType, ReturnType } from "./types";
import { UpdateItemOrder } from "./schema";
import pusher from "@/lib/pusher";

const handler = async (data: InputType): Promise<ReturnType> => {
    const user = await currentUser();

    if (!user) {
        return { error: "Unauthorized" }
    }

    const { items, listId } = data;
    let updatedItems;

    try {
        const transaction = items.map((item) => db.item.update({
            where: {
                id: item.id,
                listId,
            },
            data: {
                order: item.order,
                categoryId: item.categoryId
            }
        }));

        updatedItems = await db.$transaction(transaction);

        await pusher.trigger(`list-${listId}`, 'items-reordered', {
            items: updatedItems,
            action: 'reorder'
        });
    } catch (error) {
        return { error: "Failed to reorder" }
    }

    revalidatePath(`/list/${listId}`);
    return { data: updatedItems };
}

export const updateItemOrder = createSafeAction(UpdateItemOrder, handler);