import * as z from "zod";

export const CreateListShare = z.object({
    listId: z.string(),
    userEmail: z.string(),
    canEdit: z.boolean(),
});