import * as z from "zod";
import { Category } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";

import { CreateCategory } from "./schema";

export type InputType = z.infer<typeof CreateCategory>
export type ReturnType = ActionState<InputType, Category>