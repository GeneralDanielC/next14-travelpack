"use client";

import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Category } from "@prisma/client";

interface ListCardCategoryProps {
    children: React.ReactNode;
    category: Category;
}

export const ListCardCategory = ({
    children,
    category,
}: ListCardCategoryProps) => {
    return (
        <AccordionItem value={category.id} className="border-none mb-2">
            <AccordionTrigger
                className="flex items-center gap-x-2 p-1.5 text-neutral-700 rounded-md hover:bg-neutral-500/10 transition text-start no-underline hover:no-underline bg-stone-100"
            >
                <div className="w-full flex flex-row justify-between items-center">
                    <span>{category.name}</span>
                    <span>6 / 10</span>
                </div>
            </AccordionTrigger>
            <AccordionContent className="pt-1">
                {children}
            </AccordionContent>
        </AccordionItem>
    )
}