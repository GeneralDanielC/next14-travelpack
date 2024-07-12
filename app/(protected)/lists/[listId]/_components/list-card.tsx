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
import { useEffect, useRef, useState } from "react";
import { useRealtimeList } from "@/hooks/use-realtime-list";
import { UncheckAllForm } from "./uncheck-all-form";

import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { cn } from "@/lib/utils";
import { updateItemOrder } from "@/actions/update-item-order";
import { toast } from "sonner";
import { useAction } from "@/hooks/use-action";

interface ListCardProps {
    list: ListComplete;
    themes: Theme[];
    categories: Category[];
    suggestions?: SuggestionWithCategoryAndTheme[];
}

interface CategoriesMap {
    [key: string]: CategoryWithItems;
}

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
}

export const ListCard = ({
    list: passedList,
    themes,
    categories,
    suggestions,
}: ListCardProps) => {
    const user = useCurrentUser();

    const list = useRealtimeList(passedList);

    const [minimizeHeader, setMinimizeHeader] = useState<boolean>(false);
    const [openAccordions, setOpenAccordions] = useState<string[]>([]);
    const prevScrollY = useRef(0);

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

            acc[categoryId].items.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

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

    useEffect(() => {
        const initialOpenAccordions = categoriesWithItems.filter(category =>
            category.items.some(item => !item.isChecked)
        ).map(category => category.id);
        setOpenAccordions(initialOpenAccordions);
    }, [categoriesWithItems]);

    const toggleAccordion = (categoryId: string) => {
        setOpenAccordions(prev => {
            const currentIndex = prev.indexOf(categoryId);
            if (currentIndex === -1) {
                return [...prev, categoryId];
            } else {
                return prev.filter(id => id !== categoryId);
            }
        })
    }

    const handleScroll = (e: any) => {
        const currentScrollY = e.target.scrollTop;
        if (window.innerWidth <= 640 && currentScrollY > 0) {
            setMinimizeHeader(true);
        } else {
            setMinimizeHeader(false);
        }
        prevScrollY.current = currentScrollY;
    }

    const { execute: executeUpdateItemOrder } = useAction(updateItemOrder, {
        onSuccess: () => {
            toast.success("Successfully reordered items.")
        },
        onError: (error: any) => {
            toast.error(error)
        }
    })

    const onDragEnd = (result: any) => {
        const { destination, source } = result;

        // If dropped outside droppable area
        if (!destination) return;

        // If no destination or item dropped in the same place
        if (destination.droppableId === source.droppableId && destination.index === source.index) return;

        // Clone the list to prevent direct state mutation
        const newCategoriesWithItems = [...categoriesWithItems];

        // Moving item within the same category
        if (destination.droppableId === source.droppableId) {
            const categoryIndex = newCategoriesWithItems.findIndex(category => category.id === source.droppableId);
            if (categoryIndex === -1) return;

            const category = newCategoriesWithItems[categoryIndex];
            const reorderedItems = reorder(category.items, source.index, destination.index);

            newCategoriesWithItems[categoryIndex] = {
                ...category,
                items: reorderedItems
            };

        } else {
            // Moving item to a different category
            const sourceCategoryIndex = newCategoriesWithItems.findIndex(category => category.id === source.droppableId);
            const destCategoryIndex = newCategoriesWithItems.findIndex(category => category.id === destination.droppableId);

            if (sourceCategoryIndex === -1 || destCategoryIndex === -1) return;

            const sourceCategory = newCategoriesWithItems[sourceCategoryIndex];
            const destCategory = newCategoriesWithItems[destCategoryIndex];

            const sourceItems = Array.from(sourceCategory.items);
            const [movedItem] = sourceItems.splice(source.index, 1);

            const destItems = Array.from(destCategory.items);
            destItems.splice(destination.index, 0, movedItem);

            newCategoriesWithItems[sourceCategoryIndex] = {
                ...sourceCategory,
                items: sourceItems
            };
            newCategoriesWithItems[destCategoryIndex] = {
                ...destCategory,
                items: destItems
            };
        }

        // Update the order values before sending to the server
        const updatedItems = newCategoriesWithItems.flatMap(category =>
            category.items.map((item, index) => ({
                ...item,
                order: index,
                categoryId: category.id
            }))
        );

        // Update the state
        setCategoriesWithItems(newCategoriesWithItems);

        // Send the updated items to the server
        executeUpdateItemOrder({
            listId: list.id,
            items: updatedItems
        });
    };


    return (
        <Card className="w-full h-full flex flex-col rounded-l-3xl rounded-r-none shadow-none border-none">
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
                                    <DragDropContext
                                        onDragStart={() => {
                                            if (window.navigator.vibrate) {
                                                window.navigator.vibrate(100);
                                            }
                                        }}
                                        onDragEnd={onDragEnd}
                                    >
                                        <Accordion
                                            onScroll={handleScroll}
                                            type="multiple"
                                            className="h-full overflow-y-scroll"
                                            defaultValue={openAccordions}
                                        >
                                            {/* Map categories */}
                                            {categoriesWithItems.map((category) => (
                                                <ListCardCategory
                                                    key={category.id}
                                                    category={category}
                                                >
                                                    <Droppable droppableId={category.id} key={category.id} type="item" direction={window.innerWidth <= 640 ? "vertical" : undefined}>
                                                        {(provided) => (
                                                            <div
                                                                {...provided.droppableProps}
                                                                ref={provided.innerRef}

                                                                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4"
                                                            >
                                                                {category.items.map((item, index) => (
                                                                    <Draggable key={item.id} draggableId={item.id} index={index}>
                                                                        {(provided, snapshot) => (
                                                                            <div>
                                                                                <div
                                                                                    ref={provided.innerRef}
                                                                                    {...provided.draggableProps}
                                                                                    {...provided.dragHandleProps}
                                                                                    className={cn(
                                                                                        "w-full overflow-hidden",
                                                                                        snapshot.isDragging && "bg-accent/50 backdrop-blur-sm rounded-lg"
                                                                                    )}
                                                                                >
                                                                                    <ListCardItem
                                                                                        item={item}
                                                                                        listId={list.id}
                                                                                        listTypeId={category.listTypeId}
                                                                                        categories={categories}
                                                                                        userHasEditingRights={userHasEditingRights}
                                                                                        isDragging={snapshot.isDragging}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        )}
                                                                    </Draggable>
                                                                ))}
                                                                {provided.placeholder}
                                                            </div>
                                                        )}

                                                    </Droppable>
                                                </ListCardCategory>
                                            ))}
                                        </Accordion>
                                    </DragDropContext>
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

                            <div className="relative bottom-0 w-full space-y-2">
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
