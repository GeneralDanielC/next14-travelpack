"use client";

import { resetCategory } from "@/actions/reset-category";
import { updateCategory } from "@/actions/update-category";
import { FormInput } from "@/components/form/form-input";
import { FormSubmit } from "@/components/form/form-submit";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAction } from "@/hooks/use-action";
import { Category } from "@prisma/client";
import { ArrowRightIcon } from "lucide-react";
import { ElementRef, useRef } from "react";
import { toast } from "sonner";

interface CategoryFormProps {
    category: Category,
    toggleDialog: () => void;
}

export const CategoryForm = ({
    category,
    toggleDialog
}: CategoryFormProps) => {
    const formRef = useRef<ElementRef<"form">>(null);

    const { execute: executeUpdate, fieldErrors } = useAction(updateCategory, {
        onSuccess: (data) => {
            toast.success(`Category "${data.displayName}" updated.`);
            formRef.current?.reset();
            toggleDialog();
        },
        onError: (error) => {
            toast.error(error);
            formRef.current?.reset();
        }
    });

    const { execute: executeReset } = useAction(resetCategory, {
        onSuccess: (data) => {
            toast.success(`Category "${data.displayName}" was reset.`);
            formRef.current?.reset();
            toggleDialog();
        },
        onError: (error) => {
            toast.error(error);
        }
    });

    const handleUpdate = (formData: FormData) => {
        const displayName = formData.get("displayName") as string;
        const workName = formData.get("workName") as string;
        const categoryId = formData.get("categoryId") as string;

        executeUpdate({
            displayName,
            workName,
            categoryId,
        });
    }
    const handleReset = (formData: FormData) => {
        const categoryId = formData.get("categoryId") as string;

        executeReset({
            categoryId,
        });
    }

    return (
        <>
            <form
                ref={formRef}
                action={handleUpdate}
                className="flex flex-col gap-y-3"
            >
                <FormInput
                    id="displayName"
                    type="text"
                    placeholder="Category"
                    errors={fieldErrors}
                    label="Display Name"
                    autofocus={false}
                    defaultValue={category.displayName}
                />
                <input
                    id="categoryId"
                    name="categoryId"
                    hidden
                    value={category.id}
                />
                <input
                    id="workName"
                    name="workName"
                    hidden
                    value={category.workName}
                />
                {category.workName !== category.displayName && (
                    <div className="flex flex-row justify-around items-center bg-accent p-1.5 rounded-lg">
                        <span className="line-through text-xs">{category.workName}</span>
                        <ArrowRightIcon className="size-4" />
                        <div className="flex flex-col justify-center items-center">
                            <i className="text-xs text-rose-500">New!</i>
                            <span className="text-xs">{category.displayName}</span>
                        </div>
                    </div>
                )}
                <div className="flex flex-row-reverse items-center justify-between">
                    <FormSubmit className="">
                        Save
                    </FormSubmit>

                </div>

            </form>
            <form
                ref={formRef}
                action={handleReset}
            >
                <input
                    id="categoryId"
                    name="categoryId"
                    hidden
                    value={category.id}
                />
                <FormSubmit
                    variant="destructive"
                >
                    Reset
                </FormSubmit>
            </form>
        </>
    );
}