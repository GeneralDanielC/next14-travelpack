import * as z from "zod";
import { Item } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";

import { CreateItem } from "./schema";

export type InputType = z.infer<typeof CreateItem>
export type ReturnType = ActionState<InputType, Item>