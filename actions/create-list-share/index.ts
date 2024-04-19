"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { getUserByEmail, getUserById } from "@/data/auth/user";
import { createSafeAction } from "@/lib/create-safe-action";

import { InputType, ReturnType } from "./types";
import { CreateListShare } from "./schema";

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
    const { userEmail, listId, canEdit } = data;

    const newShareUser = await getUserByEmail(userEmail);

    if (!newShareUser) {
        return { error: "No user found. Try again with another email." };
    }    

    let listShare;

    try {
        // throw new Error("a"); // artificial error - to be removed
        listShare = await db.listShare.create({
            data: {
                userId: newShareUser.id,
                listId,
                canEdit,
            }
        });
    } catch (error) {
        console.error("Error sharing list:", error);
        console.error("DB object status:", db);        
        return { error: "Failed to share list." }
    }

    revalidatePath(`/list/${listId}`);
    return { data: listShare };
}

export const createListShare = createSafeAction(CreateListShare, handler);