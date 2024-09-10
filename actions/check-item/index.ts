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

    // No need to validate this input data since it is already done in the create-safe-action.
    const { itemId, listId, isChecked } = data;

    let item;

    try {
        // throw new Error("a"); // artificial error - to be removed
        console.log("userid", user.id);

        item = await db.item.update({
            where: {
                id: itemId,
                listId,
                // list: {
                //     OR: [
                //         { userId: user.id },
                //         { shares: { some: { userId: user.id } } },
                //     ],
                // },
            },
            data: {
                isChecked: !isChecked
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

    setTimeout(() => {
        revalidatePath(`/list/${listId}`);
    }, 5000);
    
    return { data: item };
}

export const checkItem = createSafeAction(CheckItem, handler);