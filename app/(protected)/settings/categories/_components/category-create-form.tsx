"use client";

import { createCategory } from "@/actions/create-category";
import { FormInput } from "@/components/form/form-input";
import { FormSelect } from "@/components/form/form-select";
import { FormSubmit } from "@/components/form/form-submit";
import { Button } from "@/components/ui/button"
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { useAction } from "@/hooks/use-action";
import { Theme } from "@prisma/client";
import { PlusIcon } from "lucide-react"
import { ElementRef, useRef } from "react";
import { toast } from "sonner";

interface CategoryCreateFormProps {
    listTypes: Theme[],
}

export const CategoryCreateForm = ({
    listTypes,
}: CategoryCreateFormProps) => {
    const formRef = useRef<ElementRef<"form">>(null);

    const { execute, fieldErrors } = useAction(createCategory, {
        onSuccess: (data) => {
            toast.success(`Category "${data.displayName}" created.`)
            formRef.current?.reset();
        },
        onError: (error) => {
            toast.error(error);
            formRef.current?.reset();
        }
    });

    const handleSubmit = (formData: FormData) => {
        const displayName = formData.get("displayName") as string;
        const listTypeId = formData.get("listTypeId") as string;

        execute({ displayName, listTypeId });
    }

    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button className="pl-2">
                    <div className="flex flex-row gap-x-1 items-center">
                        <PlusIcon />
                        <span>New Category</span>
                    </div>
                </Button>
            </DrawerTrigger>
            <DrawerContent className="pb-10 px-4 border-none">
                <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader>
                        <DrawerTitle>Create New Category</DrawerTitle>
                        <DrawerDescription>Create a unique category tailored to your needs.</DrawerDescription>
                    </DrawerHeader>
                    <form
                        ref={formRef}
                        action={handleSubmit}
                        className="flex flex-col gap-y-2"
                    >
                        <FormInput
                            id="displayName"
                            placeholder="Something..."
                            label="Category Name"
                        />
                        <FormSelect
                            id="listTypeId"
                            data={listTypes}
                            selectLabel="List type"
                            label="List type"
                            placeholder="Select a type"
                        />
                        <FormSubmit className="w-full">Create</FormSubmit>
                    </form>
                </div>
            </DrawerContent>

        </Drawer>
    )
}