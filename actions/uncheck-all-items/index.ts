"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { getUserById } from "@/data/auth/user";
import { createSafeAction } from "@/lib/create-safe-action";

import { InputType, ReturnType } from "./types";
import { UncheckAllItems } from "./schema";
import pusher from "@/lib/pusher";

const handler = async (data: InputType): Promise<ReturnType> => {
    const user = await currentUser();

    if (!user) {
        return { error: "Unauthorized" }
    }

    // No need to validate this input data since it is already done in the create-safe-action.
    const { listId } = data;

    let items;

    try {
        // throw new Error("a"); // artificial error - to be removed

        items = await db.item.updateMany({
            where: {
                listId,
            },
            data: {
                isChecked: false,
            },
        });

        await pusher.trigger(`list-${listId}`, 'all-items-unchecked', {
            action: 'update'
        });
    } catch (error) {
        console.error(error);

        return { error: "Failed to update items." }
    }

    revalidatePath(`/list/${listId}`);
    return { data: "Success" };
}

export const uncheckAllItems = createSafeAction(UncheckAllItems, handler);