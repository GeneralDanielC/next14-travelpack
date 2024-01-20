"use client";

import { CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { dateToLocaleString } from "@/lib/date";
import { cn } from "@/lib/utils";
import { ListWithItemsAndTheme } from "@/types";

interface ListCardHeaderProps {
    data: ListWithItemsAndTheme;
    totalCountChecked: number;
}

export const ListCardHeader = ({
    data,
    totalCountChecked
}: ListCardHeaderProps) => {


    return (
        <CardHeader>
            <div className="flex items-center gap-x-7 pb-2">
                <span
                    className={cn(
                        "text-6xl rounded-full flex items-center justify-center w-auto p-4",
                        data.theme.emojiBackground
                    )}
                >
                    {data.theme.emoji}
                </span>
                <div className="flex flex-col flex-wrap items-start justify-center w-full">
                    <h1 className="text-2xl font-semibold">{data.title}</h1>
                    <span className="text-sm">{dateToLocaleString(data.createdAt)}</span>
                    <div className="pr-1 flex items-center gap-x-3 w-full">
                        <Progress value={(totalCountChecked / data.items.length) * 100} />
                        <span className="text-xs font-normal w-[50px]">{totalCountChecked} / {data.items.length}</span>
                    </div>
                </div>
            </div>
        </CardHeader>
    )
}