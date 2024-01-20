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


export const Sidebar = () => {
    const user = useCurrentUser();

    return (
        <div className="h-full bg-stone-200 rounded-lg p-2 w-full shadow-sm overflow-y-hidden">
            <div className="flex items-center">
                <Button variant="ghost" className="bg-stone-300/70 py-5 w-full font-bold">
                    <span className="text-2xl pr-1">🌴</span>
                    travelsize
                </Button>
            </div>

            {/* Lists & settings */}
            <div className="flex flex-col justify-between h-full pt-5 pb-10">
                {/* Lists */}
                <div>
                    <div className="font-medium text-xs flex items-center mb-1">
                        <span className="pl-4">
                            Lists
                        </span>
                        <Button asChild type="button" size="icon" variant="ghost" className="ml-auto">
                            <Link href="/list/abc">
                                <PlusIcon
                                    className="h-4 w-4"
                                />
                            </Link>
                        </Button>
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <Button
                            variant="ghost"
                            className="space-y-4 w-full flex items-center justify-start p-1.5 bg-stone-300/80 h-auto"
                            asChild
                        >
                            <Link href="/list/abc">
                                <div className="flex flex-col w-full gap-y-1">
                                    <div className="flex items-center gap-x-2">
                                        <span className="text-xl rounded-full bg-sky-100 flex items-center justify-center w-7 h-7">🎿</span>
                                        <span>Kungsberget</span>
                                    </div>
                                    <div className="px-1 flex items-center gap-x-2">
                                        <Progress value={20} />
                                        <span className="text-xs font-normal">6/30</span>
                                    </div>

                                </div>
                            </Link>
                        </Button>
                        <Button
                            variant="ghost"
                            className="space-y-4 w-full flex items-center justify-start p-1.5 h-auto"
                            asChild
                        >
                            <Link href="/list/abc">
                                <div className="flex flex-col w-full gap-y-1">
                                    <div className="flex items-center gap-x-2">
                                        <span className="text-xl rounded-full bg-emerald-50 flex items-center justify-center w-7 h-7">🌴</span>
                                        <span>Frankrike</span>
                                    </div>
                                    <div className="px-1 flex items-center gap-x-2">
                                        <Progress value={67} />
                                        <span className="text-xs font-normal">20/30</span>
                                    </div>

                                </div>
                            </Link>
                        </Button>
                        <Button
                            variant="ghost"
                            className="space-y-4 w-full flex items-center justify-start p-1.5 h-auto"
                            asChild
                        >
                            <Link href="/list/abc">
                                <div className="flex flex-col w-full gap-y-1">
                                    <div className="flex items-center gap-x-2">
                                        <span className="text-xl rounded-full bg-amber-50 flex items-center justify-center w-7 h-7">🐑</span>
                                        <span>Östhammar</span>
                                    </div>
                                    <div className="px-1 flex items-center gap-x-2">
                                        <Progress value={60} />
                                        <span className="text-xs font-normal">6/10</span>
                                    </div>

                                </div>
                            </Link>
                        </Button>
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
                                className="flex items-center gap-x-2 p-1.5 text-neutral-700 rounded-md hover:bg-neutral-500/10 transition text-start no-underline hover:no-underline"
                            >
                                <div className="flex items-center gap-x-2">
                                    <span className="text-xl rounded-full bg-stone-100/80 flex items-center justify-center w-7 h-7">
                                        <IoIosCog />
                                    </span>                                    <span className="font-medium text-sm">
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
                                    <Link href="/settings">
                                        <Avatar className="h-5 w-5">
                                            <AvatarImage src={user?.image || ""} />
                                            <AvatarFallback className="bg-stone-100/80">
                                                <FaUser />
                                            </AvatarFallback>
                                        </Avatar>
                                        <span>User Settings</span>
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
                                        <span className="text-xl rounded-full bg-stone-100/80 flex items-center justify-center w-7 h-7">
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