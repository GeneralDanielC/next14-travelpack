"use client";

import { deleteListShare } from "@/actions/delete-list-share";
import { FormSubmit } from "@/components/form/form-submit";
import { useAction } from "@/hooks/use-action";
import { ListShare } from "@prisma/client";
import { toast } from "sonner";

interface ListShareUnshareFormProps {
    share: ListShare,
}

export const ListShareUnshareForm = ({
    share
}: ListShareUnshareFormProps) => {

    const { execute } = useAction(deleteListShare, {
        onSuccess: (data) => {
          toast.success(`Deleted user from list.`);
        },
        onError: (error) => {
          toast.error(error);
        }
      });

    const handleUnshare = (formData: FormData) => {
        const shareId = formData.get("shareId") as string;

        execute({
            shareId,
        });
    }

    return (
        <form action={handleUnshare}>
            <input
                hidden
                id="shareId"
                name="shareId"
                value={share?.id}
            />
            <FormSubmit
                variant="link"
                className="text-rose-500 p-0 m-0"
            >
                Unshare
            </FormSubmit>
        </form>
    )
}