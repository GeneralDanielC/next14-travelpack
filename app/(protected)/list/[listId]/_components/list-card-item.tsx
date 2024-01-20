"use client";

import { Item } from "@prisma/client";
import { RxDotsHorizontal } from "react-icons/rx";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

interface ListCardItemProps {
    item: Item;
}

export const ListCardItem = ({
    item,
}: ListCardItemProps) => {
    return (
        <div className="flex items-center gap-x-0.5">
            <Button size="sm" variant="ghost" className="w-full flex flex-row items-center justify-between">
                <div className={cn(
                    "flex flex-row items-center gap-x-2",
                    item.isChecked && "line-through text-stone-400/70"
                )}>
                    <Checkbox
                        defaultChecked={item.isChecked}
                    />
                    <span>{item.title}</span>
                </div>
                <div className="flex flex-row items-center gap-x-2">
                    {item.quantity && (
                        <Badge className="">{item.quantity}</Badge>
                    )}
                </div>
            </Button>
            <Button
                size="sm"
                variant="ghost"
            >
                <RxDotsHorizontal />
            </Button>
        </div>
    )
}