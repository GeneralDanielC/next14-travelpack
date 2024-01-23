"use client";

import { createItem } from "@/actions/create-item";
import { FormInput } from "@/components/form/form-input"
import { FormSelect } from "@/components/form/form-select"
import { FormSubmit } from "@/components/form/form-submit"
import { useAction } from "@/hooks/use-action";
import { Category, List } from "@prisma/client"
import { Plus } from "lucide-react"
import { ElementRef, useRef } from "react";
import { toast } from "sonner";

interface ItemFormProps {
    categories: Category[];
    list: List;
}

export const ItemForm = ({
    categories,
    list,
}: ItemFormProps) => {
    const formRef = useRef<ElementRef<"form">>(null);

    const { execute, fieldErrors } = useAction(createItem, {
        onSuccess: (data) => {
            toast.success(`Item "${data.title}" created.`);
            formRef.current?.reset();
        },
        onError: (error) => {
            toast.error(error);
        },
    });

    const handleSubmit = (formData: FormData) => {
        const title = formData.get("title") as string;
        const categoryId = formData.get("categoryId") as string;
        const quantity = formData.get("quantity") as string;
        const listId = formData.get("listId") as string;

        execute({
            title,
            categoryId,
            quantity: parseInt(quantity),
            listId
        });
    }

    return (
        <form
            ref={formRef}
            action={handleSubmit}
        >
            <div className="flex flex-row items-center gap-x-2 my-10">
                <FormInput
                    id="title"
                    type="text"
                    className="w-full border-none bg-stone-100 dark:bg-stone-800"
                    placeholder="Title"
                    errors={fieldErrors}
                />
                <FormSelect
                    id="categoryId"
                    className="border-none bg-stone-100 dark:bg-stone-800"
                    selectLabel="Category"
                    data={categories}
                    placeholder="Select a category"
                    errors={fieldErrors}
                />
                <FormInput
                    id="quantity"
                    className="w-full border-none bg-stone-100 dark:bg-stone-800"
                    placeholder="Quantity"
                    type="number"
                    min={0}
                    errors={fieldErrors}
                />
                <input
                    id="listId"
                    name="listId"
                    hidden
                    value={list.id}
                />
                <FormSubmit size="icon" className="w-full">
                    <Plus className="w-5 h-5" />
                </FormSubmit>
            </div>
        </form>
    )
}