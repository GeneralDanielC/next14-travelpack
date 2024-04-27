import { List, Item, Theme, Category, ListShare, User, Suggestion } from "@prisma/client";
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

export type SuggestionWithCategoryAndTheme = Suggestion & { category: Category, themes: Theme[] };


export enum Types {
    TODO = 'TODO',
    PACKING = 'PACKING',
    GROCERY = 'GROCERY'
};

export enum ThemeNames {
    BEACH = "Beach Vacation",
    COUNTRYSIDE = "Countryside",
    GETAWAY = "Getaway",
    BOATING = "Boating Trip",
    NATURE = "Nature Adventure",
    SKIING = "Skiing Holiday"
}

export enum CategoryWorkNames {
    MISC = "miscellaneous",
    CLOTHING = "clothing",
    OUTDOOR = "outdoor clothes & gear",
    TOILETRIES = "toiletries",
    ELECTRONICS = "electronics",
    FOODDRINKS = "food & drinks",
    ACCESSORIES = "accessories",
    FOOTWEAR = "footwear",
    DOCUMENTS = "travel documents",
    PETS = "pet supplies",
    BABY = "baby supplies",
    MONEY = "money & finances",
    MAKEUP = "make-up",
    TRAINING = "training gear",
}