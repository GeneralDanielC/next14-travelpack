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
import { FormError } from "@/components/form/form-errors";
import { FormSuccess } from "@/components/form-success";
import { UserRole } from "@prisma/client";

export const ListSettingsForm = () => {
    const user = useCurrentUser();

    const { update } = useSession();
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof ListSchema>>({
        resolver: zodResolver(ListSchema),
        defaultValues: {
            title: undefined,
        }
    });

    const onSubmit = (values: z.infer<typeof ListSchema>) => {
        startTransition(() => {
            // settings(values)
            //     .then((data) => {
            //         if (data.error) {
            //             setError(data.error);
            //         }
            //         if (data.success) {
            //             update();
            //             setSuccess(data.success)
            //         }
            //     })
            //     .catch(() => setError("Something went wrong!"));
        });
    }

    return (
        <Form {...form}>
            <form
                className="space-y-6"
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <div className="space-y-4">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>List Title</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="Name of the list"
                                        disabled={isPending}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <FormError message={error} />
                <FormSuccess message={success} />
                <Button
                    disabled={isPending}
                    type="submit"
                >
                    Save
                </Button>
            </form>
        </Form>
    );
}