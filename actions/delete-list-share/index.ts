"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { getUserByEmail, getUserById } from "@/data/auth/user";
import { createSafeAction } from "@/lib/create-safe-action";

import { InputType, ReturnType } from "./types";
import { DeleteListShare } from "./schema";
import { sendSharedToNotificationEmail } from "@/lib/mail";

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
    const { shareId } = data;

    let existingListShare = await db.listShare.findUnique({
        where: {
            id: shareId
        }
    });

    if (!existingListShare) return { error: "Could not find the shared list." }

    if (existingListShare.userId === dbUser.id) return { error: "Something went wrong." }

    let listShareToDelete;

    try {
        // throw new Error("a"); // artificial error - to be removed
        listShareToDelete = await db.listShare.delete({
            where: {
                id: shareId
            }
        });
    } catch (error) {
        return { error: "Failed to delete user from list." }
    }

    revalidatePath(`/dashboard`);
    return { data: listShareToDelete };
}

export const deleteListShare = createSafeAction(DeleteListShare, handler);