"use client";

import { Logo } from "@/components/logo"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { PlusIcon } from "@radix-ui/react-icons"
import Image from "next/image"
import Link from "next/link"
import { IoIosCog } from "react-icons/io"
import { ExitIcon } from "@radix-ui/react-icons";
import { LogoutButton } from "@/components/auth/logout-button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FaUser } from "react-icons/fa"
import { useCurrentUser } from "@/hooks/use-current-user"
import { List, Theme } from "@prisma/client";
import { ListItem } from "../dashboard/_components/list-item";
import { Home, LayoutDashboard } from "lucide-react";
import { ListWithItemsThemeAndType } from "@/types";
import { ListFormDrawer } from "../dashboard/_components/list-form-drawer";
import { NoLists } from "./no-lists";

interface SidebarProps {
    lists: ListWithItemsThemeAndType[],
    themes: Theme[],
    types: Theme[],
    showLogo?: boolean
}

export const Sidebar = ({
    lists,
    themes,
    types,
    showLogo,
}: SidebarProps) => {
    const user = useCurrentUser();

    return (
        <div className="h-full rounded-lg p-2 w-full shadow-md bg-stone-500/50 overflow-y-hidden">
            {showLogo && (
                <div className="flex items-center">
                    <Button variant="ghost" className="bg-stone-300/70 py-5 w-full font-bold " asChild>
                        <Link href="/dashboard">
                            <span className="text-2xl pr-1">🌴</span>
                            <span>travelsize</span>
                        </Link>
                    </Button>
                </div>
            )}

            {/* Lists & settings */}

            <div className="flex flex-col justify-between h-full pt-5 pb-10">
                <div className="flex flex-col gap-y-2">
                    <Button
                        size="lg"
                        variant="ghost"
                        className="text-white"
                    >
                        Dashboard
                    </Button>
                    <Button
                        size="lg"
                        variant="ghost"
                        className="text-white"
                    >
                        Lists
                    </Button>
                </div>
                {/* Lists */}
                <div>
                    <div className="font-medium text-xs flex flex-col justify-center mb-1">
                        <span className="pl-2 text-xl font-bold text-white">
                            Lists
                        </span>
                        {/* <ListFormDrawer themes={themes} types={types} /> */}
                    </div>
                    <div className="flex flex-col gap-y-2 h-[200px] overflow-y-scroll">
                        {lists?.length > 0 ? lists.map((list) => (
                            <ListItem key={list.id} list={list} size="sm" />
                        )) : <NoLists />}
                    </div>
                </div>
                {/* Settings */}
                <div>
                    <Accordion
                        type="single"
                        className="space-y-2"
                    >
                        <AccordionItem
                            value="settings"
                            className="border-none"
                        >
                            <AccordionTrigger
                                className="flex items-center gap-x-2 p-1.5 rounded-md hover:bg-neutral-500/10 transition text-start no-underline hover:no-underline"
                            >
                                <div className="flex items-center gap-x-2">
                                    <span className="text-xl rounded-full bg-stone-100/80 dark:bg-stone-500/80 flex items-center justify-center w-7 h-7">
                                        <IoIosCog />
                                    </span>
                                    <span className="text-sm">
                                        Settings
                                    </span>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent
                                className="pt-1"
                            >
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="w-full font-normal justify-start pl-10 mb-1 gap-x-2"
                                    asChild
                                >
                                    <Link href="/settings/user">
                                        <Avatar className="h-5 w-5">
                                            <AvatarImage src={user?.image || ""} />
                                            <AvatarFallback className="bg-stone-100/80 dark:bg-stone-500/80">
                                                <FaUser />
                                            </AvatarFallback>
                                        </Avatar>
                                        <span>User Settings</span>
                                    </Link>
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="w-full font-normal justify-start pl-10 mb-1 gap-x-2"
                                    asChild
                                >
                                    <Link href="/settings/categories">

                                        <span>Categories</span>
                                    </Link>
                                </Button>
                                <ThemeToggle />
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                    <LogoutButton>
                        <Button
                            variant="ghost"
                            className="space-y-4 w-full flex items-center justify-start p-1.5 h-auto"
                            asChild
                        >
                            <div>
                                <div className="flex flex-col w-full gap-y-1">
                                    <div className="flex items-center gap-x-2">
                                        <span className="text-xl rounded-full bg-stone-100/80 dark:bg-stone-500/80 flex items-center justify-center w-7 h-7">
                                            <ExitIcon />
                                        </span>

                                        <span>Logout</span>
                                    </div>
                                </div>
                            </div>
                        </Button>
                    </LogoutButton>
                </div>
            </div>
        </div>

    )
}