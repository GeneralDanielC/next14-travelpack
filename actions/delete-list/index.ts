"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { getUserById } from "@/data/auth/user";
import { createSafeAction } from "@/lib/create-safe-action";

import { InputType, ReturnType } from "./types";
import { DeleteList } from "./schema";
import { redirect } from "next/navigation";

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

    let list;

    try {
        list = await db.list.delete({
            where: {
                userId: dbUser.id,
                id: listId,
            },
        });
       
    } catch (error) {
        return { error: "Failed to delete" }
    }

    revalidatePath(`/list/${list.id}`);
    redirect(`/dashboard`);
}

export const deleteList = createSafeAction(DeleteList, handler);