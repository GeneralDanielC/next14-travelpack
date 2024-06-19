"use client";

import { useState } from "react";
import { Category } from "@prisma/client";

import { Input } from "@/components/ui/input";
import { CategoryGrid } from "./category-grid";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

interface CategoryCommandProps {
    categories: {
        packingCategories: Category[],
        groceryCategories: Category[],
        todoCategories: Category[],
    }
}

export const CategoryCommand = ({
    categories: {
        packingCategories,
        groceryCategories,
        todoCategories
    }
}: CategoryCommandProps) => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    }

    const filterCategories = (categories: Category[]) => {
        if (!searchTerm.trim()) return categories;
        return categories.filter(category => category.displayName.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    const filteredPackingCategories = filterCategories(packingCategories);
    const filteredGroceryCategories = filterCategories(groceryCategories);
    const filteredTodoCategories = filterCategories(todoCategories);

    return (
        <div className="space-y-2">
            <div>
                <Input
                    placeholder="Search for a category..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>
            {filteredGroceryCategories.length === 0 && filteredPackingCategories.length === 0 && filteredTodoCategories.length === 0 && (
                <div className="w-full text-center">
                    <span className="text-xs">No matching categories were found.</span>
                </div>
            )}
            <div className="flex flex-col gap-y-2">
            {groceryCategories.length > 0 && (
                <>
                    <span className="text-xs">Groceries</span>
                    <CategoryGrid filteredCategories={filteredGroceryCategories} />
                </>
            )}
            {packingCategories.length > 0 && (
                <>
                    <span className="text-xs">Packing</span>
                    <CategoryGrid filteredCategories={filteredPackingCategories} />
                </>
            )}
            {todoCategories.length > 0 && (
                <>
                    <span className="text-xs">Todo</span>
                    <CategoryGrid filteredCategories={filteredTodoCategories} />
                </>
            )}
            </div>
        </div>
    )
}

