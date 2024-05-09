
import { db } from "@/lib/db";
import { MAX_FREE_LISTS } from "@/constants/lists";
import { currentUser } from "./auth";

export const incrementAvailableCount = async () => {
    const user = await currentUser();

    if (!user) {
        throw new Error("Unauthorized");
    }

    const listLimit = await db.listLimit.findUnique({
        where: { userId: user.id }
    });

    if (listLimit) {
        await db.listLimit.update({
            where: { userId: user.id },
            data: { count: listLimit.count + 1 }
        });
    } else {
        await db.listLimit.create({
            data: { userId: user.id, count: 1 }
        });
    }
}

export const decreaseAvailableCount = async () => {
    const user = await currentUser();

    if (!user) {
        throw new Error("Unauthorized");
    }

    const listLimit = await db.listLimit.findUnique({
        where: { userId: user.id }
    });

    if (listLimit) {
        await db.listLimit.update({
            where: { userId: user.id },
            data: { count: listLimit.count > 0 ? listLimit.count - 1 : 0 }
        });
    } else {
        await db.listLimit.create({
            data: { userId: user.id, count: 1 }
        });
    }
}

export const hasAvailableCount = async () => {
    const user = await currentUser();

    if (!user) {
        throw new Error("Unauthorized");
    }

    const listLimit = await db.listLimit.findUnique({
        where: { userId: user.id }
    });

    if (!listLimit || listLimit.count < MAX_FREE_LISTS) {
        return true;
    } else {
        return false;
    }
}

export const getAvailableCount = async () => {
    const user = await currentUser();

    if (!user) {
        return 0;
    }

    const listLimit = await db.listLimit.findUnique({
        where: { userId: user.id }
    });

    if (!listLimit) {
        return 0;
    }

    return listLimit.count;
}