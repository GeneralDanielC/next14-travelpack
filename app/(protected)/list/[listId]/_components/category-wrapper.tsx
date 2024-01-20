"use client";

import { RxDotsHorizontal } from "react-icons/rx";
import { Category } from "@prisma/client";

import {
    AccordionContent, 
    AccordionItem, 
    AccordionTrigger
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";


interface CategoryWrapperProps {
    category: Category;

}

export const CategoryWrapper = () => {


    return (
        <AccordionItem value="1" className="border-none mb-2">
            <AccordionTrigger
                className="flex items-center gap-x-2 p-1.5 text-neutral-700 rounded-md hover:bg-neutral-500/10 transition text-start no-underline hover:no-underline bg-stone-100"
            >
                <div className="w-full flex flex-row justify-between items-center">
                    <span>Necessär</span>
                    <span>6 / 10</span>
                </div>
            </AccordionTrigger>
            <AccordionContent className="pt-1">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-4">
                    <div className="flex items-center gap-x-0.5">
                        <Button size="sm" variant="ghost" className="w-full flex flex-row items-center justify-between">
                            <div className="flex flex-row items-center gap-x-2">
                                <Checkbox />
                                <span>Rakblad</span>
                            </div>
                            <div className="flex flex-row items-center gap-x-2">
                                <Badge className="">4</Badge>
                            </div>
                        </Button>
                        <Button
                            size="sm"
                            variant="ghost"
                        >
                            <RxDotsHorizontal />
                        </Button>
                    </div>

                    <Button size="sm" variant="ghost" className="w-full flex flex-row items-center justify-start gap-x-2">
                        <Checkbox />
                        <span>Rakhyvel</span>
                    </Button>
                    <Button size="sm" variant="ghost" className="w-full flex flex-row items-center justify-start gap-x-2">
                        <Checkbox />
                        <span>Torrschampo</span>
                    </Button>
                    <Button size="sm" variant="ghost" className="w-full flex flex-row items-center justify-between">
                        <div className="flex flex-row items-center gap-x-2">
                            <Checkbox />
                            <span>Tofsar</span>
                        </div>
                        <div className="flex flex-row items-center gap-x-2">
                            <Badge className="">6</Badge>
                        </div>
                    </Button>
                    <Button size="sm" variant="ghost" className="w-full flex flex-row items-center justify-start gap-x-2">
                        <Checkbox />
                        <span>Deodorant</span>
                    </Button>
                </div>
            </AccordionContent>
        </AccordionItem>
    )
}