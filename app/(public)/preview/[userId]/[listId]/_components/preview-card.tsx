"use client";

import { CardNavigation } from "@/app/(protected)/_components/card-navigation";
import { ItemForm } from "@/app/(protected)/lists/[listId]/_components/item-form";
import { ListCardCategory } from "@/app/(protected)/lists/[listId]/_components/list-card-category";
import { ListCardHeader } from "@/app/(protected)/lists/[listId]/_components/list-card-header";
import { ListCardItem } from "@/app/(protected)/lists/[listId]/_components/list-card-item";
import { ListSettingsForm } from "@/app/(protected)/lists/[listId]/_components/list-settings-form";
import { Accordion } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CategoryWithItems, ListComplete, ListWithItemsThemeCategoryTypeAndShares } from "@/types";
import { useState } from "react";
import { PreviewItem } from "./preview-item";

interface PreviewCardProps {
    data: ListComplete;
    totalCountChecked: number;
}

interface CategoriesMap {
    [key: string]: CategoryWithItems;
}

export const PreviewCard = ({
    data,
    totalCountChecked
}: PreviewCardProps) => {

    const groupedItemsByCategory = data.items.reduce<CategoriesMap>((acc, item) => {
        const categoryId = item.category.id;

        if (!acc[categoryId]) {
            acc[categoryId] = {
                ...item.category,
                items: [],
            }
        }
        acc[categoryId].items.push(item);
        return acc;
    }, {});

    const categoriesWithItems = Object.values(groupedItemsByCategory).sort((a, b) => {
        if (a.displayName.toLowerCase() < b.displayName.toLowerCase()) {
            return -1;
        }
        if (a.displayName.toLowerCase() > b.displayName.toLowerCase()) {
            return 1;
        }
        return 0;
    });

    return (
        <Card className="w-full h-full flex flex-col rounded-l-3xl rounded-r-none shadow-none border-none">
            <CardNavigation hideUser />
            <ListCardHeader list={data} totalCountChecked={totalCountChecked} hideButtons />
            <CardContent className="overflow-y-scroll max-h-full">
                {/* List render (incl. items and categories) */}
                <Accordion
                    type="multiple"
                    className="w-full"
                >
                    {/* Map categories */}
                    {categoriesWithItems.map((category) => (
                        <ListCardCategory key={category.id} category={category}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4">
                                {category.items.map((item) => (
                                    <PreviewItem key={item.id} item={item} />
                                ))}
                            </div>
                        </ListCardCategory>
                    ))}
                </Accordion>
            </CardContent>
        </Card>
    )
}