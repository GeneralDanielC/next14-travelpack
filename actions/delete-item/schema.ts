import * as z from "zod";

export const DeleteItem = z.object({
    listId: z.string(),
    itemId: z.string(),
});