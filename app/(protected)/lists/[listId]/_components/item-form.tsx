"use client";

import { createItem } from "@/actions/create-item";
import { FormInput } from "@/components/form/form-input"
import { FormSelect } from "@/components/form/form-select"
import { FormSubmit } from "@/components/form/form-submit"
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAction } from "@/hooks/use-action";
import { SuggestionWithCategoryAndTheme } from "@/types";
import { Category, List } from "@prisma/client"
import { Plus } from "lucide-react"
import { ElementRef, useRef, useState } from "react";
import { toast } from "sonner";

interface ItemFormProps {
    categories: Category[];
    list: List;
    userHasEditingRights?: boolean;
    suggestions: SuggestionWithCategoryAndTheme[];
}

export const ItemForm = ({
    categories,
    list,
    userHasEditingRights,
    suggestions
}: ItemFormProps) => {
    const formRef = useRef<ElementRef<"form">>(null);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const [searchTerm, setSearchTerm] = useState("");

    const { execute, fieldErrors } = useAction(createItem, {
        onSuccess: (data) => {
            toast.success(`Item "${data.title}" created.`);
            formRef.current?.reset();
            setSearchTerm("");
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

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    }

    const filteredSuggestions = suggestions.filter((suggestion) => {
        if (!searchTerm.trim()) return true; // return all categories if search term is empty.

        return suggestion.title.toLowerCase().includes(searchTerm.toLowerCase());
    });

    return (
        <>
            {userHasEditingRights && (
                <form
                    ref={formRef}
                    action={handleSubmit}
                    className="my-4"
                >
                    <div className="flex flex-row px-1 gap-x-2 w-full">
                        <div className="flex flex-col w-full gap-y-2">
                            <FormInput
                                id="title"
                                type="text"
                                className="w-full border-none bg-stone-100 dark:bg-stone-800"
                                placeholder="Title"
                                errors={fieldErrors}
                                onFocus={() => setShowSuggestions(true)}
                                onBlur={() => setShowSuggestions(false)}
                                onChange={handleSearchChange}
                                autofocus={false}
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
                            {false && ( // suggestions to come...
                                <div className="w-full border-[1px] border-black rounded-md p-2">
                                    {filteredSuggestions.map((suggestion) => (
                                        <Button
                                            key={suggestion.id}
                                            className="w-full justify-between"
                                            variant="ghost"
                                            size="sm"
                                            type="button"
                                        >
                                            <span>{suggestion.title}</span>
                                            <Badge className="bg-stone-500/60">
                                                {suggestion.category.displayName}
                                            </Badge>
                                        </Button>
                                    ))}

                                </div>
                            )}
                        </div>
                        <FormSubmit size="icon">
                            <Plus className="w-5 h-5" />
                        </FormSubmit>
                    </div>
                </form>
            )}
        </>
    )
}