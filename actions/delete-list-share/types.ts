import * as z from "zod";
import { ListShare } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";

import { DeleteListShare } from "./schema";

export type InputType = z.infer<typeof DeleteListShare>
export type ReturnType = ActionState<InputType, ListShare>