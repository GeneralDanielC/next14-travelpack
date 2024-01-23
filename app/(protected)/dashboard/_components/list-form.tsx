"use client";

import { Theme } from "@prisma/client";

import { FormInput } from "@/components/form/form-input"
import { FormPicker } from "@/components/form/form-picker"
import { FormSubmit } from "@/components/form/form-submit"
import { FormDatePicker } from "@/components/form/form-date-picker"
import { useAction } from "@/hooks/use-action";
import { createList } from "@/actions/create-list";
import { toast } from "sonner";
import { ElementRef, useRef, useState } from "react";

interface ListFormProps {
    data: Theme[];
}

export const ListForm = ({
    data
}: ListFormProps) => {
    const formRef = useRef<ElementRef<"form">>(null);
    const [date, setDate] = useState<Date>();

    const { execute, fieldErrors } = useAction(createList, {
        onSuccess: (data) => {
            toast.success(`List "${data.title}" created.`);
            formRef.current?.reset();
        },
        onError: (error) => {
            toast.error(error);
        }
    });

    const handleSubmit = (formData: FormData) => {
        const title = formData.get("title") as string;
        const themeId = formData.get("themeId") as string;
        const departAt = date as Date;

        execute({
            title,
            themeId,
            departAt
        });
    }    

    return (
        <form
            ref={formRef}
            action={handleSubmit}
        >
            <FormPicker
                id="themeId"
                data={data}
                errors={fieldErrors}
            />

            <div className="flex items-center gap-x-2 mt-10 mb-2 w-full">
                <FormInput
                    id="title"
                    type="text"
                    placeholder="List title..."
                    className="w-full border-none bg-stone-100"
                    errors={fieldErrors}
                />
                <FormDatePicker
                    id="departAt"
                    date={date}
                    setDate={setDate}
                    className="w-full border-none bg-stone-100"
                />

            </div>
            <FormSubmit
                className="w-full"
                variant="outline"
            >
                Create
            </FormSubmit>
        </form>
        
    )
}