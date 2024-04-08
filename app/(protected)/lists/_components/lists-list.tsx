"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ListWithItemsThemeAndType, Types } from "@/types";
import { ListItem } from "../../dashboard/_components/list-item";

interface ListsListProps {
    lists: ListWithItemsThemeAndType[],
}

export const ListsList = ({
    lists,
}: ListsListProps) => {
    const sortedLists = lists.reduce<{ packing: ListWithItemsThemeAndType[]; todo: ListWithItemsThemeAndType[]; grocery: ListWithItemsThemeAndType[] }>((acc, list) => {
        if (list.type.title === Types.PACKING) acc.packing.push(list);
        else if (list.type.title === Types.TODO) acc.todo.push(list);
        else if (list.type.title === Types.GROCERY) acc.grocery.push(list);

        return acc;
    }, { packing: [], todo: [], grocery: [] });

    return (
        <Accordion type="multiple" className="w-full space-y-2">
            <AccordionItem className="border-none bg-accent rounded-md px-3" value="packing">
                <AccordionTrigger className="hover:no-underline">
                    <div className="flex flex-row gap-x-3 items-center">
                        <span className="text-2xl">📦</span>
                        <span>Packing lists</span>
                    </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-2">
                    {sortedLists.packing.map((list) => (
                        <ListItem key={list.id} list={list} />
                    ))}
                </AccordionContent>
            </AccordionItem>
            <AccordionItem className="border-none bg-accent rounded-md px-3" value="grocery">
                <AccordionTrigger className="hover:no-underline">
                    <div className="flex flex-row gap-x-3 items-center">
                        <span className="text-2xl">🍋</span>
                        <span>Grocery lists</span>
                    </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-2">
                    {sortedLists.grocery.map((list) => (
                        <ListItem key={list.id} list={list} />
                    ))}
                </AccordionContent>
            </AccordionItem>
            <AccordionItem className="border-none bg-accent rounded-md px-3" value="todo">
                <AccordionTrigger className="hover:no-underline">
                    <div className="flex flex-row gap-x-3 items-center">
                        <span className="text-2xl">✓</span>
                        <span>Todo-lists</span>
                    </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-2">
                    {sortedLists.todo.map((list) => (
                        <ListItem key={list.id} list={list} />
                    ))}
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}