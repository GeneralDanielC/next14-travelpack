import * as z from "zod";

export const DeleteCategory = z.object({
    categoryId: z.string(),
    removable: z.boolean(),
});