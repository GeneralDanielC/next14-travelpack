import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader as ShadcnCardHeader } from "@/components/ui/card";
import { UserSettingsForm } from "@/components/user-settings-form";
import Link from "next/link";
import { FaAngleLeft } from "react-icons/fa";
import { CardNavigation } from "../../_components/card-navigation";
import { currentUser } from "@/lib/auth";
import { SubscriptionButton } from "./_components/subscription-button";
import { checkSubscription, subscriptionIsAnnulled, subscriptionPeriodEnd } from "@/lib/subscription";
import { ArrowDown, Check, CheckCircle, CreditCard } from "lucide-react";
import { BillingListItem } from "./_components/billing-list-item";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const SettingsPage = async () => {
    const user = await currentUser();
    const isPro = await checkSubscription();
    let periodEnd = await subscriptionPeriodEnd();
    const isAnnulled = await subscriptionIsAnnulled();

    if (!user) {
        return <p>unauthorized</p>
    }

    if (!periodEnd) {
        periodEnd = new Date();
    }

    return (
        <Card className="w-full h-full flex flex-col rounded-l-3xl rounded-r-none shadow-2xl border-none">
            <CardNavigation
                user={user}
                breadcrumbs={[
                    {
                        name: "Settings",
                        href: "/settings/user"
                    }
                ]}
            />
            <CardContent className="overflow-y-scroll max-h-full">
                <CardContent>
                    <div className="mt-6 flex flex-col bg-accent p-5 rounded-xl w-full space-y-2">
                        <h1 className="text-2xl font-bold">My Plan</h1>
                        <div className=" grid grid-cols-1 md:grid-cols-2 gap-3 justify-center">
                            <div className={cn("flex flex-col w-full p-2 rounded-xl hover:border-2 border-accent-foreground transition-all  duration-50",
                                !isPro ? "border-2 shadow-md" : "opacity-40"
                            )}>
                                <div className={cn("flex flex-row justify-between items-center", !isPro && "mb-2")}>
                                    <div className="flex flex-col">
                                        <span className="font-extrabold text-lg">Free</span>
                                        <span className="font-semibold text-md text-accent-foreground/70">0 SEK/mo</span>
                                        {!isPro && <i className="text-xs text-accent-foreground/60">Your current plan</i>}
                                    </div>
                                    {!isPro && <CheckCircle className="text-lime-500 size-7" />}
                                </div>
                                {!isPro && (
                                    <Button disabled={!isPro}>{!isPro && "Your current plan"}</Button>
                                )}
                                <div className="flex flex-col p-2 gap-y-0.5">
                                    <div className="flex flex-row items-center gap-x-2">
                                        <Check className="size-5" />
                                        <span className="text-xs">Limited to 3 lists</span>
                                    </div>
                                    <div className="flex flex-row items-center gap-x-2">
                                        <Check className="size-5" />
                                        <span className="text-xs">Limited to 15 items per list</span>
                                    </div>
                                    <div className="flex flex-row items-center gap-x-2">
                                        <Check className="size-5" />
                                        <span className="text-xs">AI-powered categorization</span>
                                    </div>
                                    <div className="flex flex-row items-center gap-x-2">
                                        <Check className="size-5" />
                                        <span className="text-xs">Packing lists with 3 available themes</span>
                                    </div>
                                </div>
                            </div>
                            {/* <Separator className="w-[80%] bg-accent-foreground" /> */}
                            <div className={cn("flex flex-col w-full p-2 rounded-xl hover:border-2 5 border-accent-foreground transition-all duration-50",
                                isPro && "border-2 shadow-md"
                            )}>
                                <div className="flex flex-row justify-between items-center mb-2">
                                    <div className="flex flex-col">
                                        <span className="font-extrabold text-lg">Plus+</span>
                                        <span className="font-semibold text-md text-accent-foreground/70">29 SEK/mo</span>
                                        {isPro && <i className="text-xs text-accent-foreground/60">Your current plan</i>}
                                        {isAnnulled && <i className="text-xs text-accent-foreground/60">You still have access to Plus+ until {new Date(periodEnd).toLocaleDateString()}</i>}
                                    </div>
                                    {isPro ?
                                        (!isAnnulled ? <CheckCircle className="text-lime-500 size-10" /> : <ArrowDown className="text-blue-400 size-10" />)
                                        : null
                                    }
                                </div>
                                <SubscriptionButton isPro={isPro} />
                                <div className="flex flex-col p-2 gap-y-0.5">
                                    <div className="flex flex-row items-center gap-x-2">
                                        <Check className="size-5" />
                                        <span className="text-xs">Unlimited lists</span>
                                    </div>
                                    <div className="flex flex-row items-center gap-x-2">
                                        <Check className="size-5" />
                                        <span className="text-xs">Unlimited items</span>
                                    </div>
                                    <div className="flex flex-row items-center gap-x-2">
                                        <Check className="size-5" />
                                        <span className="text-xs">AI-powered suggestions</span>
                                    </div>
                                    <div className="flex flex-row items-center gap-x-2">
                                        <Check className="size-5" />
                                        <span className="text-xs">Create your own favorite recipes. Add the ingredients to your grocery list.</span>
                                    </div>
                                    <div className="flex flex-row items-center gap-x-2">
                                        <Check className="size-5" />
                                        <span className="text-xs">Packing-lists, todo-lists and grocery lists.</span>
                                    </div>
                                    <div className="flex flex-row items-center gap-x-2">
                                        <Check className="size-5" />
                                        <span className="text-xs">Packing lists with 9 themes.</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </CardContent>
                <ShadcnCardHeader>
                    <h1 className="text-2xl font-bold">Settings</h1>
                </ShadcnCardHeader>
                <CardContent>
                    <UserSettingsForm />
                </CardContent>
            </CardContent>
        </Card>
    );
}

export default SettingsPage;

