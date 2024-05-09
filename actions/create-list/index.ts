"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { getUserById } from "@/data/auth/user";
import { createSafeAction } from "@/lib/create-safe-action";

import { InputType, ReturnType } from "./types";
import { CreateList } from "./schema";
import { Types } from "@/types";
import { incrementAvailableCount, hasAvailableCount } from "@/lib/list-limit";
import { checkSubscription } from "@/lib/subscription";

const handler = async (data: InputType): Promise<ReturnType> => {
    const user = await currentUser();

    if (!user) {
        return { error: "Unauthorized" }
    }

    const dbUser = await getUserById(user.id);

    if (!dbUser) {
        return { error: "Unauthorized" }
    }

    const canCreate = await hasAvailableCount();
    const isPro = await checkSubscription();

    if (!canCreate && !isPro) {
        return { error: "You have reached your limit of free lists. Please upgrade to create more." }
    }

    // No need to validate this input data since it is already done in the create-safe-action.
    const { title, themeId, departAt, typeId } = data;

    if (!typeId) {
        return { error: "Missing fields. Failed to create list." };
    }

    const packingType = await db.theme.findFirst({
        where: {
            isListType: true,
            title: Types.PACKING
        }
    })

    if (!packingType) {
        return { error: "Something went wrong when creating list." }
    }

    if (typeId === packingType.id) {
        if (!themeId) {
            return { error: "Missing fields. Failed to create list." }
        }
    }

    let list;

    try {
        // throw new Error("a"); // artificial error - to be removed
        list = await db.list.create({
            data: {
                title,
                themeId,
                departAt,
                typeId,
                userId: user.id,
            }
        });

        if (!isPro) {
            await incrementAvailableCount();
        }

    } catch (error) {
        return { error: "Failed to create" }
    }

    revalidatePath(`/list/${list.id}`);
    return { data: list };
}

export const createList = createSafeAction(CreateList, handler);