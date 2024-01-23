"use client";

import Link from "next/link";

import { cn } from "@/lib/utils";
import { ListWithItems, ListWithItemsAndTheme } from "@/types";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { MoreHorizontal } from "lucide-react";
import { usePathname } from "next/navigation";

interface ListItemProps {
    list: ListWithItemsAndTheme,
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
                "space-y-4 w-full flex items-center justify-start p-1.5 h-auto dark:bg-stone-800",
                pathname === `/list/${list.id}` && "bg-stone-300/80 dark:bg-stone-700/80"
            )}
            asChild
        >
            <Link href={`/list/${list.id}`}>
                <div className="flex flex-col w-full gap-y-1">
                    <div className="flex items-center gap-x-2">
                        <span className={cn(
                            "text-2xl rounded-full flex items-center justify-center w-10 h-10",
                            `${list.theme.emojiBackground} ${size === "sm" && "text-xl w-7 h-7"}`
                        )}>
                            {list.theme.emoji}
                        </span>
                        <span className="text-md">{list.title}</span>
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