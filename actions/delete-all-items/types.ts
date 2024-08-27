import * as z from "zod";
import { Item } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";

import { DeleteAllItems } from "./schema";

export type InputType = z.infer<typeof DeleteAllItems>
export type ReturnType = ActionState<InputType, String>