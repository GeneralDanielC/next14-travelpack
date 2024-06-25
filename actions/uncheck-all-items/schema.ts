import * as z from "zod";

export const UncheckAllItems = z.object({
    listId: z.string(),
});