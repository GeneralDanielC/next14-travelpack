"use client";

import { Accordion } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger
} from "@/components/ui/tabs";


import { CategoryWithItems, ItemWithCategory, ListComplete, SuggestionWithCategoryAndTheme } from "@/types";

import { ListCardHeader } from "./list-card-header";
import { ListSettingsForm } from "./list-settings-form";
import { ListCardCategory } from "./list-card-category";
import { ListCardItem } from "./list-card-item";
import { Category, Theme } from "@prisma/client";
import { ItemForm } from "./item-form";
import { CardNavigation } from "@/app/(protected)/_components/card-navigation";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useEffect, useState } from "react";
import { useRealtimeList } from "@/hooks/use-realtime-list";
import { UncheckAllForm } from "./uncheck-all-form";


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
            const nameA = a.displayName?.toLowerCase() || "";
            const nameB = b.displayName?.toLowerCase() || "";
            if (nameA < nameB) return -1;
            if (nameA > nameB) return 1;
            return 0;
        });
    }

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
        <Card className="w-full h-screen flex flex-col rounded-l-3xl rounded-r-none shadow-none border-none">
            <CardNavigation
                user={user}
                breadcrumbs={[
                    { name: "Lists", href: "/lists" },
                    { name: list.title, href: `/lists/${list.id}` }
                ]}
            />
            <ListCardHeader list={list} totalCountChecked={totalCountChecked} userIsNotOwnerOfList={userIsNotOwnerOfList} />
            <CardContent className="flex-1 flex flex-col overflow-hidden">
                <Tabs defaultValue="list" className="flex-1 flex-col overflow-hidden">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="list">List</TabsTrigger>
                        <TabsTrigger value="settings">Settings</TabsTrigger>
                    </TabsList>
                    <TabsContent value="list" className="flex-1 h-full pb-12 overflow-scroll">
                        <div className="flex-1 overflow-scroll flex flex-col h-full">
                            <div className="h-full overflow-y-hidden">
                                {/* List render (incl. items and categories) */}
                                {list.items.length > 0 ? (
                                    < Accordion
                                        type="multiple"
                                        className="h-full overflow-y-scroll"
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
                                                        <ListCardItem key={item.id} item={item} listId={list.id} listTypeId={category.listTypeId} categories={categories} userHasEditingRights={userHasEditingRights} />
                                                    ))}
                                                </div>
                                            </ListCardCategory>
                                        ))}
                                    </Accordion>
                                ) : (
                                    <div className="h-full overflow-y-hidden flex flex-col items-center justify-center">
                                        <span className="font-semibold">Nothing here yet.</span>
                                        <span className="text-xs">Add an item and it will show up here.</span>
                                    </div>
                                )}

                                {totalCountChecked === list.items.length && list.items.length > 0 && (
                                    <div className="w-fit ml-auto mr-0 sticky bottom-0 pb-2">
                                        <UncheckAllForm listId={list.id} />
                                    </div>
                                )}
                            </div>

                            <div className="sticky bottom-0 w-full space-y-2">
                                <div className="bg-stone-300 dark:bg-stone-700 px-2 py-[1px] rounded-lg w-full">
                                    <ItemForm categories={categories} list={list} userHasEditingRights={userHasEditingRights} />
                                </div>
                            </div>
                        </div>
                    </TabsContent>
                    <TabsContent value="settings" className="flex-1 h-full pb-12 overflow-scroll">
                        <div className="flex-1 overflow-scroll flex flex-col h-full">
                            <ListSettingsForm list={list} themes={themes} userIsNotOwnerOfList={userIsNotOwnerOfList} />
                        </div>
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card >
    )
}
