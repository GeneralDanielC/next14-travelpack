
import { ExtendedUser } from "@/auth";
import { currentUser } from "../lib/auth";
import { db } from "../lib/db";
import { Types } from "@/types";

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
        },
        include: {
            items: true
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

export const getListTypes = async () => {
    const types = await db.theme.findMany({
        where: { isListType: true }
    });

    return types;
}

export const getListTypeIds = async () => {
    const listTypes = await db.theme.findMany({
        where: {
            isListType: true,
        },
        select: {
            id: true,
            title: true
        }
    });

    const ids = listTypes.reduce((acc, listType) => {
        if (listType.title === Types.PACKING) {
            acc.listTypePackingId = listType.id;
        } else if (listType.title === Types.GROCERY) {
            acc.listTypeGroceryId = listType.id;
        } else if (listType.title === Types.TODO) {
            acc.listTypeTodoId = listType.id;
        }
        return acc;
    }, {
        listTypePackingId: '',
        listTypeGroceryId: '',
        listTypeTodoId: ''
    });

    if (!ids.listTypePackingId || !ids.listTypeGroceryId || !ids.listTypeTodoId) {
        throw new Error('One or more list types were not found');
    }

    return ids;
}

export const getTodoListTypeId = async () => {
    return await db.theme.findFirst({
        where: {
            isListType: true,
            title: Types.TODO,
        },
        select: {
            id: true,
        }
    });
}