"use client";

import { Accordion } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger
} from "@/components/ui/tabs";


import { CategoryWithItems, ListComplete, ListWithItemsThemeCategoryAndType, SuggestionWithCategoryAndTheme } from "@/types";

import { ListCardHeader } from "./list-card-header";
import { ListSettingsForm } from "./list-settings-form";
import { ListCardCategory } from "./list-card-category";
import { ListCardItem } from "./list-card-item";
import { Category, Theme } from "@prisma/client";
import { ItemForm } from "./item-form";
import { CardNavigation } from "@/app/(protected)/_components/card-navigation";
import { ExtendedUser } from "@/auth";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useState } from "react";


interface ListCardProps {
    list: ListComplete;
    totalCountChecked: number;
    themes: Theme[];
    categories: Category[];
    suggestions: SuggestionWithCategoryAndTheme[];
}

interface CategoriesMap {
    [key: string]: CategoryWithItems;
}

export const ListCard = ({
    list,
    totalCountChecked,
    themes,
    categories,
    suggestions,
}: ListCardProps) => {
    const user = useCurrentUser();

    const groupedItemsByCategory = list.items.reduce<CategoriesMap>((acc, item) => {
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

    const userIsNotOwnerOfList = list.shares.some((share) => share.userId === user?.id);

    const userHasEditingRights = !userIsNotOwnerOfList || list.shares.some((share) => share.userId === user?.id && share.canEdit);

    return (
        <Card className="w-full h-full flex flex-col rounded-l-3xl rounded-r-none shadow-none border-none">
            <CardNavigation
                user={user}
                breadcrumbs={[
                    {
                        name: "Lists",
                        href: "/lists",
                    },
                    {
                        name: list.title,
                        href: `/lists/${list.id}`,
                    }
                ]}
            />
            <ListCardHeader list={list} totalCountChecked={totalCountChecked} userIsNotOwnerOfList={userIsNotOwnerOfList} />
            <CardContent className="overflow-y-scroll max-h-full">
                <Tabs defaultValue="list">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="list">List</TabsTrigger>
                        <TabsTrigger value="settings">Settings</TabsTrigger>
                    </TabsList>
                    <TabsContent value="list" className="h-full flex flex-col overflow-y-scroll">
                        {/* Add new item */}

                        <ItemForm categories={categories} list={list} userHasEditingRights={userHasEditingRights} suggestions={suggestions} />

                        {/* List render (incl. items and categories) */}
                        <Accordion
                            type="multiple"
                            className="w-full"
                            defaultValue={categoriesWithItems.map((category) => {
                                let checkedItems = 0;
                                category.items.map((item) => {
                                    if (item.isChecked) {
                                        checkedItems += 1;
                                    }
                                })
                                
                                if (checkedItems !== category.items.length) return category.id;
                            })}
                        >
                        {/* Map categories */}
                        {categoriesWithItems.map((category) => (
                            <ListCardCategory key={category.id} category={category}>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4">
                                    {category.items.map((item) => (
                                        <ListCardItem key={item.id} item={item} listId={list.id} categories={categories} userHasEditingRights={userHasEditingRights} />
                                    ))}
                                </div>
                            </ListCardCategory>
                        ))}
                    </Accordion>
                </TabsContent>
                <TabsContent value="settings" className="h-full flex flex-col overflow-y-scroll">
                    <ListSettingsForm list={list} themes={themes} userIsNotOwnerOfList={userIsNotOwnerOfList} />
                </TabsContent>
            </Tabs>

        </CardContent>
        </Card >
    )
}