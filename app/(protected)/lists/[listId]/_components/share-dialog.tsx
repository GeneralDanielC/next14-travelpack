"use client";

import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from "@/components/ui/popover";
import { ListComplete } from "@/types";
import { Share, User2Icon } from "lucide-react";
import { ListShareUnshareForm } from "./list-share-unshare-form";
import { ListShareForm } from "./list-share-form";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { BsCopy } from "react-icons/bs";
import { useState } from "react";

interface ShareDialogProps {
    list: ListComplete;
    userIsNotOwnerOfList?: boolean;
}

export const ShareDialog = ({
    list,
    userIsNotOwnerOfList
}: ShareDialogProps) => {
    const [shareUrl, setShareUrl] = useState(`${process.env.NEXT_PUBLIC_APP_URL}/preview/${list.userId}/${list.id}`);

    return (
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
    )
}