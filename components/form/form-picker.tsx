"use client";

import { Theme } from "@prisma/client";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import { Check } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';

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
    setValue?: React.Dispatch<React.SetStateAction<string>>;
    pagnation?: boolean;
}

export const FormPicker = ({
    id,
    errors,
    data,
    defaultValue,
    size,
    label,
    setValue,
    pagnation,
}: FormPickerProps) => {
    const { pending } = useFormStatus();

    const [datas, setDatas] = useState<Array<Theme>>(data);
    const [selectedDataId, setSelectedDataId] = useState<string | null>(defaultValue || null);

    return (
        <div className="relative">
            {label && (
                <Label className="text-xs">
                    {label}
                </Label>
            )}
            <div className={cn(
                "grid grid-cols-2 sm:grid-cols-3 gap-x-4",
                size === "sm" && "grid-cols-3"
            )}>
                {datas?.map((data) => (
                    <div key={data.id} className="flex flex-col justify-center items-center gap-y-2 mb-3">
                        <div
                            className={cn(
                                "cursor-pointer relative aspect-square group hover:opacity-75 transition",
                                pending && "opacity-50 hover:opacity-50 cursor-auto rounded-full"
                            )}
                            onClick={() => {
                                if (pending) return;
                                setSelectedDataId(data.id);
                                setValue && setValue(data.title);
                            }}
                        >
                            <input
                                type="radio"
                                id={id}
                                name={id}
                                hidden
                                checked={selectedDataId === data.id}
                                disabled={pending}
                                value={data.id}
                                className="hidden"
                            />
                            <span
                                className={cn(
                                    "text-6xl rounded-full h-full flex items-center justify-center w-full p-4 shadow-xl",
                                    `${size === "sm" && "text-3xl p-3"}`,
                                    data.emojiBackground,
                                    `dark:${data.emojiBackground}/50`
                                )}
                            >
                                {data.emoji}
                            </span>
                            {selectedDataId === data.id && (
                                <div className="absolute inset-y-0 h-full w-full bg-stone-700/20 backdrop-blur-[1px] flex items-center justify-center rounded-full">
                                    <Check className="h-4 w-4 text-white" />
                                </div>
                            )}
                        </div>
                        <span className="text-stone-500/80 dark:text-stone-100 text-xs text-center">
                            {data.title}
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