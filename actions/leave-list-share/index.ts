"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { getUserByEmail, getUserById } from "@/data/auth/user";
import { createSafeAction } from "@/lib/create-safe-action";

import { InputType, ReturnType } from "./types";
import { LeaveListShare } from "./schema";
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
    const { listId } = data;

    let existingListShare = await db.listShare.findFirst({
        where: {
            listId,
            userId: dbUser.id,
        }
    });

    if (!existingListShare) return { error: "Could not find the shared list." }

    let listShareToDelete;

    try {
        // throw new Error("a"); // artificial error - to be removed
        listShareToDelete = await db.listShare.delete({
            where: {
                id: existingListShare.id,
                userId: dbUser.id,
                listId
            }
        });
    } catch (error) {
        return { error: "Failed to leave list." }
    }

    revalidatePath(`/dashboard`);
    return { data: listShareToDelete };
}

export const leaveListShare = createSafeAction(LeaveListShare, handler);