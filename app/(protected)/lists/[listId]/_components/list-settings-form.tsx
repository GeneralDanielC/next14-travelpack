"use client";

import * as z from "zod";
import { useState, useTransition } from "react";
import { useCurrentUser } from "@/hooks/use-current-user";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { List, Theme, UserRole } from "@prisma/client";
import { FormInput } from "@/components/form/form-input";
import { FormSubmit } from "@/components/form/form-submit";
import { FormDatePicker } from "@/components/form/form-date-picker";
import { FormPicker } from "@/components/form/form-picker";

import { useAction } from "@/hooks/use-action";
import { updateList } from "@/actions/update-list";
import { toast } from "sonner";
import { deleteList } from "@/actions/delete-list";
import { copyList } from "@/actions/copy-list";
import { ListComplete, Types } from "@/types";
import { leaveListShare } from "@/actions/leave-list-share";
import { redirect, useRouter } from "next/navigation";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface ListSettingsFormProps {
  list: ListComplete;
  themes: Theme[];
  userIsNotOwnerOfList?: boolean;
}

export const ListSettingsForm = ({
  list,
  themes,
  userIsNotOwnerOfList
}: ListSettingsFormProps) => {
  const user = useCurrentUser();
  const [date, setDate] = useState<Date | null | undefined>(list.departAt);

  const router = useRouter();

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

  const { execute: executeLeaveShare } = useAction(leaveListShare, {
    onSuccess: (data) => {
      toast.success(`Shared list successfully deleted.`);
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
      listId: list.id,
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

  const handleLeaveShare = (formData: FormData) => {
    const listId = formData.get("listId") as string;

    executeLeaveShare({
      listId,
    });
    router.push("/dashboard");
  }

  return (
    <div className="flex-1 flex flex-col space-y-3 mx-0.5">
      {userIsNotOwnerOfList && (
        <span className="text-xs text-center">The settings of this list can only be accessed by the owner.</span>
      )}
      {!userIsNotOwnerOfList && (
        <form
          action={handleUpdate}
          className="space-y-3"
        >
          <FormInput
            id="title"
            label="List Title"
            type="text"
            className="w-full border-none bg-stone-100 dark:bg-stone-800"
            defaultValue={list.title}
            errors={fieldErrors}
          />
          {list.type.title === Types.PACKING && (
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
                defaultValue={list.themeId || undefined}
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
            value={list.id}
          />
          <FormSubmit
            className="w-full"
            variant="outline"
          >
            Save
          </FormSubmit>
        </form>
      )}

      <form action={handleCopy}>
        <input
          hidden
          id="listId"
          name="listId"
          value={list.id}
        />
        <input
          hidden
          id="userId"
          name="userId"
          value={list.userId}
        />
        <FormSubmit
          variant="ghost"
          className="w-full flex items-center"
        >
          Copy
        </FormSubmit>
      </form>

      {!userIsNotOwnerOfList && (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="ghost"
              className="text-rose-500 font-extrabold w-full hover:bg-rose-500/10 hover:text-rose-500 hover:border-rose-500/70 hover:border flex items-center"
            >
              Delete
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>This action cannot be undone. This will permanently delete your list.</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <form action={handleDelete}>
                <input
                  hidden
                  id="listId"
                  name="listId"
                  value={list.id}
                />
                <AlertDialogAction asChild>
                  <FormSubmit
                    variant="ghost"
                    className="bg-rose-500/10 border border-rose-500/70 text-rose-500 font-extrabold w-full hover:bg-rose-500/20 hover:text-rose-500 hover:border-rose-500/80 hover:border flex items-center"
                  >
                    Continue
                  </FormSubmit>
                </AlertDialogAction>
              </form>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

      )}

      {userIsNotOwnerOfList && (

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="ghost"
              className="text-rose-500 font-extrabold w-full hover:bg-rose-500/10 hover:text-rose-500 hover:border-rose-500/70 hover:border flex items-center"
            >
              Leave this list
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>This action cannot be undone. The owner of the list will have to share this list with you again.</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <form action={handleLeaveShare}>
                <input
                  hidden
                  id="listId"
                  name="listId"
                  value={list.id}
                />
                <AlertDialogAction>
                  <FormSubmit
                    variant="ghost"
                    className="bg-rose-500/10 border border-rose-500/70 text-rose-500 font-extrabold w-full hover:bg-rose-500/20 hover:text-rose-500 hover:border-rose-500/80 hover:border flex items-center"
                  >
                    Continue
                  </FormSubmit>
                </AlertDialogAction>
              </form>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>

  );
}