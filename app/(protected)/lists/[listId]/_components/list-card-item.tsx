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

    // Framer Motion variables
    let ref = useRef(null);
    let x = useMotionValue(0);
    let isPresent = useIsPresent();
    let xPx = useMotionTemplate`${x}px`;
    let [align, setAlign] = useState('end');
    useMotionValueEvent(x, 'change', (x) => {
        let a = x < -ref.current?.offsetWidth * 0.8 ? 'start' : 'end';
        setAlign(a);
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
            className="relative flex items-center overflow-hidden"
            drag="x"
            dragConstraints={{ right: 0 }}
            onDragEnd={(e, { offset }) => {
                let v = offset.x > -20 ? 0 : -100;
                if (x.get() < -ref.current?.offsetWidth * 0.8) {
                    v = -ref.current?.offsetWidth;
                    // Trigger item removal here if needed
                }
                animate(x, v, {
                    ...inertiaTransition,
                    min: v,
                    max: v
                });
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
            <Button
                className="bg-red-600 pressed:bg-red-700 cursor-default text-lg outline-none border-none transition-colors text-white flex items-center absolute top-0 left-[100%] py-2 h-full z-0 isolate focus-visible:outline focus-visible:outline-blue-600 focus-visible:-outline-offset-2"
                style={{
                    // width: 'max(100px, calc(-1 * var(--x)))',
                    // justifyContent: align
                }}
                onClick={() => console.log('Delete action')}
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
            </Button>
        </motion.div>
    );
}
