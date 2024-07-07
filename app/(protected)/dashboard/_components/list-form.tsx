"use client";

import { Theme } from "@prisma/client";

import { Types } from "@/types";
import { FormInput } from "@/components/form/form-input"
import { FormPicker } from "@/components/form/form-picker"
import { FormSubmit } from "@/components/form/form-submit"
import { FormDatePicker } from "@/components/form/form-date-picker"
import { useAction } from "@/hooks/use-action";
import { createList } from "@/actions/create-list";
import { toast } from "sonner";
import { Dispatch, ElementRef, SetStateAction, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useProModal } from "@/hooks/use-pro-modal";

interface ListFormProps {
    themes: Theme[];
    types: Theme[];
    setOpen: Dispatch<SetStateAction<boolean>>;
}

export const ListForm = ({
    themes,
    types,
    setOpen
}: ListFormProps) => {
    const formRef = useRef<ElementRef<"form">>(null);
    const [date, setDate] = useState<Date>();
    const [listType, setListType] = useState("");
    const [displayThemes, setDisplayThemes] = useState(false);
    const proModal = useProModal();

    const isSmallScreen = window.innerWidth < 640;

    const { execute, fieldErrors } = useAction(createList, {
        onSuccess: (data) => {
            toast.success(`List "${data.title}" created.`);

            setOpen(false);
            formRef.current?.reset();
        },
        onError: (error) => {
            toast.error(error);
            proModal.onOpen();
        }
    });

    const handleSubmit = (formData: FormData) => {
        const title = formData.get("title") as string;
        let themeId = formData.get("themeId") as string | undefined;
        const typeId = formData.get("typeId") as string;
        const departAt = date as Date;

        if (!themeId) {
            themeId = undefined;
        }

        execute({
            title,
            themeId,
            typeId,
            departAt
        });
    }

    const animationVariants = {
        visible: { display: "block", opacity: 1, filter: "blur(0px)", height: "auto" },
        hidden: { display: "none", opacity: 0, filter: "blur(3px)", height: 0 }
    }

    useEffect(() => {
        setDisplayThemes(listType === Types.PACKING);
    }, [listType]);

    return (
        <form
            ref={formRef}
            action={handleSubmit}
        >
            <div className="flex flex-col gap-y-3">
                <span className="text-center uppercase font-bold text-xs text-stone-500">Type</span>
                <FormPicker
                    id="typeId"
                    data={types}
                    setValue={setListType}
                    size="sm"
                />
                <motion.div
                    initial="hidden"
                    animate={displayThemes ? "visible" : "hidden"}
                    transition={{ type: "spring", stiffness: 50 }}
                    variants={animationVariants}
                    className="overflow-hidden space-y-3"
                >
                    <span className="text-center uppercase font-bold text-xs text-stone-500 block">Theme</span>
                    <FormPicker
                        id="themeId"
                        data={themes}
                        errors={fieldErrors}
                        pagnation
                        size={isSmallScreen ? "sm" : "default"}
                    />
                </motion.div>

            </div>
            <div className="flex items-center gap-x-2 mt-7 mb-2 w-full">
                <FormInput
                    id="title"
                    type="text"
                    placeholder="List title..."
                    className="w-full border-none bg-accent"
                    errors={fieldErrors}
                />
                {listType === Types.PACKING && (
                    <FormDatePicker
                        id="departAt"
                        date={date}
                        setDate={setDate}
                        className="w-full border-none bg-accent"
                    />
                )}
            </div>
            <FormSubmit
                className="w-full"
            >
                Create
            </FormSubmit>
        </form >

    )
}