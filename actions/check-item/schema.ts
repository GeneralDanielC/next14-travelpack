import * as z from "zod";

export const CheckItem = z.object({
    itemId: z.string(),
    listId: z.string(),
});