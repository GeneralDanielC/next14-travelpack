import * as z from "zod";

export const LeaveListShare = z.object({
    listId: z.string(),
});