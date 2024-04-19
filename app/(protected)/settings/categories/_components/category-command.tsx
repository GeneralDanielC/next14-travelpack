"use client";

import { useState } from "react";
import { Category } from "@prisma/client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { ArrowRightIcon } from "lucide-react";
import { CategoryForm } from "./category-form";

interface CategoryCommandProps {
    categories: Category[];
}

export const CategoryCommand = ({
    categories,
}: CategoryCommandProps) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [openDialogs, setOpenDialogs] = useState<Record<string, boolean>>({});


    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    }

    const toggleDialog = (categoryId: string) => {
        setOpenDialogs(prev => ({ ...prev, [categoryId]: !prev[categoryId] }));
    };

    const filteredCategories = categories.filter((category) => {
        if (!searchTerm.trim()) return true; // return all categories if search term is empty.

        return category.displayName.toLowerCase().includes(searchTerm.toLowerCase());
    });

    return (
        <div className="space-y-2">
            <div>
                <Input
                    placeholder="Search for a category..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>
            {filteredCategories.length === 0 && (
                <div className="w-full text-center">
                    <span className="text-xs">No matching categories were found.</span>
                </div>
            )}
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
                                    Make changes to your category name here. The name needs to be similar to the original one.
                                </DialogDescription>
                            </DialogHeader>
                            <CategoryForm category={category} toggleDialog={() => toggleDialog(category.id)} />
                        </DialogContent>
                    </Dialog>
                ))}
            </div>
        </div>
    )
}