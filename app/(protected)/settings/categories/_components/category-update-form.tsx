"use client";

import { resetCategory } from "@/actions/reset-category";
import { updateCategory } from "@/actions/update-category";
import { FormInput } from "@/components/form/form-input";
import { FormSubmit } from "@/components/form/form-submit";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAction } from "@/hooks/use-action";
import { ArrowRightIcon } from "lucide-react";
import { ElementRef, useRef, useState } from "react";
import { toast } from "sonner";
import lodash from "lodash";
import { deleteCategory } from "@/actions/delete-category";
import { AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter } from "@/components/ui/alert-dialog";
import { useFormStatus } from "react-dom";
import { CategoryWithItems } from "@/types";

interface CategoryUpdateFormProps {
    category: CategoryWithItems,
    closeDialog: () => void;
}

export const CategoryUpdateForm = ({
    category,
    closeDialog
}: CategoryUpdateFormProps) => {
    const { pending } = useFormStatus();

    const [displayName, setDisplayName] = useState(category.displayName);

    const updateFormRef = useRef<ElementRef<"form">>(null);
    const resetFormRef = useRef<ElementRef<"form">>(null);
    const deleteFormRef = useRef<ElementRef<"form">>(null);

    const { execute: executeUpdate, fieldErrors } = useAction(updateCategory, {
        onSuccess: (data) => {
            toast.success(`Category "${data.displayName}" updated.`);
            updateFormRef.current?.reset();
            closeDialog();
        },
        onError: (error) => {
            toast.error(error);
            updateFormRef.current?.reset();
        }
    });

    const { execute: executeReset } = useAction(resetCategory, {
        onSuccess: (data) => {
            toast.success(`The category "${data.displayName}" has been reset.`);
            resetFormRef.current?.reset();
            closeDialog();
        },
        onError: (error) => {
            toast.error(error);
        }
    });

    const { execute: executeDelete } = useAction(deleteCategory, {
        onSuccess: (data) => {
            toast.success(`Category "${data.displayName}" has been deleted.`);
            deleteFormRef.current?.reset();
            closeDialog();
        },
        onError: (error) => {
            toast.error(error);
        }
    });

    const handleUpdate = () => {

        executeUpdate({
            displayName,
            workName: category.workName,
            categoryId: category.id,
        });
    }
    const handleReset = () => {
        executeReset({
            categoryId: category.id,
        });
    }

    const handleDelete = () => {
        if (category.removable && category.items) {
            executeDelete({
                categoryId: category.id,
                removable: category.removable,
            });
        } else {
            toast.error("This category has list items. Please remove all items in order to remove this category.")
        }
    }    

    return (
        <div className="flex flex-col gap-y-3">
            <form
                ref={updateFormRef}
                action={handleUpdate}
                className="flex flex-col gap-y-3"
            >
                <FormInput
                    id="displayName"
                    type="text"
                    placeholder="Category"
                    errors={fieldErrors}
                    label="Category Name"
                    autofocus={false}
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                />
                <button type="submit" id={`update-submit-button-${category.id}`} hidden />
            </form>

            {category.originalName.toLowerCase() !== category.displayName.toLowerCase() && (
                <div className="flex flex-col items-center w-full justify-center">
                    <div className="flex flex-row justify-around items-center w-full bg-accent p-1.5 rounded-lg">
                        <div className="flex flex-col justify-center items-center">
                            <span className="text-xs font-semibold">Original</span>
                            <span className="line-through text-xs">{lodash.startCase(category.originalName)}</span>
                        </div>
                        <ArrowRightIcon className="size-4" />
                        <div className="flex flex-col justify-center items-center">
                            <i className="text-xs text-rose-500">New!</i>
                            <span className="text-xs">{category.displayName}</span>
                        </div>
                    </div>
                    <form
                        ref={resetFormRef}
                        action={handleReset}
                    >
                        <FormSubmit
                            variant="link"
                            className="text-center text-xs underline hover:font-bold"
                        >
                            Reset Category
                        </FormSubmit>
                    </form>
                </div>
            )}
            <div className="flex flex-row gap-x-2 items-center justify-between">
                {category.removable && (
                    <form
                        ref={deleteFormRef}
                        action={handleDelete}
                    >
                        <FormSubmit
                            variant="link"
                            className="w-full text-center text-red-500"
                        >
                            Delete
                        </FormSubmit>
                    </form>
                )}
            </div>
            <AlertDialogFooter>
                <AlertDialogCancel onClick={closeDialog}>Cancel</AlertDialogCancel>
                <AlertDialogAction
                    onClick={() => {
                        document.getElementById(`update-submit-button-${category.id}`)?.click();
                        handleUpdate();
                    }}
                    disabled={pending}
                >
                    Save
                </AlertDialogAction>
            </AlertDialogFooter>
        </div>
    );
}