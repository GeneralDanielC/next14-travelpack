import * as z from "zod";

export const DeleteList = z.object({
    listId: z.string(),
});