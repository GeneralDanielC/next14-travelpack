"use client";

import { Button } from "@/components/ui/button";
import { CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Progress } from "@/components/ui/progress";
import { dateToLocaleString } from "@/lib/date";
import { cn } from "@/lib/utils";
import { ListWithItemsThemeAndType, Types } from "@/types";
import { Share } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaAngleLeft } from "react-icons/fa";
import { BsCopy } from "react-icons/bs";

interface ListCardHeaderProps {
    data: ListWithItemsThemeAndType;
    totalCountChecked: number;
}

export const ListCardHeader = ({
    data,
    totalCountChecked
}: ListCardHeaderProps) => {
    const pathname = usePathname();

    const [shareUrl, setShareUrl] = useState(`http://localhost:3000${pathname}`);

    return (
        <CardHeader>
            <div className="flex flex-row justify-between items-center">
                <Button size="sm" variant="ghost" asChild>
                    <Link href="/dashboard">
                        <FaAngleLeft className="w-4 h-4" />
                        Back
                    </Link>
                </Button>

                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            size="sm"
                            variant="ghost"
                        >
                            Share
                            <Share className="ml-1 w-4 h-4" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                        <div className="flex w-full flex-row gap-x-1">
                            <Input
                                value={shareUrl}
                                readOnly
                            />
                            <Button
                                variant="filled"
                                size="icon"
                                onClick={() => {
                                    navigator.clipboard.writeText(shareUrl)
                                }}
                            >
                                <BsCopy />
                            </Button>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
            <div className="flex items-center gap-x-7 pb-2">
                <span
                    className={cn(
                        "text-6xl rounded-full flex items-center justify-center w-auto p-4",
                        data.type.title === Types.PACKING ? `${data.theme?.emojiBackground}` : `${data.type.emojiBackground}`
                    )}
                >
                    {data.type.title === Types.PACKING ? data.theme?.emoji : data.type.emoji}
                </span>
                <div className="flex flex-col flex-wrap items-start justify-center w-full">
                    <div className="flex w-full items-center justify-between">
                        <h1 className="text-xl sm:text-2xl font-semibold">{data.title}</h1>
                    </div>
                    <span className="text-sm">{dateToLocaleString(data.departAt || data.createdAt)}</span>
                    <div className="pr-1 flex items-center gap-x-3 w-full">
                        <Progress value={(totalCountChecked / data.items.length) * 100} />
                        <span className="text-xs font-normal w-[50px]">{totalCountChecked} / {data.items.length}</span>
                    </div>
                </div>
            </div>
        </CardHeader>
    )
}