import { List, Item, Theme, Category, ListShare, User } from "@prisma/client";
import { ExtendedUser } from "./auth";

export type ListWithItems = List & { items: Item[] };

export type ListWithType = List & { type: Theme };

export type ListWithItemsAndTheme = List & { items: Item[], theme: Theme };

export type ListWithItemsThemeAndType = List & { items: Item[], theme: Theme | null, type: Theme };

export type ListWithItemsThemeTypeAndShares = List & { items: Item[], theme: Theme | null, type: Theme, shares: ListShare[] };

export type ListWithItemsThemeCategory = List & { items: ItemWithCategory[], theme: Theme };

export type ListWithItemsThemeCategoryAndType = List & { items: ItemWithCategory[], theme: Theme | null, type: Theme };

export type ListWithItemsThemeCategoryTypeAndShares = List & { items: ItemWithCategory[], theme: Theme | null, type: Theme, shares: ListShareWithUser[], user: ExtendedUser };

export type ListComplete = List & {
    items: ItemWithCategory[],
    theme: Theme | null,
    type: Theme,
    shares: ListShareWithUser[],
    user: User,
}

export type ListShareWithUser = ListShare & { user: User };

export type ItemWithCategory = Item & { category: Category };

export type CategoryWithItems = Category & { items: Item[] };

export type ItemWithList = Item & { list: List };

export enum Types {
    TODO = 'TODO',
    PACKING = 'PACKING',
    GROCERY = 'GROCERY'
};
