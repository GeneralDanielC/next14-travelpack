import * as z from "zod";

export const CreateCategory = z.object({
    displayName: z.string({
        required_error: "Title is required",
        invalid_type_error: "Title is required",
    }),
    listTypeId: z.string({
        required_error: "List type is required",
        invalid_type_error: "List type is required"
    }),
});