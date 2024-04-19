import * as z from "zod";

export const UpdateList = z.object({
    title: z.string({
        required_error: "Title is required",
        invalid_type_error: "Title is required",
    }).min(2, {
        message: "Title is too short."
    }),
    themeId: z.union([z.string(), z.null()]).optional(),
    departAt: z.optional(z.date()),
    listId: z.string(),
});