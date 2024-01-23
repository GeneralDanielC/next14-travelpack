import * as z from "zod";

export const CopyList = z.object({
    userId: z.string(),
    listId: z.string(),
});