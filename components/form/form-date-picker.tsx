"use client";

import { Dispatch, SetStateAction } from "react"
import { CalendarIcon } from "lucide-react";

import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

import { dateToLocaleString } from "@/lib/date";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { useFormStatus } from "react-dom";

interface FormDatePickerProps {
    id: string;
    date: Date | undefined;
    setDate: Dispatch<SetStateAction<Date | undefined>>;
    label?: string;
    className?: string;
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
} 

export const FormDatePicker = ({
    id,
    date,
    setDate,
    label,
    className,
    variant = "outline"
}: FormDatePickerProps) => {
    const { pending } = useFormStatus();

    return (
        <Popover>
            <PopoverTrigger asChild>
                <div className="space-y-1 w-full">
                    <div className="flex flex-col gap-y-2">
                        {label && (
                            <Label
                                className="text-xs "
                            >
                                {label}
                            </Label>
                        )}
                        <Button
                            variant={variant}
                            className={cn(
                                "flex flex-row justify-start",
                                className
                            )}
                            type="button"
                            disabled={pending}
                        >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? dateToLocaleString(date) : <span>Pick a departure date</span>}
                        </Button>
                    </div>
                </div>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    id={id}
                    mode="single"
                    selected={date}
                    onSelect={(date) => setDate(date)}
                    disabled={(date) =>
                        date < new Date()
                    }
                />
            </PopoverContent>
        </Popover>
    )
}