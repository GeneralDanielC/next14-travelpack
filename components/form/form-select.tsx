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

interface FormSelectProps {
    id: string;
    data: Category[];
    selectLabel?: string;
    className?: string;
    placeholder?: string;
    errors?: Record<string, string[] | undefined>;
}

export const FormSelect = ({
    id,
    data,
    selectLabel,
    className,
    placeholder,
    errors,
}: FormSelectProps) => {
    const { pending } = useFormStatus();
    const [selectDataId, setSelectedDataId] = useState<string | undefined>();

    return (
        <>
            <Select
                onValueChange={(e) => setSelectedDataId(e)}
                disabled={pending}
            >
                <SelectTrigger className={className}>
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup id={id}>
                        {selectLabel && (
                            <SelectLabel>{selectLabel}</SelectLabel>
                        )}
                        {data.map((d) => (
                            <SelectItem value={d.id}>{d.name}</SelectItem>
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