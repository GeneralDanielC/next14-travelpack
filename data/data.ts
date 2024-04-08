
import { ExtendedUser } from "@/auth";
import { currentUser } from "../lib/auth";
import { db } from "../lib/db";

export const getListsByUserId = async (userId: string) => {
    const lists = await db.list.findMany({
        where: {
            userId
        },
        include: {
            items: true,
            theme: true,
            type: true,
        },
    });
    return lists;
}

export const getCategoriesByUserId = async (userId: string) => {
    const categories = await db.category.findMany({
        where: {
            userId
        }
    });
    return categories;
}

export const getThemes = async () => {
    const themes = await db.theme.findMany({
        where: { isListType: false }
    });

    return themes;
}

export const getTypes = async () => {
    const types = await db.theme.findMany({
        where: { isListType: true }
    });

    return types;
}