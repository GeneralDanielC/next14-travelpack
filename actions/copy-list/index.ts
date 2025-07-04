"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { getUserById } from "@/data/auth/user";
import { createSafeAction } from "@/lib/create-safe-action";

import { InputType, ReturnType } from "./types";
import { CopyList } from "./schema";
import { hasAvailableCount } from "@/lib/list-limit";
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
    const { userId, listId } = data;

    let list;

    try {
        const listToCopy = await db.list.findUnique({
            where: {
                id: listId,
                userId,
            },
            include: {
                items: {
                    include: {
                        category: true,
                    },
                },
                theme: true,
                type: true,
            }
        });

        console.log(listToCopy);


        if (!listToCopy) {
            return { error: "List not found." }
        }

        if (listToCopy.items.length === 0) {
            list = await db.list.create({
                data: {
                    userId: dbUser.id,
                    title: `${listToCopy.title} - Copy`,
                    departAt: listToCopy.departAt,
                    themeId: listToCopy.themeId,
                    typeId: listToCopy.typeId,
                    items: {},
                },
                include: {
                    theme: true,
                },
            });

        } else {
            list = await db.list.create({
                data: {
                    userId: dbUser.id,
                    title: `${listToCopy.title} - Copy`,
                    departAt: listToCopy.departAt,
                    themeId: listToCopy.themeId,
                    typeId: listToCopy.typeId,
                    items: {
                        createMany: {
                            data: listToCopy.items.map((item) => ({
                                title: item.title,
                                isChecked: item.isChecked,
                                quantity: item.quantity,
                                categoryId: item.categoryId,
                                order: item.order,
                            })),
                        }
                    },
                },
                include: {
                    items: {
                        include: {
                            category: true,
                        },
                    },
                    theme: true,
                    type: true,
                },
            });
        }

    } catch (error) {
        console.error("Failed during creation", error);

        return { error: "Failed to copy list." }
    }

    revalidatePath(`/list/${list.id}`);
    return { data: list };
}

export const copyList = createSafeAction(CopyList, handler);