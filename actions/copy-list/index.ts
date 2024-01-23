"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { getUserById } from "@/data/auth/user";
import { createSafeAction } from "@/lib/create-safe-action";

import { InputType, ReturnType } from "./types";
import { CopyList } from "./schema";

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
            }
        });

        if (!listToCopy) {
            return { error: "List not found." }
        }

        if (listToCopy.items.length === 0) {
            list = await db.list.create({
                data: {
                    userId,
                    title: `${listToCopy.title} - Copy`,
                    departAt: listToCopy.departAt,
                    themeId: listToCopy.themeId,
                    items: {},
                },
                include: {
                    theme: true,
                },
            });

        } else {
            list = await db.list.create({
                data: {
                    userId,
                    title: `${listToCopy.title} - Copy`,
                    departAt: listToCopy.departAt,
                    themeId: listToCopy.themeId,
                    items: {
                        createMany: {
                            data: listToCopy.items.map((item) => ({
                                title: item.title,
                                isChecked: item.isChecked,
                                quantity: item.quantity,
                                categoryId: item.categoryId,
                            })),
                        }
                    }
                },
                include: {
                    items: {
                        include: {
                            category: true,
                        },
                    },
                    theme: true,
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