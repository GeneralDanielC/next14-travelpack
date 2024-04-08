"use client";

import Link from "next/link";

import { cn } from "@/lib/utils";
import { ListWithItems, ListWithItemsThemeAndType, Types } from "@/types";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

interface ListItemProps {
    list: ListWithItemsThemeAndType,
    size?: "default" | "sm",
}

export const ListItem = ({
    list,
    size,
}: ListItemProps) => {
    const pathname = usePathname();

    const totalCountChecked = (list: ListWithItems) => {
        let count = 0;
        list.items.map((item) => {
            if (item.isChecked) {
                count += 1;
            }
        });
        return count;
    }

    return (
        <Button
            variant="ghost"
            className={cn(
                "space-y-4 w-full flex items-center justify-start p-1.5 h-auto bg-stone-50 dark:bg-stone-800 rounded-xl shadow-sm",
                pathname === `/lists/${list.id}` && "bg-stone-300/80 dark:bg-stone-700/80",
            )}
            asChild
        >
            <Link href={`/lists/${list.id}`}>
                {/* <div className="flex flex-col w-full gap-y-1">
                    <div className="flex items-center gap-x-2">
                        <span className={cn(
                            "text-2xl rounded-full flex items-center justify-center w-10 h-10",
                            `${list.type.title === Types.PACKING ? list.theme?.emojiBackground : list.type.emojiBackground} ${size === "sm" && "text-xl w-7 h-7"}`
                        )}>
                            {list.type.title === Types.PACKING ? list.theme?.emoji : list.type.emoji}
                        </span>
                        <span className="text-md">{list.title}</span>
                    </div>
                    <div className="px-1 flex items-center gap-x-2">
                        <Progress value={(totalCountChecked(list) / list.items.length) * 100} />
                        <span className="text-xs font-normal">{totalCountChecked(list)} / {list.items.length}</span>
                    </div>
                </div> */}
                <div className="flex flex-row gap-y-1 w-full gap-x-2">
                    <div className="flex items-center">
                        <span className={cn(
                            "text-3xl rounded-full flex items-center justify-center size-12",
                            `${list.type.title === Types.PACKING ? list.theme?.emojiBackground : list.type.emojiBackground} ${size === "sm" && "text-xl w-7 h-7"}`
                        )}>
                            {list.type.title === Types.PACKING ? list.theme?.emoji : list.type.emoji}
                        </span>
                    </div>
                    <div className="flex flex-col justify-between w-full py-2">
                        <span className="text-md">{list.title}</span>
                        <div className="flex items-center gap-x-2">
                            <Progress value={(totalCountChecked(list) / list.items.length) * 100} />
                            <span className="text-xs font-normal">{totalCountChecked(list)} / {list.items.length}</span>
                        </div>
                    </div>
                </div>
            </Link>
        </Button>
    )
}