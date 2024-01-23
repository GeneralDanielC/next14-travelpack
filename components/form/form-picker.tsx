"use client";

import { Theme } from "@prisma/client";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

import { FormErrors } from "./form-errors";
import { Label } from "@/components/ui/label";

interface FormPickerProps {
    id: string;
    errors?: Record<string, string[] | undefined>;
    data: Theme[];
    defaultValue?: string;
    size?: "default" | "sm";
    label?: string;
}

export const FormPicker = ({
    id,
    errors,
    data,
    defaultValue,
    size,
    label,
}: FormPickerProps) => {
    const { pending } = useFormStatus();

    const [themes, setThemes] = useState<Array<Theme>>(data);
    const [selectedThemeId, setSelectedThemeId] = useState<string | null>(defaultValue || null);

    return (
        <div className="relative">
            {label && (
                <Label className="text-xs">
                    {label}
                </Label>
            )}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4">

                {themes?.map((theme) => (
                    <div className="flex flex-col justify-center items-center gap-y-2">
                        <div
                            key={theme.id}
                            className={cn(
                                "cursor-pointer relative aspect-square group hover:opacity-75 transition",
                                pending && "opacity-50 hover:opacity-50 cursor-auto rounded-full"
                            )}
                            onClick={() => {
                                if (pending) return;
                                setSelectedThemeId(theme.id);
                            }}
                        >
                            <input
                                type="radio"
                                id={id}
                                name={id}
                                hidden
                                checked={selectedThemeId === theme.id}
                                disabled={pending}
                                value={theme.id}
                                className="hidden"
                            />
                            <span
                                className={cn(
                                    "text-6xl rounded-full h-full flex items-center justify-center w-full p-4 shadow-xl",
                                    `${theme.emojiBackground} ${size === "sm" && "text-3xl p-3"}`
                                )}
                            >
                                {theme.emoji}
                            </span>
                            {selectedThemeId === theme.id && (
                                <div className="absolute inset-y-0 h-full w-full bg-stone-700/20 flex items-center justify-center rounded-full">
                                    <Check className="h-4 w-4 text-white" />
                                </div>
                            )}
                        </div>
                        <span className="text-stone-500/80 dark:text-stone-100 text-sm">
                            {theme.title}
                        </span>
                    </div>
                ))}

            </div>
            <FormErrors
                id="theme"
                errors={errors}
            />
        </div>
    )
}