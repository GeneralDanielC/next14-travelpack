"use client";

import { ListWithItemsThemeAndType } from "@/types";
import { CircularProgress as CircularProgressbar } from "@nextui-org/react";
import { useEffect } from "react";

interface CircularProgressProps {
    lists: ListWithItemsThemeAndType[];
}

export const CircularProgress = ({
    lists
}: CircularProgressProps) => {
    let totalAmountChecked = 0;
    let totalAmountItems = 0;

    // useEffect(() => {

    // }, [lists]);
    
    lists.map((list) => {
        if (list.items) totalAmountItems += 1;
        list.items.map((item) => {
            if (item.isChecked) totalAmountChecked += 1;
        })
    })

    return (
        <CircularProgressbar
            classNames={{
                svg: "w-full h-full",
                track: "stroke-black/10 dark:stroke-white/10"
            }}
            value={(totalAmountChecked / totalAmountItems) * 100}
            showValueLabel
        />
    )
}