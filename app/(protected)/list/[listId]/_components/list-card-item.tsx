"use client";

import { toast } from "sonner";
import { useEffect, useState } from "react";
import { Item } from "@prisma/client";
import { useFormStatus } from "react-dom";
import { RxDotsHorizontal } from "react-icons/rx";

import { cn } from "@/lib/utils";
import { useAction } from "@/hooks/use-action";
import { checkItem } from "@/actions/check-item";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Popover,
    PopoverClose,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { MoreVertical, Plus, X } from "lucide-react";
import { FormInput } from "@/components/form/form-input";
import { ItemForm } from "./item-form";
import { FormSelect } from "@/components/form/form-select";
import { FormSubmit } from "@/components/form/form-submit";

interface ListCardItemProps {
    item: Item;
    listId: string;
}

export const ListCardItem = ({
    item,
    listId,
}: ListCardItemProps) => {
    const { pending } = useFormStatus();

    const [itemIsChecked, setItemIsChecked] = useState(item?.isChecked);

    const { execute } = useAction(checkItem, {
        onSuccess: (data) => {
            toast.success(`Item "${data.title}" updated.`);
            setItemIsChecked(data.isChecked);
        },
        onError: (error) => {
            toast.error(error);
        }
    });

    const handleSubmit = (formData: FormData) => {
        const itemId = formData.get("itemId") as string;

        execute({
            itemId,
            listId
        });
    }

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
                />
                <Button
                    disabled={pending}
                    size="sm"
                    variant="ghost"
                    className="w-full flex flex-row items-center justify-between"
                    onClick={handleCheckItem}
                >
                    <div className={cn(
                        "flex flex-row items-center gap-x-2",
                        itemIsChecked && "line-through text-stone-400/70"
                    )}>
                        {/* <Checkbox
                            disabled={pending}
                            defaultChecked={itemIsChecked}
                            checked={itemIsChecked}
                            onClick={handleCheckItem}
                        /> */}
                        <input
                            disabled={pending}
                            type="checkbox"
                            checked={itemIsChecked}
                            onClick={handleCheckItem}
                            className="rounded-md checked:bg-stone-700 shadow-md checked:hover:bg-stone-600 checked:focus:bg-stone-700 focus:ring-stone-700"
                        />
                        <span>{item.title}</span>
                    </div>
                    <div className="flex flex-row items-center gap-x-2">
                        {item.quantity && (
                            <Badge className={cn(
                                "",
                                itemIsChecked && "bg-stone-400/70 line-through"
                            )}>{item.quantity}</Badge>
                        )}
                    </div>
                </Button>
            </form>
            <Button
                size="sm"
                variant="ghost"
            >
                <MoreVertical className="h-4 w-4" />
            </Button>
        </div>
    )
}