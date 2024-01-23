import * as z from "zod";

export const CreateItem = z.object({
    title: z.string({
        required_error: "Title is required",
        invalid_type_error: "Title is required",
    }).min(2, {
        message: "Title is too short."
    }),
    categoryId: z.string({
        required_error: "Category is required",
        invalid_type_error: "Category is required"
    }),
    listId: z.string({
        required_error: "Category is required",
        invalid_type_error: "Category is required"
    }),
    quantity: z.optional(z.number()),
});