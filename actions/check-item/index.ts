"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { getUserById } from "@/data/auth/user";
import { createSafeAction } from "@/lib/create-safe-action";

import { InputType, ReturnType } from "./types";
import { CheckItem } from "./schema";

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

        const existingItem = await db.item.findUnique({
            where: {
                id: itemId,
                listId,
                list: {
                    OR: [
                        { userId: dbUser.id },
                        {
                            shares: { some: { userId: dbUser.id } }
                        }
                    ],
                },
            }
        });

        item = await db.item.update({
            where: {
                listId,
                list: {
                    OR: [
                        { userId: dbUser.id },
                        {
                            shares: { some: { userId: dbUser.id } }
                        }
                    ],
                },
                id: itemId,
            },
            data: {
                isChecked: !existingItem?.isChecked,
            },
        });
    } catch (error) {
        console.error(error);

        return { error: "Failed to update item." }
    }

    revalidatePath(`/list/${listId}`);
    return { data: item };
}

export const checkItem = createSafeAction(CheckItem, handler);