"use client";

import { Category } from "@prisma/client";

import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Button } from "@/components/ui/button";

interface CategoryCommandProps {
    categories: Category[];
}

export const CategoryCommand = ({
    categories,
}: CategoryCommandProps) => {
    return (
        <Command className="w-full">
            <CommandInput placeholder="Search category..." />
            <CommandList>
                <CommandEmpty>No category found.</CommandEmpty>
                <CommandGroup className="grid sm:grid-cols-2 md:grid-cols-3 gap-1">
                    {categories.map((category, index) => (
                        <CommandItem key={index} className="bg-sky-300">

                            {category.displayName}
                        </CommandItem>
                    ))}
                </CommandGroup>
            </CommandList>
        </Command>
    )
}