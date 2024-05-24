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
import { ArrowLeft, BookAIcon, Home, HomeIcon, LayoutDashboard, ListChecksIcon, LogOutIcon, SunIcon } from "lucide-react";
import { ListComplete } from "@/types";
import { ListFormDrawer } from "../dashboard/_components/list-form-drawer";
import { NoLists } from "./no-lists";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface SidebarProps {
    lists: ListComplete[],
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
    const pathname = usePathname();

    const isSmallScreen = window.innerWidth < 640;

    const [isExpanded, setIsExpanded] = useState(true);
    const [width, setWidth] = useState("10rem");
    const [paddingLeft, setPaddingLeft] = useState("0");
    const [rotate, setRotate] = useState(0);

    useEffect(() => {
        // This function adjusts the sidebar based on the initial viewport size
        function adjustSidebarForViewport() {
            const shouldCollapse = window.innerWidth < 640;
            setIsExpanded(!shouldCollapse);
            setWidth(shouldCollapse ? "2.5rem" : "10rem");
            setRotate(shouldCollapse ? 180 : 0);
        }

        // Run once on component mount
        adjustSidebarForViewport();

        // Add event listener for window resize if you want to adjust the sidebar dynamically when resizing
        window.addEventListener('resize', adjustSidebarForViewport);

        return () => window.removeEventListener('resize', adjustSidebarForViewport);
    }, []);

    const toggleSidebar = () => {
        if (isExpanded) {
            setWidth("2.5rem");
            setRotate(180);
        } else {
            setWidth("10rem");
            setRotate(0);
        }
        setIsExpanded(!isExpanded);
    }

    return (
        <div className="flex flex-row h-full items-center justify-center px-2 sm:px-4">
            <motion.div
                className="w-40 shrink-0 h-full"
                // animate={{ transform: `translateX(${isExpanded ? 1:0.25})` }} 
                animate={{ width }}
            // transition={{ type: "spring", stiffness: 100, damping: 10 }}
            >
                <motion.div
                    className={cn(
                        "h-full rounded-lg py-4 w-full overflow-y-hidden",
                    )}
                    animate={{ width, paddingLeft }}
                // transition={{ type: "spring" }}
                >
                    <div className="flex flex-col justify-between h-full">
                        {/* Lists & settings */}
                        <div className="flex flex-col justify-start h-full pt-5 pb-10 space-y-8">
                            <Button asChild>
                                <Link href="/dashboard">
                                    <div className="flex flex-row justify-center items-center gap-x-1">
                                        <span className="text-xl">🍋</span>
                                        {isExpanded && <span>travelsize</span>}
                                    </div>
                                </Link>
                            </Button>

                            {/* Button container */}
                            <div className="flex flex-col gap-y-1.5">
                                <Button
                                    variant="ghost"
                                    size="lg"
                                    className={cn(
                                        "px-3",
                                        pathname === "/dashboard" && "bg-accent"
                                    )}
                                    asChild
                                >
                                    <Link href="/dashboard">
                                        <div className="w-full flex justify-start items-center gap-x-1.5">
                                            <HomeIcon className="size-4" />
                                            {isExpanded && <span>Dashboard</span>}
                                        </div>
                                    </Link>
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="lg"
                                    className={cn(
                                        "px-3",
                                        pathname.includes("/lists") && "bg-accent"
                                    )}
                                    asChild
                                >
                                    <Link href="/lists">
                                        <div className="w-full flex justify-start items-center gap-x-1.5">
                                            <ListChecksIcon className="size-4" />
                                            {isExpanded && <span>Lists</span>}
                                        </div>
                                    </Link>
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="lg"
                                    className={cn(
                                        "px-3",
                                        pathname === "/settings/categories" && "bg-accent"
                                    )}
                                    asChild
                                >
                                    <Link href="/settings/categories">
                                        <div className="w-full flex justify-start items-center gap-x-1.5">
                                            <BookAIcon className="size-4" />
                                            {isExpanded && <span>Categories</span>}
                                        </div>
                                    </Link>
                                </Button>
                                <ThemeToggle showText={isExpanded && true} />
                                <LogoutButton>
                                    <Button
                                        variant="ghost"
                                        size="lg"
                                        className="px-3 w-full"
                                    >
                                        <div className="w-full flex justify-start items-center gap-x-1.5">
                                            <LogOutIcon className="size-4" />
                                            {isExpanded && <span>Logout</span>}
                                        </div>
                                    </Button>
                                </LogoutButton>
                            </div>
                        </div>
                        <Button
                            variant="ghost"
                            size="lg"
                            className="px-3 w-full"
                            onClick={toggleSidebar}
                        >
                            <div className="w-full flex justify-start items-center gap-x-1.5">
                                <motion.div
                                    animate={{ rotate }}
                                // transition={{ type: "spring" }}
                                >
                                    <ArrowLeft className="size-4" />
                                </motion.div>
                                {isExpanded && <span>Collapse</span>}
                            </div>
                        </Button>
                    </div>
                </motion.div>

            </motion.div>
            {/* <Button
                variant="ghost"
                size="icon"
                onClick={toggleSidebar}
            >
                <motion.div
                    animate={{ rotate }}
                    transition={{ type: "spring" }}
                >
                    <ArrowLeft />
                </motion.div>
            </Button> */}
        </div>

    )
}