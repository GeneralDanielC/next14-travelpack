
import { ExtendedUser } from "@/auth";
import { currentUser } from "../lib/auth";
import { db } from "../lib/db";

export const getListsByUserId = async (userId: string) => {
    const listShares = await db.listShare.findMany({
        where: {
            userId,
        },
        include: {
            list: {
                include: {
                    items: true,
                    theme: true,
                    type: true,
                    shares: true,
                }
            }
        }
    });

    let extractedShares = listShares.map((share) => {
        return share.list;
    });

    const lists = await db.list.findMany({
        where: {
            userId
        },
        include: {
            items: true,
            theme: true,
            type: true,
            shares: true,
        },
    });

    console.log(lists.concat(extractedShares));


    return lists.concat(extractedShares);
}

export const getListByIdAndUserId = async (id: string, userId: string) => {
    const list = await db.list.findUnique({
        where: {
            id,
            OR: [
                { userId },
                { shares: { some: { userId } } }
            ]
        },
        include: {
            items: {
                include: {
                    category: true,
                },
            },
            theme: true,
            type: true,
            shares: {
                include: {
                    user: true,
                }
            },
            user: true,
        }
    });    

    return list;
}

export const getListSharesByUserId = async (userId: string) => {
    const listShares = await db.listShare.findMany({
        where: {
            userId
        },
        include: {
            list: true,
            user: true,
        },
    });
    return listShares;
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
