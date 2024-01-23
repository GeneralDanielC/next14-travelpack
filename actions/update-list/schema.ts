import * as z from "zod";

export const UpdateList = z.object({
    title: z.string({
        required_error: "Title is required",
        invalid_type_error: "Title is required",
    }).min(2, {
        message: "Title is too short."
    }),
    themeId: z.string({
        required_error: "Theme is required",
        invalid_type_error: "Theme is required"
    }),
    departAt: z.optional(z.date()),
    listId: z.string(),
});