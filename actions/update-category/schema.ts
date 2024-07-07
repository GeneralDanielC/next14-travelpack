import * as z from "zod";

export const UpdateCategory = z.object({
    categoryId: z.string(),
    displayName: z.string({
        required_error: "Name is required",
        invalid_type_error: "Name is required",
    }).min(2, {
        message: "Name is too short."
    }).max(25, {
        message: "Name is too long."
    }),
    workName: z.string(),
});