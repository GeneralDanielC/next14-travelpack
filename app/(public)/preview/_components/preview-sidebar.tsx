"use client";

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";


export const PreviewSidebar = () => {
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
                animate={{ width }}
                transition={{ type: "spring" }}
            >
                <motion.div
                    className={cn(
                        "h-full rounded-lg py-4 w-full overflow-y-hidden",
                    )}
                    animate={{ width, paddingLeft }}
                    transition={{ type: "spring" }}
                >
                    <div className="flex flex-col justify-between h-full">
                        {/* Lists & settings */}
                        <div className="flex flex-col justify-start h-full pt-5 pb-10 space-y-8">
                            <Button asChild>
                                <Link prefetch={true} href="/">
                                    <div className="flex flex-row justify-center items-center gap-x-1">
                                        <span className="text-xl">🍋</span>
                                        {isExpanded && <span>pakkit</span>}
                                    </div>
                                </Link>
                            </Button>

                            {/* Button container */}
                            <div className="flex flex-col gap-y-1.5">
                                
                                
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
                                    transition={{ type: "spring" }}
                                >
                                    <ArrowLeft className="size-4" />
                                </motion.div>
                                {isExpanded && <span>Collapse</span>}
                            </div>
                        </Button>
                    </div>
                </motion.div>

            </motion.div>
        </div>

    )
}