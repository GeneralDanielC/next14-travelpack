import * as z from "zod";
import { ItemSchema } from "@/schemas";

export const CheckItem = z.object({
    item: ItemSchema
});