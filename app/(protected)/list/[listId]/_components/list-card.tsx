"use client";

import { PlusIcon } from "@radix-ui/react-icons";
import { RxDotsHorizontal } from "react-icons/rx";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from "@/components/ui/accordion";
import {
    Card,
    CardContent,
    CardHeader
} from "@/components/ui/card";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger
} from "@/components/ui/tabs";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Form, FormField } from "@/components/ui/form";

import { CategoryWithItems, ListWithItemsThemeCategory } from "@/types";

import { ListCardHeader } from "./list-card-header";
import { ListSettingsForm } from "./list-settings-form";
import { ListCardCategory } from "./list-card-category";
import { ListCardItem } from "./list-card-item";
import { Category, Theme } from "@prisma/client";
import { FormInput } from "@/components/form/form-input";
import { Label } from "@/components/ui/label";
import { FormSubmit } from "@/components/form/form-submit";
import { Plus } from "lucide-react";
import { FormSelect } from "@/components/form/form-select";
import { ItemForm } from "./item-form";


interface ListCardProps {
    data: ListWithItemsThemeCategory;
    totalCountChecked: number;
    themes: Theme[];
    categories: Category[];
}

interface CategoriesMap {
    [key: string]: CategoryWithItems;
}

export const ListCard = ({
    data,
    totalCountChecked,
    themes,
    categories,
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

    const categoriesWithItems = Object.values(groupedItemsByCategory);

    console.log(categoriesWithItems);
    

    return (
        <Card className="w-full flex flex-col mt-2">
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
                                            <ListCardItem key={item.id} item={item} listId={data.id} />
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