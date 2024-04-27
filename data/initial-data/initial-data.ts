import { db } from "@/lib/db";
import { CategoryWorkNames, ThemeNames, Types } from "@/types";
import { initialCategories } from "./initial-categories";
import { Theme } from "@prisma/client";
import { initialSuggestions } from "./initialize-suggestions";

type CategoryIdMap = { [workName: string]: string };

export const setupInitialData = async (userId: string) => {
    const themes = await db.theme.findMany({
        where: { isListType: false }
    });

    const listTypePacking = await db.theme.findFirst({
        where: {
            isListType: true,
            title: Types.PACKING,
        }
    });

    if (!listTypePacking) return { error: "Something went wrong" }

    const categories = await createInitialCategories(userId, listTypePacking.id);

    if (!categories) return { error: "Something went wrong initalizing categories." }

    const categoryMap = categories.reduce((acc: { [key: string]: string }, category) => {
        acc[category.workName] = category.id;
        return acc;
    }, {});

    await createInitialSuggestions(userId, themes, categoryMap)

}

const createInitialSuggestions = async (userId: string, themes: Theme[], categoryMap: CategoryIdMap) => {
    const themeIdsByTitle = themes.reduce((acc: { [key: string]: string }, theme) => {
        acc[theme.title] = theme.id;
        return acc;
    }, {});

    await db.suggestion.createMany({
        data: initialSuggestions(userId, themeIdsByTitle, categoryMap, themes)
    });
}

const createInitialCategories = async (userId: string, listTypePackingId: string) => {
    await db.category.createMany({
        data: initialCategories(userId, listTypePackingId),
    });

    const categories = await db.category.findMany({
        where: {
            userId
        }
    })
    return categories;
}