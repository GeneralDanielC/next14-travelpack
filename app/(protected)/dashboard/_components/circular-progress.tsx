"use client";

import { ListWithItemsThemeAndType } from "@/types";
import { CircularProgress as CircularProgressbar } from "@nextui-org/react";
import { useEffect, useState } from "react";

interface CircularProgressProps {
    lists: ListWithItemsThemeAndType[];
}

export const CircularProgress = ({
    lists
}: CircularProgressProps) => {
    const [totalAmountChecked, setTotalAmountChecked] = useState(0);
    const [totalAmountItems, setTotalAmountItems] = useState(0);

    useEffect(() => {
        const countAmountChecked = () => {
            let amountChecked = 0;
            lists.map((list) => {
                list?.items.map((item) => {
                    if (item.isChecked) amountChecked += 1;
                })
            })
            return amountChecked;
        }

        const countAmountItems = () => {
            let amountItems = 0;
            lists.map((list) => {
                amountItems += list?.items.length;
            })
            return amountItems;
        }

        setTotalAmountChecked(countAmountChecked);
        setTotalAmountItems(countAmountItems)
    }, [lists]);

    return (
        <CircularProgressbar
            classNames={{
                svg: "w-full h-full",
                track: "stroke-black/10 dark:stroke-white/10",
                indicator: "stroke-black dark:stroke-white"
            }}
            value={totalAmountItems === 0 ? 0 : (totalAmountChecked / totalAmountItems) * 100}
            showValueLabel
        />
    )
}