"use client";

import * as z from "zod";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";

import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ListSchema } from "@/schemas";
import {
  Card,
  CardHeader,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { settings } from "@/actions/auth/settings";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCurrentUser } from "@/hooks/use-current-user";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { List, Theme, UserRole } from "@prisma/client";
import { FormInput } from "@/components/form/form-input";
import { FormSubmit } from "@/components/form/form-submit";
import { FormDatePicker } from "@/components/form/form-date-picker";
import { FormPicker } from "@/components/form/form-picker";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { useAction } from "@/hooks/use-action";
import { updateList } from "@/actions/update-list";
import { toast } from "sonner";
import { deleteList } from "@/actions/delete-list";
import { copyList } from "@/actions/copy-list";
import { ListWithType, Types } from "@/types";

interface ListSettingsFormProps {
  data: ListWithType;
  themes: Theme[];
}

export const ListSettingsForm = ({
  data,
  themes,
}: ListSettingsFormProps) => {
  const user = useCurrentUser();
  const [date, setDate] = useState<Date | null | undefined>(data.departAt);

  const { execute: executeUpdate, fieldErrors } = useAction(updateList, {
    onSuccess: (data) => {
      toast.success(`List "${data.title}" updated.`);
    },
    onError: (error) => {
      toast.error(error);
    }
  });

  const { execute: executeCopy } = useAction(copyList, {
    onSuccess: (data) => {
      toast.success(`List copied.`);
    },
    onError: (error) => {
      toast.error(error);
    }
  });

  const { execute: executeDelete } = useAction(deleteList, {
    onSuccess: (data) => {
      toast.success(`List "${data.title}" deleted.`);
    },
    onError: (error) => {
      toast.error(error);
    }
  });

  const handleUpdate = (formData: FormData) => {
    const title = formData.get("title") as string;
    const themeId = formData.get("themeId") as string;
    let departAt = date;

    if (departAt === null) { departAt = undefined };

    executeUpdate({
      title,
      themeId,
      departAt,
      listId: data.id,
    });
  }

  const handleCopy = (formData: FormData) => {
    const userId = formData.get("userId") as string;
    const listId = formData.get("listId") as string;

    executeCopy({
      userId,
      listId,
    });
  }

  const handleDelete = (formData: FormData) => {
    const listId = formData.get("listId") as string;

    executeDelete({
      listId,
    });
  }

  return (
    <div className="flex flex-col space-y-3 h-full">
      <form
        action={handleUpdate}
        className="space-y-3"
      >
        <FormInput
          id="title"
          label="List Title"
          type="text"
          className="w-full border-none bg-stone-100 dark:bg-stone-800"
          defaultValue={data.title}
          errors={fieldErrors}
        />
        {data.type.title === Types.PACKING && (
          <>
            <FormDatePicker
              id="departAt"
              date={date || undefined}
              setDate={setDate}
              label="Departure Date"
              className="border-none bg-stone-100 dark:bg-stone-800"
            />
            <FormPicker
              id="themeId"
              data={themes}
              defaultValue={data.themeId}
              size="sm"
              label="Theme"
              errors={fieldErrors}
            />
          </>
        )}

        <input
          hidden
          id="listId"
          name="listId"
          value={data.id}
        />
        <FormSubmit
          className="w-full"
          variant="outline"
        >
          Save
        </FormSubmit>
      </form>
      <form action={handleCopy}>
        <input
          hidden
          id="listId"
          name="listId"
          value={data.id}
        />
        <input
          hidden
          id="userId"
          name="userId"
          value={data.userId}
        />
        <FormSubmit
          variant="ghost"
          className="w-full flex items-center"
        >
          Copy
        </FormSubmit>
      </form>
      <form action={handleDelete}>
        <input
          hidden
          id="listId"
          name="listId"
          value={data.id}
        />
        <FormSubmit
          variant="ghost"
          className="text-rose-500 font-extrabold w-full hover:bg-rose-500/10 hover:text-rose-500 hover:border-rose-500/70 hover:border flex items-center"
        >
          Delete
        </FormSubmit>
      </form>
    </div>

  );
}