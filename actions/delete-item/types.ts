import * as z from "zod";
import { Item } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";

import { DeleteItem } from "./schema";

export type InputType = z.infer<typeof DeleteItem>
export type ReturnType = ActionState<InputType, Item>