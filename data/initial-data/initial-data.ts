import { db } from "@/lib/db";
import { CategoryWorkNames, ThemeNames, Types } from "@/types";
import { initialCategories } from "./initial-categories";
import { Theme } from "@prisma/client";
import { initialSuggestions } from "./initialize-suggestions";
import { getListTypeIds, getThemes } from "../data";

type CategoryIdMap = { [workName: string]: string };

interface setupInitialDataProps {
    userId: string,
}

interface createInitialCategoriesProps {
    userId: string,
    listTypePackingId: string,
    listTypeGroceryId: string,
    listTypeTodoId: string,
}

export const setupInitialData = async ({ userId }: setupInitialDataProps) => {
    // const themes = await getThemes();

    try {
        console.log("Trying to fetch list type IDs");

        const { listTypePackingId, listTypeGroceryId, listTypeTodoId } = await getListTypeIds();

        console.log('Packing ID:', listTypePackingId);
        console.log('Grocery ID:', listTypeGroceryId);
        console.log('Todo ID:', listTypeTodoId);

        console.log("Trying to create categories");

        const categories = await createInitialCategories({ userId, listTypePackingId, listTypeGroceryId, listTypeTodoId });

        console.log("Categories created:", categories);

        if (!categories || categories.length === 0) {
            console.error("No categories found");
            return { error: "Something went wrong initializing categories." };
        }

    } catch (error) {
        console.error('Error during setupInitialData:', error);
        return { error: "Something went wrong during setupInitialData." };
    }

    // const categoryMap = categories.reduce((acc: { [key: string]: string }, category) => {
    //     acc[category.workName] = category.id;
    //     return acc;
    // }, {});

    // await createInitialSuggestions(userId, themes, categoryMap)
}

const createInitialSuggestions = async (userId: string, themes: Theme[], categoryMap: CategoryIdMap) => {
    return;
    // const themeIdsByTitle = themes.reduce((acc: { [key: string]: string }, theme) => {
    //     acc[theme.title] = theme.id;
    //     return acc;
    // }, {});

    // await db.suggestion.createMany({
    //     data: initialSuggestions(userId, themeIdsByTitle, categoryMap, themes)
    // });
}

const createInitialCategories = async ({
    userId,
    listTypePackingId,
    listTypeGroceryId,
    listTypeTodoId,
}: createInitialCategoriesProps) => {
    console.log("Creating categories in DB for user", userId);

    try {
        await db.category.createMany({
            data: initialCategories({ userId, listTypePackingId, listTypeGroceryId, listTypeTodoId }),
        });
        console.log("Categories created successfully");

    } catch (err) {
        console.error("Error creating categories", err);
        throw new Error("Failed to create categories.");
    }

    try {
        const categories = await db.category.findMany({
            where: { userId }
        });
        console.log("Categories fetched for user", userId, categories);
        return categories;

    } catch (err) {
        console.error("Error fetching categories", err);
        throw new Error("Failed to fetch categories.");
    }
}