import * as z from "zod";
import { Category } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";

import { UpdateCategory } from "./schema";

export type InputType = z.infer<typeof UpdateCategory>
export type ReturnType = ActionState<InputType, Category>