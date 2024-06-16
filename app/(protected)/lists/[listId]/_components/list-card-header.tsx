"use client";

import { Button } from "@/components/ui/button";
import { CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { dateToLocaleString } from "@/lib/date";
import { cn } from "@/lib/utils";
import { ListComplete, Types } from "@/types";
import { PlusIcon, Share, User2Icon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaAngleLeft } from "react-icons/fa";
import { BsCopy } from "react-icons/bs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import { ListShareForm } from "./list-share-form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FormSubmit } from "@/components/form/form-submit";
import { ListShareUnshareForm } from "./list-share-unshare-form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface ListCardHeaderProps {
    list: ListComplete;
    totalCountChecked: number;
    hideButtons?: boolean;
    userIsNotOwnerOfList?: boolean;
}

export const ListCardHeader = ({
    list,
    totalCountChecked,
    hideButtons,
    userIsNotOwnerOfList
}: ListCardHeaderProps) => {
    const pathname = usePathname();

    const [shareUrl, setShareUrl] = useState(`${process.env.NEXT_PUBLIC_APP_URL}/preview/${list.userId}/${list.id}`);

    return (
        <CardHeader>
            {!hideButtons && (
                <div className="flex flex-row justify-between items-center">
                    <Button size="sm" variant="ghost" asChild>
                        <Link href="/dashboard">
                            <FaAngleLeft className="w-4 h-4" />
                            Back
                        </Link>
                    </Button>

                    <Dialog>
                        <DialogTrigger asChild>
                            <Button
                                size="sm"
                                variant="ghost"
                            >
                                <div className="flex flex-row items-center gap-x-1">
                                    <span>Share</span>
                                    <Share className="size-4" />
                                </div>

                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Share</DialogTitle>
                                <DialogDescription>Share your list with friends and family.</DialogDescription>
                            </DialogHeader>
                            <div className="flex flex-col gap-y-5">
                                <div>
                                    {list?.shares?.length > 0 && (
                                        <div className="flex flex-row items-center gap-x-2 mb-4">

                                            <Popover>
                                                <PopoverTrigger>
                                                    <Avatar className="size-10 border border-accent">
                                                        <AvatarImage src={list.user?.image || ""} />
                                                        <AvatarFallback className="bg-stone-100 dark:bg-stone-700  rounded-full">
                                                            <User2Icon className="size-10" />
                                                        </AvatarFallback>
                                                    </Avatar>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-full">
                                                    <div className="w-full h-full flex flex-row gap-x-3 items-center">
                                                        <div>
                                                            <Avatar className="size-14">
                                                                <AvatarImage src={list?.user?.image || ""} />
                                                                <AvatarFallback className="bg-stone-100 dark:bg-stone-700 rounded-full">
                                                                    <User2Icon className="size-10" />
                                                                </AvatarFallback>
                                                            </Avatar>
                                                        </div>
                                                        <div className="flex flex-col gap-y-1">
                                                            <h1>{list?.user?.name}</h1>
                                                            <span className="text-xs">{list?.user?.email}</span>
                                                            <i className="text-xs">Owner {!userIsNotOwnerOfList && ("(me)")}</i>
                                                        </div>
                                                    </div>
                                                </PopoverContent>
                                            </Popover>
                                            {list.shares.map((share) => (
                                                <Popover key={share.id}>
                                                    <PopoverTrigger>
                                                        <Avatar className="size-10 border border-accent">
                                                            <AvatarImage src={share?.user?.image || ""} />
                                                            <AvatarFallback className="bg-stone-100 dark:bg-stone-700  rounded-full">
                                                                <User2Icon className="size-10" />
                                                            </AvatarFallback>
                                                        </Avatar>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-full">
                                                        <div className="w-full h-full flex flex-row gap-x-3 items-center">
                                                            <div>
                                                                <Avatar className="size-14">
                                                                    <AvatarImage src={share?.user?.image || ""} />
                                                                    <AvatarFallback className="bg-stone-100 dark:bg-stone-700 rounded-full">
                                                                        <User2Icon className="size-10" />
                                                                    </AvatarFallback>
                                                                </Avatar>
                                                            </div>
                                                            <div className="flex flex-col gap-y-1">
                                                                <h1>{share?.user?.name}</h1>
                                                                <span className="text-xs">{share?.user?.email}</span>
                                                                <div className="flex flex-row items-center justify-between">
                                                                    <span className="text-xs">{share?.canEdit ? "Can edit" : "Read-only"}</span>
                                                                    {!userIsNotOwnerOfList && (
                                                                        <ListShareUnshareForm share={share} />
                                                                    )}
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </PopoverContent>
                                                </Popover>

                                            ))}
                                        </div>
                                    )}
                                    <ListShareForm listId={list.id} />
                                </div>
                                <div className="w-full flex flex-row items-center gap-x-5 justify-center">
                                    <Separator className="w-32" />
                                    <span>OR</span>
                                    <Separator className="w-32" />
                                </div>
                                <div>
                                    <Button
                                        className="w-full flex flex-row gap-x-2"
                                        size="icon"
                                        onClick={() => {
                                            navigator.clipboard.writeText(shareUrl);
                                            toast.success("Link with read-only permission copied.")
                                        }}
                                    >
                                        Copy Link
                                        <BsCopy />
                                    </Button>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            )}
            <div className="flex items-center gap-x-7 pb-2">
                <span
                    className={cn(
                        "text-6xl rounded-full flex items-center justify-center w-auto p-4",
                        list.type.title === Types.PACKING ? `${list.theme?.emojiBackground}` : `${list.type.emojiBackground}`
                    )}
                >
                    {list.type.title === Types.PACKING ? list.theme?.emoji : list.type.emoji}
                </span>
                <div className="flex flex-col flex-wrap items-start justify-center w-full">
                    <div className="flex w-full items-center justify-between">
                        <h1 className="text-xl sm:text-2xl font-semibold">{list.title}</h1>
                    </div>
                    <span className="text-sm">{dateToLocaleString(list.departAt || list.createdAt)}</span>
                    <div className="pr-1 flex items-center gap-x-3 w-full">
                        <Progress value={(totalCountChecked / list.items.length) * 100} />
                        <span className="text-xs font-normal w-[50px]">{totalCountChecked} / {list.items.length}</span>
                    </div>
                </div>
            </div>
        </CardHeader>
    )
}