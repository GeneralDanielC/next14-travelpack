import * as z from "zod";
import { Item } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";

import { UpdateItemOrder } from "./schema";

export type InputType = z.infer<typeof UpdateItemOrder>
export type ReturnType = ActionState<InputType, Item[]>