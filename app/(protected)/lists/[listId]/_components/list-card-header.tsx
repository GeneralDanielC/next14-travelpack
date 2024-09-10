"use client";

import { Button } from "@/components/ui/button";
import { CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { dateToLocaleString } from "@/lib/date";
import { cn } from "@/lib/utils";
import { ListComplete, Types } from "@/types";
import { Share, User2Icon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { FaAngleLeft } from "react-icons/fa";
import { BsCopy } from "react-icons/bs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import { ListShareForm } from "./list-share-form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ListShareUnshareForm } from "./list-share-unshare-form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ShareDialog } from "./share-dialog";

interface ListCardHeaderProps {
    list: ListComplete;
    totalCountChecked: number;
    hideButtons?: boolean;
    userIsNotOwnerOfList?: boolean;
    minimizeHeader?: boolean;
    showName?: boolean;
}

export const ListCardHeader = ({
    list,
    totalCountChecked,
    hideButtons,
    userIsNotOwnerOfList,
    minimizeHeader,
    showName,
}: ListCardHeaderProps) => {
    const router = useRouter();

    return (
        <CardHeader className={cn(minimizeHeader && "py-2")}>
            {minimizeHeader ? (
                <div className="w-full flex flex-col items-center justify-center gap-y-1.5">
                    <span
                        className={cn(
                            "text-3xl rounded-full flex items-center justify-center size-14 p-4",
                            list.type.title === Types.PACKING ? `${list.theme?.emojiBackground}` : `${list.type.emojiBackground}`,
                        )}>{list.type.title === Types.PACKING ? list.theme?.emoji : list.type.emoji}
                    </span>
                    <h1 className="text-md text-center font-semibold">{list.title}</h1>
                    <div className="absolute right-6">
                        <ShareDialog hideText list={list} userIsNotOwnerOfList={userIsNotOwnerOfList} />
                    </div>
                </div>
            ) : (
                <>
                    <div className="flex items-center gap-x-7 pb-2">
                        <span
                            className={cn(
                                "text-6xl rounded-full flex items-center justify-center w-auto p-4",
                                list.type.title === Types.PACKING ? `${list.theme?.emojiBackground}` : `${list.type.emojiBackground}`,
                                minimizeHeader && "text-3xl"
                            )}>{list.type.title === Types.PACKING ? list.theme?.emoji : list.type.emoji}
                        </span>
                        <div className="flex flex-col flex-wrap items-start justify-center w-full">
                            <div className="flex w-full items-center flex-row justify-between">
                                <div className="flex w-full items-center justify-between overflow-hidden max-w-[200px] sm:max-w-[300px] md:max-w-[500px]">
                                    <h1 className="text-xl sm:text-2xl font-semibold truncate">{list.title}</h1>
                                </div>
                                <ShareDialog list={list} userIsNotOwnerOfList={userIsNotOwnerOfList} />
                            </div>
                            {!minimizeHeader && (
                                <span className="text-sm">{dateToLocaleString(list.departAt || list.createdAt)}</span>
                            )}

                            <div className="pr-1 flex items-center gap-x-3 w-full">
                                <Progress value={(totalCountChecked / list.items.length) * 100} />
                                <span className="text-xs font-normal w-[50px]">{totalCountChecked} / {list.items.length}</span>
                            </div>
                            {showName && (
                                <span className="text-xs">{list.user.name}</span>
                            )}

                        </div>
                    </div>
                </>
            )}

        </CardHeader>
    )
}