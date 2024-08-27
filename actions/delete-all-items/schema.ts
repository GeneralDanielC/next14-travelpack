import * as z from "zod";

export const DeleteAllItems = z.object({
    listId: z.string(),
});