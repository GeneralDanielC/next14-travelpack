import * as z from "zod";
import { Item } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";

import { CheckItem } from "./schema";

export type InputType = z.infer<typeof CheckItem>
export type ReturnType = ActionState<InputType, Item>