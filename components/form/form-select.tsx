"use client";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Category, Item, List, Theme } from "@prisma/client";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import { FormErrors } from "./form-errors";
import { Label } from "@/components/ui/label";

type editableOptions = {
    id: string;
    displayName: string;
    value: boolean;
}

interface FormSelectProps {
    id: string;
    data: Category[] | editableOptions[];
    selectLabel?: string;
    className?: string;
    placeholder?: string;
    errors?: Record<string, string[] | undefined>;
    label?: string;
    defaultValue?: string;
}

export const FormSelect = ({
    id,
    data,
    selectLabel,
    className,
    placeholder,
    errors,
    label,
    defaultValue,
}: FormSelectProps) => {
    const { pending } = useFormStatus();
    const [selectDataId, setSelectedDataId] = useState<string | undefined>(defaultValue);

    return (
        <>
            <Select
                onValueChange={(e) => setSelectedDataId(e)}
                disabled={pending}
                defaultValue={selectDataId}
            >
                {label && (
                    <Label htmlFor={id} className="text-xs font-semibold w-full">
                        {label}
                    </Label>
                )}
                <SelectTrigger className={className}>
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup id={id}>
                        {selectLabel && (
                            <SelectLabel>{selectLabel}</SelectLabel>
                        )}
                        {data.map((d) => (
                            <SelectItem key={d.id} value={d.id}>{d.displayName}</SelectItem>
                        ))}

                    </SelectGroup>
                </SelectContent>
            </Select>
            <FormErrors
                id={id}
                errors={errors}
            />
            <input
                hidden
                id={id}
                name={id}
                value={selectDataId}
            />
        </>
    )
}