"use client";

import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CategoryWithItems } from "@/types";
import { Category } from "@prisma/client";

interface ListCardCategoryProps {
    children: React.ReactNode;
    category: CategoryWithItems;
}

export const ListCardCategory = ({
    children,
    category,
}: ListCardCategoryProps) => {
    
    let checkedItems = 0;
    category.items.map((item) => {
        if (item.isChecked) {
            checkedItems += 1;
        }
    })

    return (
        <AccordionItem value={category.id} className="border-none mb-2">
            <AccordionTrigger
                className="flex items-center gap-x-2 p-1.5 rounded-md hover:bg-neutral-500/10 transition text-start no-underline hover:no-underline bg-stone-100 dark:bg-stone-800"
            >
                <div className="w-full flex flex-row justify-between items-center">
                    <span>{category.name}</span>
                    <span>{checkedItems} / {category.items.length}</span>
                </div>
            </AccordionTrigger>
            <AccordionContent className="pt-1">
                {children}
            </AccordionContent>
        </AccordionItem>
    )
}