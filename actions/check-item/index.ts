"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { getUserById } from "@/data/auth/user";
import { createSafeAction } from "@/lib/create-safe-action";

import { InputType, ReturnType } from "./types";
import { CheckItem } from "./schema";
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
    const { itemId, listId } = data;

    let item;

    try {
        // throw new Error("a"); // artificial error - to be removed
        console.log("userid", dbUser.id);

        item = await db.item.update({
            where: {
                id: itemId,
                listId,
                list: {
                    OR: [
                        { userId: dbUser.id },
                        { shares: { some: { userId: dbUser.id } } },
                    ],
                },
            },
            data: {
                isChecked: {
                    // Use a more performant toggle mechanism if available
                    set: db.raw('NOT isChecked'),
                },
            },
        });

        await pusher.trigger(`list-${listId}`, 'item-checked', {
            item: item,
            action: 'update'
        });
    } catch (error) {
        console.error(error);

        return { error: "Failed to update item." }
    }

    revalidatePath(`/list/${listId}`);
    return { data: item };
}

export const checkItem = createSafeAction(CheckItem, handler);