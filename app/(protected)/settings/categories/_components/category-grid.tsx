"use client";

import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

import { useState } from "react";
import { CategoryUpdateForm } from "./category-update-form";
import { CategoryWithItems } from "@/types";

interface CategoryGridProps {
    filteredCategories: CategoryWithItems[],
}

export const CategoryGrid = ({ filteredCategories }: CategoryGridProps) => {

    const [selectedCategory, setSelectedCategory] = useState<CategoryWithItems | null>(null);

    const openDialog = (category: CategoryWithItems) => {
        setSelectedCategory(category);
    };

    const closeDialog = () => {
        setSelectedCategory(null);
    };

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
            {filteredCategories.map((category) => (
                <Button
                    key={category.id}
                    variant="outline"
                    className="justify-start"
                    onClick={() => openDialog(category)}
                >
                    <span>{category.displayName}</span>
                </Button>
            ))}
            {selectedCategory && (
                <AlertDialog
                    open={true} onOpenChange={closeDialog}
                >
                    <AlertDialogTrigger asChild>
                        <Button key={selectedCategory.id} variant="outline" className="justify-start"
                        >
                            <span>{selectedCategory.displayName}</span>
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Edit <i>{selectedCategory.displayName}</i></AlertDialogTitle>
                            <AlertDialogDescription className="flex flex-col">
                                Make changes to your category here. 
                                <span className="text-xs">{!selectedCategory.removable && `This category is unremovable. You can only change the name to a similar one.`}</span>
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <CategoryUpdateForm category={selectedCategory} closeDialog={closeDialog} />

                    </AlertDialogContent>
                </AlertDialog>
            )}
        </div>
    )
}