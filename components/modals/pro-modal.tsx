"use client";

import { useProModal } from "@/hooks/use-pro-modal";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";
import { stripeRedirect } from "@/actions/stripe-redirect";
import { toast } from "sonner";
import Image from "next/image";
import { BillingListItem } from "@/app/(protected)/settings/user/_components/billing-list-item";
import { Check } from "lucide-react";

export const ProModal = () => {
    const proModal = useProModal()

    const { execute, isLoading } = useAction(stripeRedirect, {
        onSuccess: (data) => {
            window.location.href = data;
        },
        onError: (error) => {
            toast.error(error);
        }
    });

    const onClick = () => {
        execute({});
    }

    return (
        <Dialog
            open={proModal.isOpen}
            onOpenChange={proModal.onClose}
        >
            <DialogContent className="max-w-md p-0 overflow-hidden">
                <div className="aspect-video relative flex items-center justify-center">
                    <Image
                        src="/images/modal-img-3.jpg"
                        className="object-cover"
                        fill
                        alt="picture of suitcase"
                    />
                </div>
                <div className="text-neutral-700 dark:text-neutral-200 w-full mx-auto space-y-4 p-6">
                    <div>
                        <h1 className="font-semibold text-xl">
                            Upgrade to Plus+!
                        </h1>
                        <p className="text-xs font-semibold text-neutral-600">
                            Explore the best of pakkit!
                        </p>
                    </div>
                    <div className="">
                        <BillingListItem title="AI-powered categorization"><Check className="size-5" /></BillingListItem>
                        <BillingListItem title="Unlimited lists"><Check className="size-5" /></BillingListItem>
                        <BillingListItem title="More is coming!"><Check className="size-5" /></BillingListItem>
                    </div>
                    <Button
                        disabled={isLoading}
                        onClick={onClick}
                        className="w-full"
                    >
                        Upgrade Now!
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}