import { CategoryWorkNames } from "@/types";

interface initialCategoriesProps {
    userId: string,
    listTypePackingId: string,
    listTypeGroceryId: string,
    listTypeTodoId: string,
}

export const initialCategories = ({
    userId,
    listTypePackingId,
    listTypeGroceryId,
    listTypeTodoId,
}: initialCategoriesProps) => [
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
    //-------------------
    {
        displayName: "Fruit & Vegetables",
        workName: CategoryWorkNames.FRUIT,
        userId,
        listTypeId: listTypeGroceryId,
    },
    {
        displayName: "Dairy",
        workName: CategoryWorkNames.DAIRY,
        userId,
        listTypeId: listTypeGroceryId,
    },
    {
        displayName: "Bakery",
        workName: CategoryWorkNames.BAKERY,
        userId,
        listTypeId: listTypeGroceryId,
    },
    {
        displayName: "Meat & Seafood",
        workName: CategoryWorkNames.MEAT_SEAFOOD,
        userId,
        listTypeId: listTypeGroceryId,
    },
    {
        displayName: "Frozen Foods",
        workName: CategoryWorkNames.FROZEN,
        userId,
        listTypeId: listTypeGroceryId,
    },
    {
        displayName: "Beverages",
        workName: CategoryWorkNames.BEVERAGES,
        userId,
        listTypeId: listTypeGroceryId,
    },
    {
        displayName: "Pantry Staples",
        workName: CategoryWorkNames.PANTRY,
        userId,
        listTypeId: listTypeGroceryId,
    },
    {
        displayName: "Deli",
        workName: CategoryWorkNames.DELI,
        userId,
        listTypeId: listTypeGroceryId,
    },
    {
        displayName: "Health & Beauty",
        workName: CategoryWorkNames.HEALTH_BEAUTY,
        userId,
        listTypeId: listTypeGroceryId,
    },
    {
        displayName: "Household Essentials",
        workName: CategoryWorkNames.HOUSEHOLD_ESSENTIALS,
        userId,
        listTypeId: listTypeGroceryId,
    },
    {
        displayName: "Snacks",
        workName: CategoryWorkNames.SNACKS,
        userId,
        listTypeId: listTypeGroceryId,
    },
    {
        displayName: "International Foods",
        workName: CategoryWorkNames.INTERNATIONAL,
        userId,
        listTypeId: listTypeGroceryId,
    },
    {
        displayName: "Baby Products",
        workName: CategoryWorkNames.BABY_PRODUCTS,
        userId,
        listTypeId: listTypeGroceryId,
    },
    {
        displayName: "Miscellaneous",
        workName: CategoryWorkNames.MISC,
        userId,
        listTypeId: listTypeGroceryId,
    },
    //-------
    {
        displayName: "Uncategorized",
        workName: CategoryWorkNames.UNCATEGORIZED,
        userId,
        listTypeId: listTypeTodoId,
    },
    {
        displayName: "High Priority",
        workName: CategoryWorkNames.HIGH_PRIO,
        userId,
        listTypeId: listTypeTodoId,
    },
    {
        displayName: "Medium Priority",
        workName: CategoryWorkNames.MED_PRIO,
        userId,
        listTypeId: listTypeTodoId,
    },
    {
        displayName: "Low Priority",
        workName: CategoryWorkNames.LOW_PRIO,
        userId,
        listTypeId: listTypeTodoId,
    },
];