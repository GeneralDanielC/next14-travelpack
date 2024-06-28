"use client";

import { useFormStatus } from "react-dom";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import React from "react";

interface FormSubmitProps {
    children: React.ReactNode;
    disabled?: boolean;
    className?: string;
    size?: "default" | "sm" | "lg" | "icon" | null | undefined;
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
    style?: React.CSSProperties,
    onClick?: () => void;
    onFocus?: () => void;
    onBlur?: () => void;
}


export const FormSubmit = ({
    children,
    disabled,
    className,
    size = "default",
    variant = "default",
    style,
    onClick,
    onFocus,
    onBlur
}: FormSubmitProps) => {
    const { pending } = useFormStatus();

    return (
        <Button
            disabled={pending || disabled}
            type="submit"
            variant={variant}
            size={size}
            className={cn(className)}
            style={style}
            onClick={onClick}
            onFocus={onFocus}
            onBlur={onBlur}
        >
            {children}
        </Button>
    )
}


