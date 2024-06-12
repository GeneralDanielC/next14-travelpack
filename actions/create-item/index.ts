"use server";

import { revalidatePath } from "next/cache";
import OpenAI from "openai";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { getUserById } from "@/data/auth/user";
import { createSafeAction } from "@/lib/create-safe-action";

import { InputType, ReturnType } from "./types";
import { CreateItem } from "./schema";
import { getListByIdAndUserId, getThemes } from "@/data/data";
import pusher from "@/lib/pusher";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

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
    // const { title, categoryId, quantity, listId } = data;
    const { title, listId, ownerUserId } = data;

    const list = await getListByIdAndUserId(listId, ownerUserId);

    const themes = await getThemes();

    const themesString = themes.map((theme) => {
        if (!theme.isListType) {
            return `Theme Name: ${theme.title || 'N/A'}, Description: ${theme.description || 'No description available'}`;
        }
    });

    const dbCategories = await db.category.findMany({
        where: {
            userId: ownerUserId,
        }
    });

    const categoriesString = dbCategories.map((category) => {
        return `${category.displayName}, `;
    });

    const prompt = `
        Categorize the following items into one category based on their type, without using any bullet points or dashes. Write the category in a simple word/words. Use the categories from the provided list below.
        
        For example, "Laptop" would be categorized as "Electroincs", and "Jeans" would be "Clothing". 

        \nHere are some examples of categorizing:
        \n- Laptop: Electronics
        \n- Jeans: Clothing
        \n- Coffee mug: Kitchenware

        \nPlease consider the list type and theme when categorizing the item. 
        \nThe list types are "Packing list", "To-do list" and "Grocery/shopping list". 
        \nThe themes are ${themesString}.
        \nThe categories are ${categoriesString}.
        
        \n\nCategorize this item: ${title}
        \nThe list type is: ${list?.type.title}
        \nThe theme is: ${list?.theme?.title || "none"}
        \nRemember to pick a category from the list and return the category ONLY typing the category name.`;        

    // CHANGE: add reference to list type.
    // CHANGE: possibly add a long string of all the categories that are available... Maybe unnecessary...
    // ADD THIS CODE WITHIN A TRY CATCH BLOCK
    const response = await openai.completions.create({
        model: "gpt-3.5-turbo-instruct",
        prompt,
        temperature: 0,
        max_tokens: 10,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        stop: ["\\n"],
    });

    const fetchedCategories = response.choices[0].text;

    const fetchedCategoryList = fetchedCategories.split(',').map(cat => cat.trim().toLowerCase());

    console.log("fetchedCategoryList", fetchedCategoryList);

    const miscCategory = await db.category.findFirst({
        where: {
            userId: ownerUserId,
            workName: "Miscellaneous"
        }
    });

    const findCategoryId = (dbCategories: any, fetchedCategoryList: String[]) => {
        for (const dbCat of dbCategories) {

            if (fetchedCategoryList.includes(dbCat.workName.toLowerCase())) {
                return dbCat.id;
            }
        }
        return miscCategory?.id;
    }

    const categoryId = findCategoryId(dbCategories, fetchedCategoryList);

    let item;

    try {
        // throw new Error("a"); // artificial error - to be removed
        item = await db.item.create({
            data: {
                title,
                categoryId,
                quantity: 0,
                listId,
            }
        });
        
        await pusher.trigger(`list-${listId}`, 'item-created', {
            item: item,
            action: 'update'
        });
    } catch (error) {
        return { error: "Failed to create" }
    }

    revalidatePath(`/list/${listId}`);
    return { data: item };
}

export const createItem = createSafeAction(CreateItem, handler);