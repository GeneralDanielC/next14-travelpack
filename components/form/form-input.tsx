"use client";

import { forwardRef } from "react";
import { useFormStatus } from "react-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

import { FormErrors } from "./form-errors";

interface FormInputProps {
    id: string;
    label?: string;
    type?: string;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    errors?: Record<string, string[] | undefined>;
    className?: string;
    defaultValue?: string | number | readonly string[] | undefined;
    onBlur?: () => void;
    onFocus?: () => void;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    min?: number;
    max?: number;
    autofocus?: boolean;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(({
    id,
    label,
    type,
    placeholder,
    required,
    disabled,
    errors,
    className,
    defaultValue = "",
    onBlur,
    onFocus,
    onChange,
    min,
    max,
    autofocus
}, ref) => {
    const { pending } = useFormStatus();

    return (
        <div className="space-y-2 w-full">
            <div className="space-y-1">
                {label ? (
                    <Label
                        htmlFor={id}
                        className="text-xs font-semibold"
                    >
                        {label}
                    </Label>
                ) : null}
                <Input
                    onBlur={onBlur}
                    onFocus={onFocus}
                    onChange={onChange}
                    defaultValue={defaultValue || ""}
                    ref={ref}
                    required={required}
                    name={id}
                    id={id}
                    placeholder={placeholder}
                    type={type}
                    disabled={pending}
                    className={cn(
                        "text-sm px-4 py-1",
                        className
                    )}
                    aria-describedby={`${id}-error`}
                    min={min}
                    max={max}
                    autoFocus={autofocus}
                />
            </div>
            <FormErrors
                id={id}
                errors={errors}
            />
        </div>
    )
});

FormInput.displayName = "FormInput";