"use client";

import { Accordion } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger
} from "@/components/ui/tabs";


import { CategoryWithItems, ListWithItemsThemeCategoryAndType } from "@/types";

import { ListCardHeader } from "./list-card-header";
import { ListSettingsForm } from "./list-settings-form";
import { ListCardCategory } from "./list-card-category";
import { ListCardItem } from "./list-card-item";
import { Category, Theme } from "@prisma/client";
import { ItemForm } from "./item-form";
import { CardHeader } from "@/app/(protected)/_components/card-header";
import { ExtendedUser } from "@/auth";


interface ListCardProps {
    data: ListWithItemsThemeCategoryAndType;
    totalCountChecked: number;
    themes: Theme[];
    categories: Category[];
    user: ExtendedUser;
}

interface CategoriesMap {
    [key: string]: CategoryWithItems;
}

export const ListCard = ({
    data,
    totalCountChecked,
    themes,
    categories,
    user,
}: ListCardProps) => {

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
            <CardHeader 
                user={user}
                breadcrumbs={[
                    {
                        name: "Lists",
                        href: "/lists",
                    },
                    {
                        name: data.title,
                        href: `/lists/${data.id}`,
                    }
                ]}
            />
            <ListCardHeader data={data} totalCountChecked={totalCountChecked} />
            <CardContent className="overflow-y-scroll max-h-full">
                <Tabs defaultValue="list">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="list">List</TabsTrigger>
                        <TabsTrigger value="settings">Settings</TabsTrigger>
                    </TabsList>
                    <TabsContent value="list" className="h-full flex flex-col overflow-y-scroll">
                        {/* Add new item */}

                        <ItemForm categories={categories} list={data} />

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
                                            <ListCardItem key={item.id} item={item} listId={data.id} categories={categories} />
                                        ))}
                                    </div>
                                </ListCardCategory>
                            ))}
                        </Accordion>
                    </TabsContent>
                    <TabsContent value="settings" className="h-full flex flex-col overflow-y-scroll">
                        <ListSettingsForm data={data} themes={themes} />
                    </TabsContent>
                </Tabs>

            </CardContent>
        </Card>
    )
}