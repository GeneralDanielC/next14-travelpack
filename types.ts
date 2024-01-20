import { List, Item, Theme, Category } from "@prisma/client";

export type ListWithItems = List & { items: Item[] };

export type ListWithItemsAndTheme = List & { items: Item[], theme: Theme };

export type ListWithItemsThemeCategory = List & { items: ItemWithCategory[], theme: Theme };

export type ItemWithCategory = Item & { category: Category };

export type CategoryWithItems = Category & { items: Item[] };

export type ItemWithList = Item & { list: List };