import * as z from "zod";
import { Item } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";

import { UncheckAllItems } from "./schema";

export type InputType = z.infer<typeof UncheckAllItems>
export type ReturnType = ActionState<InputType, string>