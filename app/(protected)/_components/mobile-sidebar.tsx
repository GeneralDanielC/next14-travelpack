"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useMobileSidebar } from "@/hooks/use-mobile-sidebar";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Sidebar } from "./sidebar";
import { ListWithItemsAndTheme } from "@/types";
import { Theme } from "@prisma/client";

interface MobileSidebarProps {
    lists: ListWithItemsAndTheme[],
    themes: Theme[],
}

export const MobileSidebar = ({
    lists,
    themes,
}: MobileSidebarProps) => {
    const pathname = usePathname();
    const [isMounted, setIsMounted] = useState(false);

    const onOpen = useMobileSidebar((state) => state.onOpen);
    const onClose = useMobileSidebar((state) => state.onClose);
    const isOpen = useMobileSidebar((state) => state.isOpen);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        onClose();
    }, [pathname, onClose])

    if (!isMounted) {
        return null;
    }

    return (
        <>
            <Button
                onClick={onOpen}
                size="icon"
                variant="ghost"
                className="bg-stone-100 hover:bg-stone-50 dark:bg-stone-600"
            >
                <Menu className="w-5 h-5" />
            </Button>
            <Sheet open={isOpen} onOpenChange={onClose}>
                <SheetContent
                    side="left"
                    className="p-2 bg-transparent border-none"
                >
                    <Sidebar themes={themes} lists={lists} />
                </SheetContent>
            </Sheet>
        </>
    )
}