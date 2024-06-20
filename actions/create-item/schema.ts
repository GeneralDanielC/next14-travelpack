import * as z from "zod";

export const CreateItem = z.object({
    title: z.string({
        required_error: "Title is required",
        invalid_type_error: "Title is required",
    }).min(1, {
        message: "Title is too short."
    }),
    listId: z.string({
        required_error: "Category is required",
        invalid_type_error: "Category is required"
    }),
    ownerUserId: z.string(),
    listTypeId: z.string(),
});