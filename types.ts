import { List, Item, Theme, Category } from "@prisma/client";

export type ListWithItems = List & { items: Item[] };

export type ListWithType = List & { type: Theme };

export type ListWithItemsAndTheme = List & { items: Item[], theme: Theme };

export type ListWithItemsThemeAndType = List & { items: Item[], theme: Theme | null, type: Theme };

export type ListWithItemsThemeCategory = List & { items: ItemWithCategory[], theme: Theme };

export type ListWithItemsThemeCategoryAndType = List & { items: ItemWithCategory[], theme: Theme | null, type: Theme };

export type ItemWithCategory = Item & { category: Category };

export type CategoryWithItems = Category & { items: Item[] };

export type ItemWithList = Item & { list: List };

export enum Types {
    TODO = 'TODO',
    PACKING = 'PACKING',
    GROCERY = 'GROCERY'
};
