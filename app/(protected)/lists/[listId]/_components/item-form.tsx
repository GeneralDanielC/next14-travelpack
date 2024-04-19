"use client";

import { createItem } from "@/actions/create-item";
import { FormInput } from "@/components/form/form-input"
import { FormSelect } from "@/components/form/form-select"
import { FormSubmit } from "@/components/form/form-submit"
import { Separator } from "@/components/ui/separator";
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
        const listId = formData.get("listId") as string;
        const ownerUserId = formData.get("ownerUserId") as string;

        execute({
            title,
            listId,
            ownerUserId
        });
    }

    return (
        <form
            ref={formRef}
            action={handleSubmit}
        >
            <div className="flex flex-row items-center my-5 px-1 gap-2 w-full">
                <FormInput
                    id="title"
                    type="text"
                    className="w-full border-none bg-stone-100 dark:bg-stone-800"
                    placeholder="Title"
                    errors={fieldErrors}
                    autofocus
                />
                <input
                    id="listId"
                    name="listId"
                    hidden
                    value={list.id}
                />
                <input
                    id="ownerUserId"
                    name="ownerUserId"
                    hidden
                    value={list.userId}
                />
                <FormSubmit size="icon">
                    <Plus className="w-5 h-5" />
                </FormSubmit>
            </div>
        </form>
    )
}