"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Category } from "@prisma/client";
import { useState } from "react";
import { CategoryUpdateForm } from "./category-update-form";
import { CategoryCreateForm } from "./category-create-form";

interface CategoryGridProps {
    filteredCategories: Category[],
}

export const CategoryGrid = ({ filteredCategories }: CategoryGridProps) => {
    const [openDialogs, setOpenDialogs] = useState<Record<string, boolean>>({});

    const toggleDialog = (categoryId: string) => {
        setOpenDialogs(prev => ({ ...prev, [categoryId]: !prev[categoryId] }));
    };

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
            {filteredCategories.map((category) => (
                <Dialog
                    key={category.id}
                    open={openDialogs[category.id]} onOpenChange={() => toggleDialog(category.id)}
                >
                    <DialogTrigger asChild>
                        <Button key={category.id} variant="outline" className="justify-start"
                        >
                            <span>{category.displayName}</span>
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Edit <i>{category.displayName}</i></DialogTitle>
                            <DialogDescription>
                                Make changes to your category here.
                            </DialogDescription>
                        </DialogHeader>
                        <CategoryUpdateForm category={category} toggleDialog={() => toggleDialog(category.id)} />
                    </DialogContent>
                </Dialog>
            ))}
        </div>
    )
}