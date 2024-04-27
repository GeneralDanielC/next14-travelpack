import * as z from "zod";

export const DeleteListShare = z.object({
    shareId: z.string(),
});