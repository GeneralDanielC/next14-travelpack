"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Item } from "@prisma/client";
import { useState } from "react";
import { toast } from "sonner";

interface PreviewItemProps {
    item: Item
}

export const PreviewItem = ({
    item
}: PreviewItemProps) => {
    const [itemIsChecked, setItemIsChecked] = useState(item?.isChecked);

    return (
        <Button
            size="sm"
            variant="ghost"
            className="w-full flex flex-row items-center justify-between"
            onClick={() => toast.error("Insufficient permission.")}
            disabled
        >
            <div key={item.id} className="flex items-center justify-between w-full">
                <div className={cn(
                    "flex flex-row items-center gap-x-2",
                    itemIsChecked && "line-through text-stone-400/70"
                )}>
                    <input
                        disabled
                        type="checkbox"
                        checked={itemIsChecked}
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
            </div>
        </Button>
    )

}