"use client";

import { uncheckAllItems } from "@/actions/uncheck-all-items";
import { FormSubmit } from "@/components/form/form-submit";
import { useAction } from "@/hooks/use-action";
import { RotateCcw } from "lucide-react";
import { ElementRef, useRef } from "react";
import { toast } from "sonner";

interface UncheckAllFormProps {
    listId: string
}

export const UncheckAllForm = ({
    listId
}: UncheckAllFormProps) => {
    const formRef = useRef<ElementRef<"form">>(null);

    const { execute, fieldErrors } = useAction(uncheckAllItems, {
        onSuccess: (data) => {
            toast.success("Successfully unchecked all items.")
            formRef.current?.reset();
        },
        onError: (error) => {
            toast.error(error)
        }
    })

    const handleSubmit = () => {
        execute({ listId });
    }

    return (
        <form
            ref={formRef}
            action={handleSubmit}
        >
            <FormSubmit
                className="rounded-full w-fit"
            >
                <div className="flex flex-row items-center gap-x-2">
                    <RotateCcw className="size-5" />
                    <span>Reset</span>
                </div>
            </FormSubmit>
        </form>
    )
}