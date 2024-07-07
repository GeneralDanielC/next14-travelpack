"use client";

import { Button } from "@/components/ui/button"
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { PlusIcon } from "@radix-ui/react-icons"
import { ListForm } from "./list-form"
import { Theme } from "@prisma/client"
import { useState } from "react"

interface ListFormDrawerProps {
    themes: Theme[],
    types: Theme[],
    children: React.ReactNode,
}

export const ListFormDrawer = ({
    themes,
    types,
    children,
}: ListFormDrawerProps) => {
    const [open, setOpen] = useState(false);

    return (
        <Drawer open={open} onOpenChange={setOpen}
        >
            <DrawerTrigger asChild>
                {children}
            </DrawerTrigger>
            <DrawerContent className="pb-10 px-4 border-none">
                <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader>
                        <DrawerTitle className="text-center">New List</DrawerTitle>
                        <DrawerDescription className="text-center">Create a list that fits your desires.</DrawerDescription>
                    </DrawerHeader>
                    <ListForm themes={themes} types={types} setOpen={setOpen} />
                </div>
            </DrawerContent>
        </Drawer>
    )
}