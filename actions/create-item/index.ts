"use server";

import { revalidatePath } from "next/cache";
import OpenAI from "openai";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { getUserById } from "@/data/auth/user";
import { createSafeAction } from "@/lib/create-safe-action";

import { InputType, ReturnType } from "./types";
import { CreateItem } from "./schema";
import { getCategoriesByUserId, getListByIdAndUserId, getThemes, getTodoListTypeId } from "@/data/data";
import pusher from "@/lib/pusher";
import { CategoryWorkNames } from "@/types";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const handler = async (data: InputType): Promise<ReturnType> => {
    const user = await currentUser();

    if (!user) {
        return { error: "Unauthorized" }
    }

    const { title, listId, ownerUserId, listTypeId } = data;

    if (!listTypeId) return { error: "Missing data. Something went wrong!" }

    const list = await getListByIdAndUserId(listId, ownerUserId);

    const dbCategories = await getCategoriesByUserId(ownerUserId);

    const categoriesString = dbCategories
        .filter((category) => category.listTypeId === list?.typeId)
        .map((category) => category.workName)
        .join(', ');


    const prompt = `
        You are tasked with categorizing grocery items into one of the categories listed below. Select the category that best describes the item's typical section in a grocery store. Ensure that the category you pick corresponds directly to how the item would be found in a grocery store. 

        For example:
        - Laptop would not be found in a grocery store, so it would not fit any of these categories.
        - Pommes (French fries) are typically found in the frozen section, so they should be categorized as "frozen foods".
        
        The categories are: ${categoriesString.trim()}.
        
        \nCategorize this item: ${title}
        \nThe list type is: ${list?.type.title}
        \nThe theme is: ${list?.theme?.title || "none"}
        
        Answer ONLY with the category name from the list. Use the exact wording from the provided categories. No additional punctuation, no new lines, and remove any special characters or emojis.
`;


    console.log(prompt);


    let response;
    let fetchedCategoryName;

    const todoListTypeId = await getTodoListTypeId();

    if (!todoListTypeId) return { error: "Missing data. Try again later." }
    if (listTypeId !== todoListTypeId.id) {
        try {
            response = await openai.chat.completions.create({
                model: "gpt-4o-mini",
                messages: [
                    { role: "user", content: prompt }
                ],
                temperature: 0.2,
                max_tokens: 10,
                top_p: 1,
                frequency_penalty: 0,
                presence_penalty: 0,
                stop: ["\\n"],
            });

            console.log(response.choices[0].message);

            fetchedCategoryName = response?.choices[0].message.content?.trim().toLowerCase();
            fetchedCategoryName ? fetchedCategoryName.replace(/\n/g, '') : CategoryWorkNames.MISC;

            console.log(fetchedCategoryName);

        } catch (err) {
            console.log(err);
            return { error: "Something went wrong" }
        }
    } else {
        fetchedCategoryName = CategoryWorkNames.UNCATEGORIZED;
    }

    const miscCategory = dbCategories.find((category) => category.listTypeId === listTypeId && category.workName === "miscellaneous");

    const findCategoryId = (dbCategories: any, fetchedCategoryName: string) => {

        const matchedCategory = dbCategories.find((dbCat: any) =>
            dbCat.workName.toLowerCase() === fetchedCategoryName.toLowerCase()
        );

        return matchedCategory ? matchedCategory.id : miscCategory?.id;
    }

    const categoryId = findCategoryId(dbCategories, fetchedCategoryName);

    const existingItem = await db.item.findFirst({
        where: {
            title,
            listId,
        },
        select: {
            id: true,
            quantity: true,
        }
    });

    let item;

    if (existingItem) {
        try {
            const incrementValue = existingItem.quantity === 0 ? 2 : 1;

            item = await db.item.update({
                where: {
                    id: existingItem.id,
                },
                data: {
                    quantity: {
                        increment: incrementValue
                    }
                }
            });
            await pusher.trigger(`list-${listId}`, 'item-updated', {
                item: item,
                action: 'update'
            });
        } catch (error) {
            return { error: "Failed to create item" }
        }
    } else {
        try {
            // throw new Error("a"); // artificial error - to be removed

            const maxOrderItem = await db.item.findFirst({
                where: {
                    categoryId,
                },
                orderBy: {
                    order: 'desc',
                },
                select: {
                    order: true,
                }
            });

            const newOrder = maxOrderItem ? maxOrderItem.order + 1 : 0;

            item = await db.item.create({
                data: {
                    title,
                    categoryId,
                    quantity: 0,
                    listId,
                    order: newOrder,
                },
                include: {
                    category: true,
                }
            });

            await pusher.trigger(`list-${listId}`, 'item-created', {
                item: item,
                action: 'update'
            });
        } catch (error) {
            return { error: "Failed to create" }
        }
    }

    revalidatePath(`/list/${listId}`);
    return { data: item };
}

export const createItem = createSafeAction(CreateItem, handler);