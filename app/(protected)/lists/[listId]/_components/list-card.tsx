"use client";

import { Accordion } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger
} from "@/components/ui/tabs";


import { CategoryWithItems, ItemWithCategory, ListComplete, ListWithItemsThemeCategoryAndType, SuggestionWithCategoryAndTheme } from "@/types";

import { ListCardHeader } from "./list-card-header";
import { ListSettingsForm } from "./list-settings-form";
import { ListCardCategory } from "./list-card-category";
import { ListCardItem } from "./list-card-item";
import { Category, Theme } from "@prisma/client";
import { ItemForm } from "./item-form";
import { CardNavigation } from "@/app/(protected)/_components/card-navigation";
import { ExtendedUser } from "@/auth";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useEffect, useState } from "react";
import { useRealtimeList } from "@/hooks/use-realtime-list";


interface ListCardProps {
    list: ListComplete;
    themes: Theme[];
    categories: Category[];
    suggestions?: SuggestionWithCategoryAndTheme[];
}

interface CategoriesMap {
    [key: string]: CategoryWithItems;
}

export const ListCard = ({
    list: passedList,
    themes,
    categories,
    suggestions,
}: ListCardProps) => {
    const user = useCurrentUser();
    const list = useRealtimeList(passedList);

    const [totalCountChecked, setTotalCountChecked] = useState(list.items.filter(item => item.isChecked).length);

    const groupItemsByCategory = (items: ItemWithCategory[]): CategoriesMap => {
        return items.reduce<CategoriesMap>((acc, item) => {
            const categoryId = item.categoryId;
            if (!acc[categoryId]) {
                acc[categoryId] = {
                    ...item.category,
                    items: [],
                };
            }
            acc[categoryId].items.push(item);
            return acc;
        }, {});
    }

    const sortCategoriesByDisplayName = (categoriesMap: CategoriesMap): CategoryWithItems[] => {
        return Object.values(categoriesMap).sort((a, b) => {
            const nameA = a.displayName.toLowerCase();
            const nameB = b.displayName.toLowerCase();
            if (nameA < nameB) return -1;
            if (nameA > nameB) return 1;
            return 0;
        });
    }

    console.log(list);

    const [groupedItemsByCategory, setGroupedItemsByCategory] = useState(groupItemsByCategory(list.items));
    const [categoriesWithItems, setCategoriesWithItems] = useState(sortCategoriesByDisplayName(groupedItemsByCategory));

    const userIsNotOwnerOfList = list.shares.some((share) => share.userId === user?.id);

    const userHasEditingRights = !userIsNotOwnerOfList || list.shares.some((share) => share.userId === user?.id && share.canEdit);

    useEffect(() => {
        setGroupedItemsByCategory(groupItemsByCategory(list.items));
        setTotalCountChecked(list.items.filter(item => item.isChecked).length);
    }, [list]);

    useEffect(() => {
        setCategoriesWithItems(sortCategoriesByDisplayName(groupedItemsByCategory));
    }, [groupedItemsByCategory]);

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
            <CardContent className="h-full max-h-full overflow-y-scroll">
                <Tabs defaultValue="list" className="max-h-full overflow-y-scroll">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="list">List</TabsTrigger>
                        <TabsTrigger value="settings">Settings</TabsTrigger>
                    </TabsList>
                    <TabsContent value="list" className="h-full flex flex-col justify-between">
                        {/* List render (incl. items and categories) */}
                        <Accordion
                            type="multiple"
                            className="h-full flex-grow overflow-y-scroll"
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
                        {/* Add new item */}
                        <div className="bg-stone-300 dark:bg-stone-700 p-2 rounded-lg w-full sticky bottom-0 flex-shrink-0">
                            <ItemForm categories={categories} list={list} userHasEditingRights={userHasEditingRights} />
                        </div>
                    </TabsContent>
                    <TabsContent value="settings" className="flex flex-col">
                        <ListSettingsForm list={list} themes={themes} userIsNotOwnerOfList={userIsNotOwnerOfList} />
                    </TabsContent>
                </Tabs>

            </CardContent>
        </Card >
    )
}