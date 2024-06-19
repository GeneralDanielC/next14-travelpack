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
import { useState } from "react";
import { useFormStatus } from "react-dom";
import { FormErrors } from "./form-errors";
import { Label } from "@/components/ui/label";

type Identifiable = {
    id: string;
};

type Displayable = {
    displayName?: string;
    title?: string;
};

interface FormSelectProps<T extends Identifiable & Displayable> {
    id: string;
    data: T[];
    selectLabel?: string;
    className?: string;
    placeholder?: string;
    errors?: Record<string, string[] | undefined>;
    label?: string;
    defaultValue?: string;
}

export const FormSelect = <T extends Identifiable & Displayable>({
    id,
    data,
    selectLabel,
    className,
    placeholder,
    errors,
    label,
    defaultValue,
}: FormSelectProps<T>) => {
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
                            <SelectItem key={d.id} value={d.id}>{d.displayName || d.title }</SelectItem>
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