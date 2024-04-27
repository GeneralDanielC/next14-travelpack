import * as z from "zod";
import { ListShare } from "@prisma/client";

import { ActionState } from "@/lib/create-safe-action";

import { LeaveListShare } from "./schema";

export type InputType = z.infer<typeof LeaveListShare>
export type ReturnType = ActionState<InputType, ListShare>