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

    const categoriesString = dbCategories.map((category) => {
        if (category.listTypeId === list?.typeId) {
            return `${category.workName}, `;
        }
    });


    const prompt = `
        Categorize the following items into one category based on their type, without using any bullet points or dashes. Write the category in a simple word/words. Use the categories from the provided list below.
        
        For example, "Laptop" would be categorized as "Electroincs", and "Jeans" would be "Clothing". There may be subcategories to say "Clothing", named for example "Underwear".

        \nHere are some examples of categorizing:
        \n- Laptop: Electronics
        \n- Jeans: Clothing

        \nThe categories are ${categoriesString}.
        
        \n\nCategorize this item: ${title}
        \nThe list type is: ${list?.type.title}
        \nThe theme is: ${list?.theme?.title || "none"}
        \nRemember to pick a category from the list and return the category ONLY typing the category name. Answer in the same language that your chosen category is written. No colons, no commas, no new lines, just write the category and absolutely nothing else. If there are special characters or emojis, remove them.`;

    console.log(prompt);


    let response;
    let fetchedCategoryName;

    const todoListTypeId = await getTodoListTypeId();

    if (!todoListTypeId) return { error: "Missing data. Try again later." }
    if (listTypeId !== todoListTypeId.id) {
        try {
            response = await openai.completions.create({
                model: "gpt-3.5-turbo-instruct",
                prompt,
                temperature: 0,
                max_tokens: 20,
                top_p: 1,
                frequency_penalty: 0,
                presence_penalty: 0,
                stop: ["\\n"],
            });

            console.log(response);

            fetchedCategoryName = response?.choices[0].text.trim().toLowerCase();
            fetchedCategoryName.replace(/\n/g, '');

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