import { Button } from "@/components/ui/button"
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { PlusIcon } from "@radix-ui/react-icons"
import { ListForm } from "./list-form"
import { Theme } from "@prisma/client"

interface ListFormDrawerProps {
    themes: Theme[],
    triggerVariant?: "default" | "link" | "destructive" | "outline" | "secondary" | "ghost" | "filled" | null | undefined;
}

export const ListFormDrawer = ({
    themes,
    triggerVariant = "outline",
}: ListFormDrawerProps) => {    
    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button variant={triggerVariant} size="icon">
                    <PlusIcon />
                </Button>
            </DrawerTrigger>
            <DrawerContent className="pb-10 px-4">
                <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader>
                        <DrawerTitle>Create List</DrawerTitle>
                        <DrawerDescription>Create a new list.</DrawerDescription>
                    </DrawerHeader>
                    <ListForm data={themes} />
                </div>
            </DrawerContent>
        </Drawer>
    )
}