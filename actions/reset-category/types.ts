import * as z from "zod";
import { Category } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";

import { ResetCategory } from "./schema";

export type InputType = z.infer<typeof ResetCategory>
export type ReturnType = ActionState<InputType, Category>