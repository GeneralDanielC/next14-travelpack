import * as z from "zod";

export const UpdateItemOrder = z.object({
    items: z.array(
        z.object({
            id: z.string(),
            title: z.string(),
            quantity: z.number(),
            isChecked: z.boolean(),
            createdAt: z.date(),
            listId: z.string(),
            categoryId: z.string(),
            order: z.number(),
        })
    ),
    listId: z.string()
});