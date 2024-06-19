import * as z from "zod";
import { Category } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";

import { DeleteCategory } from "./schema";

export type InputType = z.infer<typeof DeleteCategory>
export type ReturnType = ActionState<InputType, Category>