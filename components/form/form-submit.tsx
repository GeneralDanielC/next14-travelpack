"use client";

import { useFormStatus } from "react-dom";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface FormSubmitProps {
    children: React.ReactNode;
    disabled?: boolean;
    className?: string;
    size?: "default" | "sm" | "lg" | "icon" | null | undefined;
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
}


export const FormSubmit = ({
    children,
    disabled,
    className,
    size = "default",
    variant = "default",
}: FormSubmitProps) => {
    const { pending } = useFormStatus();

    return (
        <Button
            disabled={pending || disabled}
            type="submit"
            variant={variant}
            size={size}
            className={cn(className)}
        >
            {children}
        </Button>
    )
}


