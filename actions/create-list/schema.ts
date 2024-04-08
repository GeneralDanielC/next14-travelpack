import * as z from "zod";

export const CreateList = z.object({
    title: z.string({
        required_error: "Title is required",
        invalid_type_error: "Title is required",
    }),
    themeId: z.optional(z.string()),
    typeId: z.string({
        required_error: "Type is required",
        invalid_type_error: "Type is required"
    }),
    departAt: z.optional(z.date()),
});