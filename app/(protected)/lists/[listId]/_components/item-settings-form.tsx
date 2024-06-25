"use client";

import { deleteItem } from "@/actions/delete-item";
import { updateItem } from "@/actions/update-item";
import { FormInput } from "@/components/form/form-input";
import { FormSelect } from "@/components/form/form-select";
import { FormSubmit } from "@/components/form/form-submit";
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger
} from "@/components/ui/drawer";
import { useAction } from "@/hooks/use-action";
import { Category, Item } from "@prisma/client";
import { MoreVertical, Plus } from "lucide-react";
import { ElementRef, useRef, useState } from "react";
import { toast } from "sonner";

interface ItemSettingsForm {
    item: Item;
    categories?: Category[];
    listTypeId: string;
}

export const ItemSettingsForm = ({
    item,
    categories,
    listTypeId,
}: ItemSettingsForm) => {
    const formRef = useRef<ElementRef<"form">>(null);
    const [open, setOpen] = useState(false);

    const acceptableCategories = categories?.filter(category => category.listTypeId === listTypeId);

    const { execute: executeUpdate, fieldErrors } = useAction(updateItem, {
        onSuccess: (data) => {
            toast.success(`Item "${data.title}" updated.`);
            setOpen(false);
        },
        onError: (error) => {
            toast.error(error);
        }
    });

    const { execute: executeDelete } = useAction(deleteItem, {
        onSuccess: (data) => {
            toast.success(`Item "${data.title}" deleted.`);
            setOpen(false);
        },
        onError: (error) => {
            toast.error(error);
        }
    });

    const handleUpdate = (formData: FormData) => {
        const title = formData.get("title") as string;
        const quantity = formData.get("quantity") as string;
        const categoryId = formData.get("categoryId") as string;
        const listId = formData.get("listId") as string;
        const itemId = formData.get("itemId") as string;

        executeUpdate({
            title,
            quantity: quantity !== "" ? parseInt(quantity) : 0,
            categoryId,
            listId,
            itemId,
        });
    }

    const handleDelete = (formData: FormData) => {
        const listId = formData.get("listId") as string;
        const itemId = formData.get("itemId") as string;

        executeDelete({
            listId,
            itemId,
        });
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Button
                    size="icon"
                    variant="ghost"
                >
                    <MoreVertical className="h-4 w-4" />
                </Button>
            </DrawerTrigger>
            <DrawerContent className="pb-10 px-4">
                <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader>
                        <DrawerTitle>Edit {item.title}</DrawerTitle>
                        <DrawerDescription>Edit your list item.</DrawerDescription>
                    </DrawerHeader>
                    <form
                        ref={formRef}
                        action={handleUpdate}
                    >
                        <div className="flex flex-col items-center my-5 px-1 gap-2 w-full">
                            <FormInput
                                id="title"
                                type="text"
                                label="Title"
                                className="w-full border-none bg-stone-100 dark:bg-stone-800"
                                placeholder="Title"
                                defaultValue={item.title}
                                errors={fieldErrors}
                            />
                            <FormInput
                                id="quantity"
                                label="Quantity"
                                className="w-full border-none bg-stone-100 dark:bg-stone-800"
                                placeholder="Quantity"
                                type="number"
                                min={0}
                                defaultValue={item.quantity || undefined}
                                errors={fieldErrors}
                            />
                            <FormSelect
                                id="categoryId"
                                className="border-none bg-stone-100 dark:bg-stone-800"
                                selectLabel="Category"
                                data={acceptableCategories}
                                placeholder="Category"
                                label="Category"
                                defaultValue={item.categoryId}
                                errors={fieldErrors}
                            />
                            <input
                                id="listId"
                                name="listId"
                                hidden
                                value={item.listId}
                            />
                            <input
                                id="itemId"
                                name="itemId"
                                hidden
                                value={item.id}
                            />
                            <FormSubmit className="w-full mt-5">
                                Save
                            </FormSubmit>
                        </div>
                    </form>
                    <form action={handleDelete}>
                        <input
                            id="listId"
                            name="listId"
                            hidden
                            value={item.listId}
                        />
                        <input
                            id="itemId"
                            name="itemId"
                            hidden
                            value={item.id}
                        />
                        <FormSubmit
                            variant="ghost"
                            className="text-rose-500 font-extrabold w-full hover:bg-rose-500/10 hover:text-rose-500 hover:border-rose-500/70 hover:border flex items-center"
                        >
                            Delete
                        </FormSubmit>
                    </form>
                </div>
            </DrawerContent>
        </Drawer>
    )
}