import * as z from "zod";

export const ResetCategory = z.object({
    categoryId: z.string(),
});