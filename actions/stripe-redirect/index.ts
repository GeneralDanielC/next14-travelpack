"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { getUserById } from "@/data/auth/user";
import { createSafeAction } from "@/lib/create-safe-action";

import { InputType, ReturnType } from "./types";
import { StripeRedirect } from "./schema";
import { absoluteUrl } from "@/lib/utils";
import { stripe } from "@/lib/stripe";

const handler = async (data: InputType): Promise<ReturnType> => {
    const user = await currentUser();

    if (!user) {
        return { error: "Unauthorized" }
    }

    const dbUser = await getUserById(user.id);

    if (!dbUser) {
        return { error: "Unauthorized" }
    }

    const settingsUrl = absoluteUrl(`/settings/user`);

    let url = "";

    try {
        const userSubscription = await db.userSubscription.findUnique({
            where: { userId: dbUser.id }
        });

        if (userSubscription && userSubscription.stripeCustomerId) {
            const stripeSession = await stripe.billingPortal.sessions.create({
                customer: userSubscription.stripeCustomerId,
                return_url: settingsUrl,
            });

            url = stripeSession.url;
        } else {
            const stripeSession = await stripe.checkout.sessions.create({
                success_url: settingsUrl,
                cancel_url: settingsUrl,
                payment_method_types: ["card"],
                mode: "subscription",
                billing_address_collection: "auto",
                customer_email: dbUser.email ?? undefined,
                line_items: [
                    {
                        price_data: {
                            currency: "SEK",
                            product_data: {
                                name: "Travelpack Pro",
                                description: "Unlimited lists and items for your lists!",
                            },
                            unit_amount: 2900,
                            recurring: {
                                interval: "month"
                            },
                        },
                        quantity: 1,
                    },
                ],
                metadata: {
                    userId: dbUser.id,
                }
            });

            url = stripeSession.url || "";
        }
    } catch {
        return { error: "Something went wrong!" }
    }

    revalidatePath(`/settings/user`);
    return { data: url };
}

export const stripeRedirect = createSafeAction(StripeRedirect, handler);