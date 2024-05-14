"use client";

import { toast } from "sonner";
import { useEffect, useState } from "react";
import { Category, Item } from "@prisma/client";
import { useFormStatus } from "react-dom";

import { cn } from "@/lib/utils";
import { useAction } from "@/hooks/use-action";
import { checkItem } from "@/actions/check-item";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ItemSettingsForm } from "./item-settings-form";

interface ListCardItemProps {
    item: Item;
    listId: string;
    categories?: Category[];
    userHasEditingRights?: boolean;
}

export const ListCardItem = ({
    item,
    listId,
    categories,
    userHasEditingRights
}: ListCardItemProps) => {
    const { pending } = useFormStatus();

    const [itemIsChecked, setItemIsChecked] = useState(item?.isChecked);

    const { execute } = useAction(checkItem, {
        onSuccess: (data) => {
            // toast.success(`Item "${data.title}" updated.`);
            setItemIsChecked(data.isChecked);
        },
        onError: (error) => {
            toast.error(error);
        }
    });

    const handleSubmit = (formData: FormData) => {
        const itemId = formData.get("itemId") as string;

        if (!userHasEditingRights) return;

        execute({
            itemId,
            listId
        });
    }

    useEffect(() => {
        setItemIsChecked(item.isChecked);
    }, [item]);

    const handleCheckItem = (e: React.MouseEvent) => {
        e.stopPropagation();
        setItemIsChecked(!itemIsChecked);
    }

    return (
        <div className="flex items-center gap-x-0.5">
            <form
                action={handleSubmit}
                className="w-full"
            >
                <input
                    hidden
                    id="itemId"
                    name="itemId"
                    value={item.id}
                    disabled={!userHasEditingRights}
                />
                <Button
                    disabled={!userHasEditingRights || pending}
                    size="sm"
                    variant="ghost"
                    className="w-full flex flex-row items-center justify-between"
                    onClick={handleCheckItem}
                >
                    <div className={cn(
                        "flex flex-row items-center gap-x-2",
                        itemIsChecked && "line-through text-stone-400/70"
                    )}>
                        <input
                            disabled={pending}
                            type="checkbox"
                            checked={itemIsChecked}
                            onClick={handleCheckItem}
                            className="rounded-md checked:bg-stone-700 shadow-md checked:hover:bg-stone-600 checked:focus:bg-stone-700 focus:ring-stone-700
                            dark:bg-stone-500"
                        />
                        <span>{item.title}</span>
                    </div>
                    <div className="flex flex-row items-center gap-x-2">
                        {item.quantity !== 0 && (
                            <Badge className={cn(
                                "",
                                itemIsChecked && "bg-stone-400/70 line-through"
                            )}>{item.quantity}</Badge>
                        )}
                    </div>
                </Button>
            </form>
            {userHasEditingRights && (
                <ItemSettingsForm item={item} categories={categories} />
            )}
        </div>
    )
}