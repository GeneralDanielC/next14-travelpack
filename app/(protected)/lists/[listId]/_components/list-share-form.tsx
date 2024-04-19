"use client";

import { createListShare } from "@/actions/create-list-share";
import { FormInput } from "@/components/form/form-input";
import { FormSelect } from "@/components/form/form-select";
import { FormSubmit } from "@/components/form/form-submit";
import { useAction } from "@/hooks/use-action";
import { PlusIcon } from "lucide-react";
import { ElementRef, useRef } from "react";
import { toast } from "sonner";

interface ListShareFormProps {
    listId: string,
}

export const ListShareForm = ({
    listId,
}: ListShareFormProps) => {
    const formRef = useRef<ElementRef<"form">>(null);

    const { execute, fieldErrors } = useAction(createListShare, {
        onSuccess: (data) => {
            toast.success(`List shared successfully.`);
            formRef.current?.reset();
        },
        onError: (error) => {
            toast.error(error);
        }
    })

    const handleSubmit = (formData: FormData) => {
        const userEmail = formData.get("email") as string;
        const canEditString = formData.get("canEdit") as string;
        const canEdit = canEditString === "can-edit" ? true : false;        

        execute({
            listId,
            userEmail,
            canEdit
        })
    }

    const editableOptions = [
        {
            id: "can-edit",
            displayName: "Can Edit",
            value: true,
        },
        {
            id: "read-only",
            displayName: "Read-only",
            value: false,
        }
    ];

    return (
        <form
            action={handleSubmit}
            ref={formRef}
            className="w-full flex flex-row items-center gap-x-2"
        >
            <FormInput
                id="email"
                type="email"
                placeholder="john@example.com"
                errors={fieldErrors}
                autofocus={false}
            />
            <FormSelect
                id="canEdit"
                placeholder="Permission"
                errors={fieldErrors}
                data={editableOptions}
            />
            <FormSubmit
            >
                <PlusIcon />
            </FormSubmit>
        </form>
    )
}