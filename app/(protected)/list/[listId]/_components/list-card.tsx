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
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Form, FormField } from "@/components/ui/form";

import { CategoryWithItems, ListWithItemsThemeCategory } from "@/types";

import { ListCardHeader } from "./list-card-header";
import { ListSettingsForm } from "./list-settings-form";
import { ListCardCategory } from "./list-card-category";
import { ListCardItem } from "./list-card-item";


interface ListCardProps {
    data: ListWithItemsThemeCategory;
    totalCountChecked: number;
}

interface CategoriesMap {
    [key: string]: CategoryWithItems;
}

export const ListCard = ({
    data,
    totalCountChecked,
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

    return (
        <Card className="w-full">
            <ListCardHeader data={data} totalCountChecked={totalCountChecked} />
            <CardContent>
                <Tabs defaultValue="list">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="list">List</TabsTrigger>
                        <TabsTrigger value="settings">Settings</TabsTrigger>
                    </TabsList>
                    <TabsContent value="list">
                        {/* Add new item */}
                        {/* <Form>
                            <form onSubmit={() => { }}>
                                <div className="flex flex-row items-center gap-x-2 my-10">
                                    <Input
                                        className="border-none bg-stone-100"
                                        placeholder="Hoodies"
                                        type="text"
                                    />
                                    <Select>
                                        <SelectTrigger className="bg-stone-100 border-none">
                                            <SelectValue placeholder="Select a category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Categories</SelectLabel>
                                                <SelectItem value="1">Clothes</SelectItem>
                                                <SelectItem value="2">Electronics</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    <Input
                                        className="border-none bg-stone-100 w-24"
                                        placeholder="Quantity"
                                        type="number"
                                        min={0}
                                    />
                                    <Button size="icon" className="w-full">
                                        <PlusIcon />
                                    </Button>

                                </div>
                            </form>
                        </Form> */}


                        {/* List render (incl. items and categories) */}
                        <Accordion
                            type="multiple"
                            className="w-full"
                        >
                            {/* Map categories */}
                            {categoriesWithItems.map((category) => (
                                <ListCardCategory key={category.id} category={category}>
                                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-4">
                                        {category.items.map((item) => (
                                            <ListCardItem key={item.id} item={item} />
                                        ))}
                                    </div>
                                </ListCardCategory>
                            ))}
                        </Accordion>
                    </TabsContent>
                    <TabsContent value="settings">
                        <ListSettingsForm />
                    </TabsContent>
                </Tabs>

            </CardContent>
        </Card>
    )
}