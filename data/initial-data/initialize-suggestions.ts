import { CategoryWorkNames, ThemeNames } from "@/types";
import { Theme } from "@prisma/client";

type ThemeIdMap = { [title: string]: string };
type CategoryIdMap = { [workName: string]: string };

export const initialSuggestions = (userId: string, themeIdsByTitle: ThemeIdMap, categoryMap: CategoryIdMap, themes: Theme[]) => [
    {
        userId,
        themeIds: [themeIdsByTitle[ThemeNames.BEACH], themeIdsByTitle[ThemeNames.BOATING]],
        title: "Swimwear",
        categoryId: categoryMap[CategoryWorkNames.CLOTHING]
    },
    {
        userId,
        themeIds: themes.map(theme => theme.id),
        title: "Pants",
        categoryId: categoryMap[CategoryWorkNames.CLOTHING]
    },
    {
        userId,
        themeIds: themes.map(theme => theme.id),
        title: "Jeans",
        categoryId: categoryMap[CategoryWorkNames.CLOTHING]
    },
    {
        userId,
        themeIds: [themeIdsByTitle[ThemeNames.BEACH], themeIdsByTitle[ThemeNames.COUNTRYSIDE], themeIdsByTitle[ThemeNames.GETAWAY], themeIdsByTitle[ThemeNames.BOATING]],
        title: "Dresses",
        categoryId: categoryMap[CategoryWorkNames.CLOTHING]
    },
    {
        userId,
        themeIds: themes.map(theme => theme.id),
        title: "Underwear",
        categoryId: categoryMap[CategoryWorkNames.CLOTHING]
    },
    {
        userId,
        themeIds: themes.map(theme => theme.id),
        title: "Panties",
        categoryId: categoryMap[CategoryWorkNames.CLOTHING]
    },
    {
        userId,
        themeIds: [themeIdsByTitle[ThemeNames.GETAWAY]],
        title: "Lingerie",
        categoryId: categoryMap[CategoryWorkNames.CLOTHING]
    },
    {
        userId,
        themeIds: themes.map(theme => theme.id),
        title: "Socks",
        categoryId: categoryMap[CategoryWorkNames.CLOTHING]
    },
    {
        userId,
        themeIds: themes.map(theme => theme.id),
        title: "Shirts",
        categoryId: categoryMap[CategoryWorkNames.CLOTHING]
    },
    {
        userId,
        themeIds: [themeIdsByTitle[ThemeNames.BEACH], themeIdsByTitle[ThemeNames.COUNTRYSIDE], themeIdsByTitle[ThemeNames.GETAWAY], themeIdsByTitle[ThemeNames.BOATING], themeIdsByTitle[ThemeNames.NATURE]],
        title: "Skirts",
        categoryId: categoryMap[CategoryWorkNames.CLOTHING]
    },
    {
        userId,
        themeIds: [themeIdsByTitle[ThemeNames.BEACH], themeIdsByTitle[ThemeNames.COUNTRYSIDE], themeIdsByTitle[ThemeNames.GETAWAY], themeIdsByTitle[ThemeNames.BOATING], themeIdsByTitle[ThemeNames.NATURE]],
        title: "Shorts",
        categoryId: categoryMap[CategoryWorkNames.CLOTHING]
    },
    {
        userId,
        themeIds: themes.map(theme => theme.id),
        title: "Sweaters",
        categoryId: categoryMap[CategoryWorkNames.CLOTHING]
    },
    {
        userId,
        themeIds: themes.map(theme => theme.id),
        title: "Tights",
        categoryId: categoryMap[CategoryWorkNames.CLOTHING]
    },
    {
        userId,
        themeIds: themes.map(theme => theme.id),
        title: "Sweatpants",
        categoryId: categoryMap[CategoryWorkNames.CLOTHING]
    },
    {
        userId,
        themeIds: themes.map(theme => theme.id),
        title: "Hoodies",
        categoryId: categoryMap[CategoryWorkNames.CLOTHING]
    },
    {
        userId,
        themeIds: [themeIdsByTitle[ThemeNames.GETAWAY]],
        title: "Suits",
        categoryId: categoryMap[CategoryWorkNames.CLOTHING]
    },
    {
        userId,
        themeIds: [themeIdsByTitle[ThemeNames.COUNTRYSIDE], themeIdsByTitle[ThemeNames.GETAWAY], themeIdsByTitle[ThemeNames.BOATING], themeIdsByTitle[ThemeNames.NATURE], themeIdsByTitle[ThemeNames.SKIING]],
        title: "Cardigans",
        categoryId: categoryMap[CategoryWorkNames.CLOTHING]
    },
    {
        userId,
        themeIds: themes.map(theme => theme.id),
        title: "Tops",
        categoryId: categoryMap[CategoryWorkNames.CLOTHING]
    },
    {
        userId,
        themeIds: [themeIdsByTitle[ThemeNames.BEACH], themeIdsByTitle[ThemeNames.GETAWAY], themeIdsByTitle[ThemeNames.BOATING]],
        title: "Blouses",
        categoryId: categoryMap[CategoryWorkNames.CLOTHING]
    },
    {
        userId,
        themeIds: [themeIdsByTitle[ThemeNames.BEACH], themeIdsByTitle[ThemeNames.COUNTRYSIDE], themeIdsByTitle[ThemeNames.GETAWAY], themeIdsByTitle[ThemeNames.BOATING], themeIdsByTitle[ThemeNames.NATURE]],
        title: "Bikinis",
        categoryId: categoryMap[CategoryWorkNames.CLOTHING]
    },
    {
        userId,
        themeIds: [themeIdsByTitle[ThemeNames.BEACH], themeIdsByTitle[ThemeNames.COUNTRYSIDE], themeIdsByTitle[ThemeNames.GETAWAY], themeIdsByTitle[ThemeNames.BOATING], themeIdsByTitle[ThemeNames.NATURE]],
        title: "Swimsuits",
        categoryId: categoryMap[CategoryWorkNames.CLOTHING]
    },
    {
        userId,
        themeIds: [themeIdsByTitle[ThemeNames.BEACH], themeIdsByTitle[ThemeNames.COUNTRYSIDE], themeIdsByTitle[ThemeNames.GETAWAY], themeIdsByTitle[ThemeNames.BOATING], themeIdsByTitle[ThemeNames.NATURE]],
        title: "Swimshorts",
        categoryId: categoryMap[CategoryWorkNames.CLOTHING]
    },
    {
        userId,
        themeIds: themes.map(theme => theme.id),
        title: "Bras",
        categoryId: categoryMap[CategoryWorkNames.CLOTHING]
    },
    {
        userId,
        themeIds: themes.map(theme => theme.id),
        title: "Pajamas",
        categoryId: categoryMap[CategoryWorkNames.CLOTHING]
    },
    {
        userId,
        themeIds: themes.map(theme => theme.id),
        title: "T-shirts",
        categoryId: categoryMap[CategoryWorkNames.CLOTHING]
    },
    {
        userId,
        themeIds: themes.map(theme => theme.id),
        title: "Overshirts",
        categoryId: categoryMap[CategoryWorkNames.CLOTHING]
    },
    {
        userId,
        themeIds: [themeIdsByTitle[ThemeNames.COUNTRYSIDE], themeIdsByTitle[ThemeNames.GETAWAY], themeIdsByTitle[ThemeNames.BOATING], themeIdsByTitle[ThemeNames.NATURE], themeIdsByTitle[ThemeNames.SKIING]],
        title: "Jackets",
        categoryId: categoryMap[CategoryWorkNames.OUTDOOR]
    },
    {
        userId,
        themeIds: [themeIdsByTitle[ThemeNames.COUNTRYSIDE], themeIdsByTitle[ThemeNames.GETAWAY], themeIdsByTitle[ThemeNames.BOATING], themeIdsByTitle[ThemeNames.NATURE], themeIdsByTitle[ThemeNames.SKIING]],
        title: "Coats",
        categoryId: categoryMap[CategoryWorkNames.OUTDOOR]
    },
    {
        userId,
        themeIds: themes.map(theme => theme.id),
        title: "Shoes",
        categoryId: categoryMap[CategoryWorkNames.OUTDOOR]
    },
    {
        userId,
        themeIds: [themeIdsByTitle[ThemeNames.COUNTRYSIDE], themeIdsByTitle[ThemeNames.GETAWAY], themeIdsByTitle[ThemeNames.BOATING], themeIdsByTitle[ThemeNames.NATURE], themeIdsByTitle[ThemeNames.SKIING]],
        title: "Boots",
        categoryId: categoryMap[CategoryWorkNames.OUTDOOR]
    },
    {
        userId,
        themeIds: themes.map(theme => theme.id),
        title: "Hats",
        categoryId: categoryMap[CategoryWorkNames.OUTDOOR]
    },
    {
        userId,
        themeIds: themes.map(theme => theme.id),
        title: "Caps",
        categoryId: categoryMap[CategoryWorkNames.OUTDOOR]
    },
    {
        userId,
        themeIds: [themeIdsByTitle[ThemeNames.COUNTRYSIDE], themeIdsByTitle[ThemeNames.GETAWAY], themeIdsByTitle[ThemeNames.NATURE], themeIdsByTitle[ThemeNames.SKIING]],
        title: "Gloves",
        categoryId: categoryMap[CategoryWorkNames.OUTDOOR]
    },
    {
        userId,
        themeIds: [themeIdsByTitle[ThemeNames.COUNTRYSIDE], themeIdsByTitle[ThemeNames.GETAWAY], themeIdsByTitle[ThemeNames.NATURE], themeIdsByTitle[ThemeNames.SKIING]],
        title: "Scarves",
        categoryId: categoryMap[CategoryWorkNames.OUTDOOR]
    },
    {
        userId,
        themeIds: [themeIdsByTitle[ThemeNames.COUNTRYSIDE], themeIdsByTitle[ThemeNames.GETAWAY], themeIdsByTitle[ThemeNames.BOATING], themeIdsByTitle[ThemeNames.NATURE], themeIdsByTitle[ThemeNames.SKIING]],
        title: "Wests",
        categoryId: categoryMap[CategoryWorkNames.OUTDOOR]
    },
    {
        userId,
        themeIds: themes.map(theme => theme.id),
        title: "Sneakers",
        categoryId: categoryMap[CategoryWorkNames.OUTDOOR]
    },
    {
        userId,
        themeIds: [themeIdsByTitle[ThemeNames.BEACH], themeIdsByTitle[ThemeNames.COUNTRYSIDE], themeIdsByTitle[ThemeNames.GETAWAY], themeIdsByTitle[ThemeNames.BOATING], themeIdsByTitle[ThemeNames.SKIING]],
        title: "Heals",
        categoryId: categoryMap[CategoryWorkNames.OUTDOOR]
    },
    {
        userId,
        themeIds: [themeIdsByTitle[ThemeNames.BEACH], themeIdsByTitle[ThemeNames.BOATING]],
        title: "Slippers",
        categoryId: categoryMap[CategoryWorkNames.OUTDOOR]
    },
    {
        userId,
        themeIds: themes.map(theme => theme.id),
        title: "Toothbrush",
        categoryId: categoryMap[CategoryWorkNames.TOILETRIES]
    },
    {
        userId,
        themeIds: themes.map(theme => theme.id),
        title: "Toothpaste",
        categoryId: categoryMap[CategoryWorkNames.TOILETRIES]
    },
    {
        userId,
        themeIds: themes.map(theme => theme.id),
        title: "Shampoo",
        categoryId: categoryMap[CategoryWorkNames.TOILETRIES]
    },
    {
        userId,
        themeIds: themes.map(theme => theme.id),
        title: "Conditioner",
        categoryId: categoryMap[CategoryWorkNames.TOILETRIES]
    },
    {
        userId,
        themeIds: themes.map(theme => theme.id),
        title: "Body Wash",
        categoryId: categoryMap[CategoryWorkNames.TOILETRIES]
    },
    {
        userId,
        themeIds: themes.map(theme => theme.id),
        title: "Deodorant",
        categoryId: categoryMap[CategoryWorkNames.TOILETRIES]
    },
    {
        userId,
        themeIds: themes.map(theme => theme.id),
        title: "Parfume",
        categoryId: categoryMap[CategoryWorkNames.TOILETRIES]
    },
    {
        userId,
        themeIds: [themeIdsByTitle[ThemeNames.BEACH], themeIdsByTitle[ThemeNames.COUNTRYSIDE], themeIdsByTitle[ThemeNames.GETAWAY], themeIdsByTitle[ThemeNames.BOATING], themeIdsByTitle[ThemeNames.NATURE]],
        title: "Sunscreen",
        categoryId: categoryMap[CategoryWorkNames.TOILETRIES]
    },
    {
        userId,
        themeIds: themes.map(theme => theme.id),
        title: "Moisturizer",
        categoryId: categoryMap[CategoryWorkNames.TOILETRIES]
    },
    {
        userId,
        themeIds: themes.map(theme => theme.id),
        title: "Hairbrush",
        categoryId: categoryMap[CategoryWorkNames.TOILETRIES]
    },
    {
        userId,
        themeIds: themes.map(theme => theme.id),
        title: "Razor",
        categoryId: categoryMap[CategoryWorkNames.TOILETRIES]
    },
    {
        userId,
        themeIds: themes.map(theme => theme.id),
        title: "Shavor",
        categoryId: categoryMap[CategoryWorkNames.TOILETRIES]
    },
    {
        userId,
        themeIds: themes.map(theme => theme.id),
        title: "Phone",
        categoryId: categoryMap[CategoryWorkNames.ELECTRONICS]
    },
    {
        userId,
        themeIds: themes.map(theme => theme.id),
        title: "Laptop",
        categoryId: categoryMap[CategoryWorkNames.ELECTRONICS]
    },
    {
        userId,
        themeIds: themes.map(theme => theme.id),
        title: "Camera",
        categoryId: categoryMap[CategoryWorkNames.ELECTRONICS]
    },
    {
        userId,
        themeIds: themes.map(theme => theme.id),
        title: "iPad",
        categoryId: categoryMap[CategoryWorkNames.ELECTRONICS]
    },
    {
        userId,
        themeIds: themes.map(theme => theme.id),
        title: "Tablet",
        categoryId: categoryMap[CategoryWorkNames.ELECTRONICS]
    },
    {
        userId,
        themeIds: themes.map(theme => theme.id),
        title: "Headphones",
        categoryId: categoryMap[CategoryWorkNames.ELECTRONICS]
    },
    {
        userId,
        themeIds: themes.map(theme => theme.id),
        title: "Chargers",
        categoryId: categoryMap[CategoryWorkNames.ELECTRONICS]
    },
    {
        userId,
        themeIds: themes.map(theme => theme.id),
        title: "Travel adapter",
        categoryId: categoryMap[CategoryWorkNames.ELECTRONICS]
    },
    {
        userId,
        themeIds: themes.map(theme => theme.id),
        title: "Smartwatch",
        categoryId: categoryMap[CategoryWorkNames.ELECTRONICS]
    },
    {
        userId,
        themeIds: themes.map(theme => theme.id),
        title: "Water",
        categoryId: categoryMap[CategoryWorkNames.FOODDRINKS]
    },
    {
        userId,
        themeIds: themes.map(theme => theme.id),
        title: "Drinks",
        categoryId: categoryMap[CategoryWorkNames.FOODDRINKS]
    },
    {
        userId,
        themeIds: themes.map(theme => theme.id),
        title: "Snacks",
        categoryId: categoryMap[CategoryWorkNames.FOODDRINKS]
    },
    {
        userId,
        themeIds: [themeIdsByTitle[ThemeNames.BEACH], themeIdsByTitle[ThemeNames.BOATING]],
        title: "Sunglasses",
        categoryId: categoryMap[CategoryWorkNames.ACCESSORIES]
    },
    {
        userId,
        themeIds: themes.map(theme => theme.id),
        title: "Watches",
        categoryId: categoryMap[CategoryWorkNames.ACCESSORIES]
    },
    {
        userId,
        themeIds: themes.map(theme => theme.id),
        title: "Belts",
        categoryId: categoryMap[CategoryWorkNames.ACCESSORIES]
    },
    {
        userId,
        themeIds: themes.map(theme => theme.id),
        title: "Jewelry",
        categoryId: categoryMap[CategoryWorkNames.ACCESSORIES]
    },
    {
        userId,
        themeIds: themes.map(theme => theme.id),
        title: "Wallets",
        categoryId: categoryMap[CategoryWorkNames.ACCESSORIES]
    },
    {
        userId,
        themeIds: themes.map(theme => theme.id),
        title: "Handbags",
        categoryId: categoryMap[CategoryWorkNames.ACCESSORIES]
    },
    {
        userId,
        themeIds: themes.map(theme => theme.id),
        title: "Backpacks",
        categoryId: categoryMap[CategoryWorkNames.ACCESSORIES]
    },
    {
        userId,
        themeIds: themes.map(theme => theme.id),
        title: "Travel pillows",
        categoryId: categoryMap[CategoryWorkNames.ACCESSORIES]
    },
    {
        userId,
        themeIds: themes.map(theme => theme.id),
        title: "Umbrellas",
        categoryId: categoryMap[CategoryWorkNames.ACCESSORIES]
    },
    {
        userId,
        themeIds: themes.map(theme => theme.id),
        title: "Casual shoes",
        categoryId: categoryMap[CategoryWorkNames.FOOTWEAR]
    },
    {
        userId,
        themeIds: [themeIdsByTitle[ThemeNames.BEACH], themeIdsByTitle[ThemeNames.COUNTRYSIDE], themeIdsByTitle[ThemeNames.GETAWAY], themeIdsByTitle[ThemeNames.BOATING], themeIdsByTitle[ThemeNames.SKIING]],
        title: "Formal shoes",
        categoryId: categoryMap[CategoryWorkNames.FOOTWEAR]
    },
    {
        userId,
        themeIds: [themeIdsByTitle[ThemeNames.COUNTRYSIDE], themeIdsByTitle[ThemeNames.GETAWAY], themeIdsByTitle[ThemeNames.NATURE], themeIdsByTitle[ThemeNames.SKIING]],
        title: "Boots",
        categoryId: categoryMap[CategoryWorkNames.FOOTWEAR]
    },
    {
        userId,
        themeIds: [themeIdsByTitle[ThemeNames.BEACH], themeIdsByTitle[ThemeNames.BOATING]],
        title: "Sandals",
        categoryId: categoryMap[CategoryWorkNames.FOOTWEAR]
    },
    {
        userId,
        themeIds: [themeIdsByTitle[ThemeNames.BEACH], themeIdsByTitle[ThemeNames.BOATING]],
        title: "Flip-flops",
        categoryId: categoryMap[CategoryWorkNames.FOOTWEAR]
    },
    {
        userId,
        themeIds: [themeIdsByTitle[ThemeNames.BEACH], themeIdsByTitle[ThemeNames.COUNTRYSIDE], themeIdsByTitle[ThemeNames.GETAWAY], themeIdsByTitle[ThemeNames.BOATING], themeIdsByTitle[ThemeNames.SKIING]],
        title: "Dress heels",
        categoryId: categoryMap[CategoryWorkNames.FOOTWEAR]
    },
    {
        userId,
        themeIds: [themeIdsByTitle[ThemeNames.SKIING]],
        title: "Winter boots",
        categoryId: categoryMap[CategoryWorkNames.FOOTWEAR]
    },
    {
        userId,
        themeIds: themes.map(theme => theme.id),
        title: "Passport",
        categoryId: categoryMap[CategoryWorkNames.DOCUMENTS]
    },
    {
        userId,
        themeIds: themes.map(theme => theme.id),
        title: "Visa documentation",
        categoryId: categoryMap[CategoryWorkNames.DOCUMENTS]
    },
    {
        userId,
        themeIds: themes.map(theme => theme.id),
        title: "Travel insurance",
        categoryId: categoryMap[CategoryWorkNames.DOCUMENTS]
    },
    {
        userId,
        themeIds: themes.map(theme => theme.id),
        title: "Flight tickets",
        categoryId: categoryMap[CategoryWorkNames.DOCUMENTS]
    },
    {
        userId,
        themeIds: themes.map(theme => theme.id),
        title: "Hotel reservations",
        categoryId: categoryMap[CategoryWorkNames.DOCUMENTS]
    },
    {
        userId,
        themeIds: themes.map(theme => theme.id),
        title: "Driver's licence",
        categoryId: categoryMap[CategoryWorkNames.DOCUMENTS]
    },
    {
        userId,
        themeIds: themes.map(theme => theme.id),
        title: "Wallet",
        categoryId: categoryMap[CategoryWorkNames.DOCUMENTS]
    },
    {
        userId,
        themeIds: themes.map(theme => theme.id),
        title: "Vaccination certificates",
        categoryId: categoryMap[CategoryWorkNames.DOCUMENTS]
    },
    {
        userId,
        themeIds: themes.map(theme => theme.id),
        title: "Pet food",
        categoryId: categoryMap[CategoryWorkNames.PETS]
    },
    {
        userId,
        themeIds: themes.map(theme => theme.id),
        title: "Water bowls",
        categoryId: categoryMap[CategoryWorkNames.PETS]
    },
    {
        userId,
        themeIds: themes.map(theme => theme.id),
        title: "Leashes",
        categoryId: categoryMap[CategoryWorkNames.PETS]
    },
    {
        userId,
        themeIds: themes.map(theme => theme.id),
        title: "Travel crates",
        categoryId: categoryMap[CategoryWorkNames.PETS]
    },
    {
        userId,
        themeIds: themes.map(theme => theme.id),
        title: "Chew toys",
        categoryId: categoryMap[CategoryWorkNames.PETS]
    },
    {
        userId,
        themeIds: themes.map(theme => theme.id),
        title: "Poop bags",
        categoryId: categoryMap[CategoryWorkNames.PETS]
    },
    {
        userId,
        themeIds: themes.map(theme => theme.id),
        title: "Pet first-aid kit",
        categoryId: categoryMap[CategoryWorkNames.PETS]
    },
    {
        userId,
        themeIds: themes.map(theme => theme.id),
        title: "Flea and tick prevention",
        categoryId: categoryMap[CategoryWorkNames.PETS]
    },
    {
        userId,
        themeIds: themes.map(theme => theme.id),
        title: "Pet bed",
        categoryId: categoryMap[CategoryWorkNames.PETS]
    },
    {
        userId,
        themeIds: themes.map(theme => theme.id),
        title: "Grooming supplies",
        categoryId: categoryMap[CategoryWorkNames.PETS]
    },
    {
        userId,
        themeIds: themes.map(theme => theme.id),
        title: "Diapers",
        categoryId: categoryMap[CategoryWorkNames.BABY]
    },
    {
        userId,
        themeIds: themes.map(theme => theme.id),
        title: "Wipes",
        categoryId: categoryMap[CategoryWorkNames.BABY]
    },
    {
        userId,
        themeIds: themes.map(theme => theme.id),
        title: "Baby formula",
        categoryId: categoryMap[CategoryWorkNames.BABY]
    },
    {
        userId,
        themeIds: themes.map(theme => theme.id),
        title: "Baby bottles",
        categoryId: categoryMap[CategoryWorkNames.BABY]
    },
    {
        userId,
        themeIds: themes.map(theme => theme.id),
        title: "Pacifiers",
        categoryId: categoryMap[CategoryWorkNames.BABY]
    },
    {
        userId,
        themeIds: themes.map(theme => theme.id),
        title: "Baby clothes",
        categoryId: categoryMap[CategoryWorkNames.BABY]
    },
    {
        userId,
        themeIds: themes.map(theme => theme.id),
        title: "Baby blanket",
        categoryId: categoryMap[CategoryWorkNames.BABY]
    },
    {
        userId,
        themeIds: themes.map(theme => theme.id),
        title: "Stroller",
        categoryId: categoryMap[CategoryWorkNames.BABY]
    },
    {
        userId,
        themeIds: themes.map(theme => theme.id),
        title: "Baby carrier",
        categoryId: categoryMap[CategoryWorkNames.BABY]
    },
    {
        userId,
        themeIds: themes.map(theme => theme.id),
        title: "Teething toys",
        categoryId: categoryMap[CategoryWorkNames.BABY]
    },
    {
        userId,
        themeIds: themes.map(theme => theme.id),
        title: "Cash in local currency",
        categoryId: categoryMap[CategoryWorkNames.MONEY]
    },
    {
        userId,
        themeIds: themes.map(theme => theme.id),
        title: "Credit cards",
        categoryId: categoryMap[CategoryWorkNames.MONEY]
    },
    {
        userId,
        themeIds: themes.map(theme => theme.id),
        title: "Debet cards",
        categoryId: categoryMap[CategoryWorkNames.MONEY]
    },
    {
        userId,
        themeIds: themes.map(theme => theme.id),
        title: "Wallet",
        categoryId: categoryMap[CategoryWorkNames.MONEY]
    },
    {
        userId,
        themeIds: themes.map(theme => theme.id),
        title: "Chequebook",
        categoryId: categoryMap[CategoryWorkNames.MONEY]
    },
    {
        userId,
        themeIds: themes.map(theme => theme.id),
        title: "Traveler's checks",
        categoryId: categoryMap[CategoryWorkNames.MONEY]
    },
    {
        userId,
        themeIds: themes.map(theme => theme.id),
        title: "Foundation",
        categoryId: categoryMap[CategoryWorkNames.MAKEUP]
    },
    {
        userId,
        themeIds: themes.map(theme => theme.id),
        title: "Mascara",
        categoryId: categoryMap[CategoryWorkNames.MAKEUP]
    },
    {
        userId,
        themeIds: themes.map(theme => theme.id),
        title: "Eyeliner",
        categoryId: categoryMap[CategoryWorkNames.MAKEUP]
    },
    {
        userId,
        themeIds: themes.map(theme => theme.id),
        title: "Eyeshadow palette",
        categoryId: categoryMap[CategoryWorkNames.MAKEUP]
    },
    {
        userId,
        themeIds: themes.map(theme => theme.id),
        title: "Lipstick",
        categoryId: categoryMap[CategoryWorkNames.MAKEUP]
    },
    {
        userId,
        themeIds: themes.map(theme => theme.id),
        title: "Blush",
        categoryId: categoryMap[CategoryWorkNames.MAKEUP]
    },
    {
        userId,
        themeIds: themes.map(theme => theme.id),
        title: "Makeup remover",
        categoryId: categoryMap[CategoryWorkNames.MAKEUP]
    },
    {
        userId,
        themeIds: themes.map(theme => theme.id),
        title: "Makeup brushes",
        categoryId: categoryMap[CategoryWorkNames.MAKEUP]
    },
    {
        userId,
        themeIds: themes.map(theme => theme.id),
        title: "Primer",
        categoryId: categoryMap[CategoryWorkNames.MAKEUP]
    },
    {
        userId,
        themeIds: themes.map(theme => theme.id),
        title: "Concealer",
        categoryId: categoryMap[CategoryWorkNames.MAKEUP]
    },
    {
        userId,
        themeIds: themes.map(theme => theme.id),
        title: "Setting spray",
        categoryId: categoryMap[CategoryWorkNames.MAKEUP]
    },
    {
        userId,
        themeIds: themes.map(theme => theme.id),
        title: "Bronzer",
        categoryId: categoryMap[CategoryWorkNames.MAKEUP]
    },
    {
        userId,
        themeIds: themes.map(theme => theme.id),
        title: "Eyelash curler",
        categoryId: categoryMap[CategoryWorkNames.MAKEUP]
    },
    {
        userId,
        themeIds: themes.map(theme => theme.id),
        title: "Yoga mat",
        categoryId: categoryMap[CategoryWorkNames.TRAINING]
    },
    {
        userId,
        themeIds: themes.map(theme => theme.id),
        title: "Resistance bands",
        categoryId: categoryMap[CategoryWorkNames.TRAINING]
    },
    {
        userId,
        themeIds: themes.map(theme => theme.id),
        title: "Jump rope",
        categoryId: categoryMap[CategoryWorkNames.TRAINING]
    },
    {
        userId,
        themeIds: themes.map(theme => theme.id),
        title: "Workout clothes",
        categoryId: categoryMap[CategoryWorkNames.TRAINING]
    },
    {
        userId,
        themeIds: themes.map(theme => theme.id),
        title: "Sports shoes",
        categoryId: categoryMap[CategoryWorkNames.TRAINING]
    },
    {
        userId,
        themeIds: themes.map(theme => theme.id),
        title: "Running shoes",
        categoryId: categoryMap[CategoryWorkNames.TRAINING]
    },
    {
        userId,
        themeIds: themes.map(theme => theme.id),
        title: "Watter bottle",
        categoryId: categoryMap[CategoryWorkNames.TRAINING]
    },
    {
        userId,
        themeIds: themes.map(theme => theme.id),
        title: "Towel",
        categoryId: categoryMap[CategoryWorkNames.TRAINING]
    },
    {
        userId,
        themeIds: themes.map(theme => theme.id),
        title: "Heart rate monitor",
        categoryId: categoryMap[CategoryWorkNames.TRAINING]
    },
    {
        userId,
        themeIds: themes.map(theme => theme.id),
        title: "Weightlifting gloves",
        categoryId: categoryMap[CategoryWorkNames.TRAINING]
    },
    {
        userId,
        themeIds: themes.map(theme => theme.id),
        title: "Protein powder",
        categoryId: categoryMap[CategoryWorkNames.TRAINING]
    }
]