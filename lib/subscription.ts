import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";

const DAY_IN_MS = 86_400_000;

export const checkSubscription = async () => {
    const user = await currentUser();

    if (!user) {
        return false;
    }

    const userId = user.id;

    const userSubscription = await db.userSubscription.findUnique({
        where: { userId },
        select: {
            stripeSubscriptionId: true,
            stripeCurrentPeriodEnd: true,
            stripeCustomerId: true,
            stripePriceId: true,
            stripeCancelAtPeriodEnd: true,
        }
    });

    if (!userSubscription) { return false }

    const isValid = userSubscription.stripePriceId && userSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now();

    // returns a boolean using !!
    return !!isValid;
}

export const subscriptionPeriodEnd = async () => {
    const user = await currentUser();

    if (!user) {
        return false;
    }

    const userId = user.id;

    const userSubscription = await db.userSubscription.findUnique({
        where: { userId },
        select: {
            stripeSubscriptionId: true,
            stripeCurrentPeriodEnd: true,
            stripeCustomerId: true,
            stripePriceId: true,
            stripeCancelAtPeriodEnd: true,
        }
    });

    if (!userSubscription) { return false }

    return userSubscription.stripeCurrentPeriodEnd;
}

export const subscriptionIsAnnulled = async () => {
    const user = await currentUser();

    if (!user) {
        return false;
    }

    const userId = user.id;

    const userSubscription = await db.userSubscription.findUnique({
        where: { userId },
        select: {
            stripeSubscriptionId: true,
            stripeCurrentPeriodEnd: true,
            stripeCustomerId: true,
            stripePriceId: true,
            stripeCancelAtPeriodEnd: true,
        }
    });

    if (!userSubscription) { return false }

    return userSubscription.stripeCancelAtPeriodEnd;
}

