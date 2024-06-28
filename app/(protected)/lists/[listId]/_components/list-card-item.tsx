"use client";

import { toast } from "sonner";
import { useEffect, useState, useRef } from "react";
import { Category, Item } from "@prisma/client";
import { useFormStatus } from "react-dom";
import { motion, useMotionValue, useMotionTemplate, useMotionValueEvent, animate, useIsPresent } from 'framer-motion';
import type { CSSProperties } from 'react';

import { cn } from "@/lib/utils";
import { useAction } from "@/hooks/use-action";
import { checkItem } from "@/actions/check-item";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ItemSettingsForm } from "./item-settings-form";
import { deleteItem } from "@/actions/delete-item";
import { FormSubmit } from "@/components/form/form-submit";

interface ListCardItemProps {
    item: Item;
    listId: string;
    listTypeId: string;
    categories?: Category[];
    userHasEditingRights?: boolean;
}

export const ListCardItem = ({
    item,
    listId,
    listTypeId,
    categories,
    userHasEditingRights
}: ListCardItemProps) => {
    const { pending } = useFormStatus();

    const [itemIsChecked, setItemIsChecked] = useState(item?.isChecked);

    const { execute } = useAction(checkItem, {
        onSuccess: (data) => {
            setItemIsChecked(data.isChecked);
        },
        onError: (error) => {
            toast.error(error);
        }
    });

    const { execute: executeDelete } = useAction(deleteItem, {
        onSuccess: (data) => {
            toast.success(`List item deleted.`);
        },
        onError: (error) => {
            toast.error(error);
        }
    })

    const handleSubmit = (formData: FormData) => {
        const itemId = formData.get("itemId") as string;

        if (!userHasEditingRights) return;

        execute({
            itemId,
            listId,
            isChecked: item.isChecked,
        });
    }

    useEffect(() => {
        setItemIsChecked(item.isChecked);
    }, [item]);

    const handleCheckItem = (e: React.MouseEvent) => {
        e.stopPropagation();
        setItemIsChecked(!itemIsChecked);
    }

    const handleDeleteItem = () => {
        if (!userHasEditingRights) return;

        executeDelete({
            listId,
            itemId: item.id,
        });
    }

    // Framer Motion variables
    let ref = useRef<HTMLDivElement>(null);
    let x = useMotionValue(0);
    let isPresent = useIsPresent();
    let xPx = useMotionTemplate`${x}px`;
    let [align, setAlign] = useState('end');
    useMotionValueEvent(x, 'change', (x) => {
        if (ref.current) {
            let a = x < -ref.current?.offsetWidth * 0.8 ? 'start' : 'end';
            setAlign(a);
        }
    });

    const inertiaTransition = {
        type: 'inertia' as const,
        bounceStiffness: 300,
        bounceDamping: 40,
        timeConstant: 300
    };

    return (
        <motion.div
            ref={ref}
            style={{ x, '--x': xPx } as CSSProperties}
            className="relative flex items-center overflow-visible w-full"
            drag="x"
            dragConstraints={{ right: 0 }}
            onDragEnd={(e, { offset }) => {
                let v = offset.x > -20 ? 0 : -100;
                if (ref.current) {
                    if (x.get() < -ref.current.offsetWidth * 0.8) {
                        v = -ref.current.offsetWidth;

                        handleDeleteItem();
                    }
                    animate(x, v, {
                        ...inertiaTransition,
                        min: v,
                        max: v
                    });
                }

            }}
            onDragStart={() => {
                document.dispatchEvent(new PointerEvent('pointercancel'));
            }}
        >
            <div className="flex items-center gap-x-0.5 w-full">
                <form action={handleSubmit} className="w-full">
                    <input hidden id="itemId" name="itemId" value={item.id} disabled={!userHasEditingRights} />
                    <Button
                        disabled={!userHasEditingRights || pending}
                        size="sm"
                        variant="ghost"
                        className="w-full flex flex-row items-center justify-between"
                        onClick={handleCheckItem}
                    >
                        <div className={cn(
                            "flex flex-row items-center gap-x-2",
                            itemIsChecked && "line-through text-stone-400/70"
                        )}>
                            <input
                                disabled={pending}
                                type="checkbox"
                                checked={itemIsChecked}
                                onClick={handleCheckItem}
                                className="rounded-md checked:bg-stone-700 shadow-md checked:hover:bg-stone-600 checked:focus:bg-stone-700 focus:ring-stone-700
                                dark:bg-stone-500"
                            />
                            <span>{item.title}</span>
                        </div>
                        <div className="flex flex-row items-center gap-x-2">
                            {item.quantity !== 0 && (
                                <Badge className={cn(
                                    "",
                                    itemIsChecked && "bg-stone-400/70 line-through"
                                )}>{item.quantity}</Badge>
                            )}
                        </div>
                    </Button>
                </form>
                {userHasEditingRights && (
                    <ItemSettingsForm item={item} categories={categories} listTypeId={listTypeId} />
                )}
            </div>
            <form
                action={handleDeleteItem}
            >
                <FormSubmit
                    className="bg-red-400 hover:bg-red-500/80 active:bg-red-500 text-xs flex items-center absolute top-0 left-[100%] py-2 h-full shadow-none"
                    style={{
                        width: 'max(100px, calc(-1 * var(--x)))',
                        justifyContent: align
                    }}
                    onFocus={() => x.set(-100)}
                    onBlur={() => x.set(0)}
                >
                    <motion.span
                        initial={false}
                        className="px-4"
                        animate={{
                            transform: align === 'start'
                                ? ['translateX(calc(-100% - var(--x)))', 'translateX(0)']
                                : ['translateX(calc(100% + var(--x)))', 'translateX(0)']
                        }}
                    >
                        Delete
                    </motion.span>
                </FormSubmit>
            </form>
        </motion.div>
    );
}
