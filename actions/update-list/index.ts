"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { getUserById } from "@/data/auth/user";
import { createSafeAction } from "@/lib/create-safe-action";

import { InputType, ReturnType } from "./types";
import { UpdateList } from "./schema";
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
    const { title, listId, themeId, departAt } = data;
    
    console.log("Recieved data", title);
    

    if (!listId) {
        return { error: "No list found." };
    }

    let list;

    try {
        // throw new Error("a"); // artificial error - to be removed
        list = await db.list.update({
            where: {
                userId: user.id,
                id: listId,
            },
            data: {
                title,
                themeId,
                departAt,
            }
        });

        await pusher.trigger(`list-${listId}`, 'list-updated', {
            list: list,
            action: 'update'
        });
    } catch (error) {
        return { error: "Failed to update" }
    }

    revalidatePath(`/list/${list.id}`);
    return { data: list };
}

export const updateList = createSafeAction(UpdateList, handler);