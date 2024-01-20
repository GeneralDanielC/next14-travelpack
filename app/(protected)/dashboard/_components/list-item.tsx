"use client";

import Link from "next/link";

import { cn } from "@/lib/utils";
import { ListWithItems, ListWithItemsAndTheme } from "@/types";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface ListItemProps {
    list: ListWithItemsAndTheme
}

export const ListItem = ({
    list,
}: ListItemProps) => {
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
            className="space-y-4 w-full flex items-center justify-start p-1.5 h-auto"
            asChild
        >
            <Link href={`/list/${list.id}`}>
                <div className="flex flex-col w-full gap-y-1">
                    <div className="flex items-center gap-x-2">
                        <span className={cn(
                            "text-xl rounded-full flex items-center justify-center w-7 h-7",
                            `${list.theme.emojiBackground}`
                        )}>
                            {list.theme.emoji}
                        </span>
                        <span>{list.title}</span>
                    </div>
                    <div className="px-1 flex items-center gap-x-2">
                        <Progress value={(totalCountChecked(list) / list.items.length) * 100} />
                        <span className="text-xs font-normal">{totalCountChecked(list)} / {list.items.length}</span>
                    </div>
                </div>
            </Link>
        </Button>
    )
}