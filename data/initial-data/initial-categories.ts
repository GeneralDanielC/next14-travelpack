import { CategoryWorkNames } from "@/types";

export const initialCategories = (userId: string, listTypePackingId: string, listTypeGroceryId: string) => [
    {
        displayName: "Miscellaneous",
        workName: CategoryWorkNames.MISC,
        userId,
        listTypeId: listTypePackingId,
    },
    {
        displayName: "Clothing",
        workName: CategoryWorkNames.CLOTHING,
        userId,
        listTypeId: listTypePackingId,
    },
    {
        displayName: "Outdoor Clothes & Gear",
        workName: CategoryWorkNames.OUTDOOR,
        userId,
        listTypeId: listTypePackingId,
    },
    {
        displayName: "Toiletries",
        workName: CategoryWorkNames.TOILETRIES,
        userId,
        listTypeId: listTypePackingId,
    },
    {
        displayName: "Electronics",
        workName: CategoryWorkNames.ELECTRONICS,
        userId,
        listTypeId: listTypePackingId,
    },
    {
        displayName: "Food & Drinks",
        workName: CategoryWorkNames.FOODDRINKS,
        userId,
        listTypeId: listTypePackingId,
    },
    {
        displayName: "Accessories",
        workName: CategoryWorkNames.ACCESSORIES,
        userId,
        listTypeId: listTypePackingId,
    },
    {
        displayName: "Footwear",
        workName: CategoryWorkNames.FOOTWEAR,
        userId,
        listTypeId: listTypePackingId,
    },
    {
        displayName: "Travel Documents",
        workName: CategoryWorkNames.DOCUMENTS,
        userId,
        listTypeId: listTypePackingId,
    },
    {
        displayName: "Pet Supplies",
        workName: CategoryWorkNames.PETS,
        userId,
        listTypeId: listTypePackingId,
    },
    {
        displayName: "Baby Supplies",
        workName: CategoryWorkNames.BABY,
        userId,
        listTypeId: listTypePackingId,
    },
    {
        displayName: "Money & Finances",
        workName: CategoryWorkNames.MONEY,
        userId,
        listTypeId: listTypePackingId,
    },
    {
        displayName: "Make-up",
        workName: CategoryWorkNames.MAKEUP,
        userId,
        listTypeId: listTypePackingId,
    },
    {
        displayName: "Training Gear",
        workName: CategoryWorkNames.TRAINING,
        userId,
        listTypeId: listTypePackingId,
    },
];