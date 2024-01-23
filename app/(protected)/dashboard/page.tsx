
import Link from "next/link";
import { redirect, useParams } from "next/navigation";

import {
    Card,
    CardContent,
    CardHeader
} from "@/components/ui/card";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { ListItem } from "./_components/list-item";
import { FormInput } from "@/components/form/form-input";
import { FormPicker } from "@/components/form/form-picker";
import { FormSubmit } from "@/components/form/form-submit";
import { FormDatePicker } from "@/components/form/form-date-picker";
import { ListForm } from "./_components/list-form";

import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { PlusIcon } from "@radix-ui/react-icons";
import { ListFormDrawer } from "./_components/list-form-drawer";

const DashboardPage = async () => {
    const user = await currentUser();
    if (!user) {
        return <p>unauthorized</p>
    }

    const lists = await db.list.findMany({
        where: {
            userId: user.id
        },
        include: {
            items: true,
            theme: true,
        },
    });

    const themes = await db.theme.findMany();

    return (
        <Card className="w-full flex flex-col mt-0">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Lists</h1>
                    <ListFormDrawer themes={themes} />
                </div>
            </CardHeader>
            <CardContent>
                {/* <ListForm data={themes} /> */}

                <div className="w-full mt-2 flex flex-col gap-y-2">
                    {lists.length > 0 ? lists.map((list) => (
                        <ListItem key={list.id} list={list} />
                    )) : <h1>none...</h1>}
                </div>
            </CardContent>
        </Card>
    );
}

export default DashboardPage;