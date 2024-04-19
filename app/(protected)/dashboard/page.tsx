
import {
    Card,
    CardContent,
    CardHeader as ShadcnCardHeader,
} from "@/components/ui/card";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { ListItem } from "./_components/list-item";

import { Button } from "@/components/ui/button";
import { ListFormDrawer } from "./_components/list-form-drawer";
import { NoLists } from "../_components/no-lists";

import { Types } from "@/types";
import { CardNavigation } from "@/app/(protected)/_components/card-navigation";
import { getListSharesByUserId, getListsByUserId, getThemes, getTypes } from "@/data/data";
import { CalendarDaysIcon, CheckCircleIcon, InfoIcon, PlusIcon } from "lucide-react";
import { Chart } from "./_components/chart";
import { CircularProgress } from "./_components/circular-progress";
import Link from "next/link";

const DashboardPage = async () => {
    const user = await currentUser();
    if (!user) {
        return <p>unauthorized</p>
    }

    const lists = await getListsByUserId(user.id);

    const themes = await getThemes();

    const types = await getTypes();

    lists.sort((a, b) => +new Date(b.updatedAt) - +new Date(a.updatedAt));

    const listsWithDepartAt = lists.filter((list) => list.departAt);
    const sortedListsDepartAt = listsWithDepartAt.sort((a, b) => {
        return +new Date(a.departAt!) - +new Date(b.departAt!);
    })

    let packingAmount = 0;
    let todoAmount = 0;
    let groceryAmount = 0;

    lists.map((list) => {
        if (list.type.title === Types.PACKING) packingAmount += 1;
        if (list.type.title === Types.TODO) todoAmount += 1;
        if (list.type.title === Types.GROCERY) groceryAmount += 1;
    });

    const chartData = [
        { name: "Packing", value: packingAmount, color: "#bae6fd" },
        { name: "Todo", value: todoAmount, color: "#bbf7d0" },
        { name: "Grocery", value: groceryAmount, color: "#fda4af" },
    ];

    return (
        <div className="flex flex-col items-center w-full gap-y-2">
            <Card className="w-full h-full flex flex-col rounded-l-3xl rounded-r-none xl:rounded-r-3xl shadow-none border-none">
                <CardNavigation
                    user={user}
                    breadcrumbs={[
                        {
                            name: "Dashboard",
                            href: "/dashboard",
                        }
                    ]}
                />
                <ShadcnCardHeader>
                    <h1 className="font-bold text-2xl">Dashboard</h1>
                </ShadcnCardHeader>

                <CardContent className="h-full overflow-y-scroll flex flex-col space-y-3 xs:flex-col-reverse">
                    <div className="flex flex-row items-center justify-between gap-3">
                        <div className="flex flex-col w-full h-full gap-3">
                            <div className="flex flex-row w-full h-full gap-3">
                                <div className="bg-stone-100 dark:bg-stone-800 rounded-xl w-full h-full flex flex-col p-2">
                                    <div className="flex flex-row gap-x-1 items-center">
                                        <CheckCircleIcon className="size-4" />
                                        <span className="text-xs">Done</span>
                                    </div>
                                    <div className="h-full flex items-center">
                                        <CircularProgress lists={lists} />
                                    </div>
                                </div>
                                <div className="bg-stone-100 dark:bg-stone-800 rounded-xl w-full h-full flex flex-col p-2">
                                    <div className="flex flex-row gap-x-1 items-center">
                                        <InfoIcon className="size-4" />
                                        <span className="text-xs">Tips</span>
                                    </div>
                                    <div className="h-full flex items-center">
                                        <span className="text-xs">
                                            Different list types provides different categorization.
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-stone-100 dark:bg-stone-800 rounded-xl w-full h-full flex flex-col p-2">
                                <div className="flex flex-row gap-x-1 items-center">
                                    <CalendarDaysIcon className="size-4" />
                                    <span className="text-xs">Upcoming</span>
                                </div>
                                <div className="h-full flex flex-col items-center justify-center">
                                    {sortedListsDepartAt.map((list, index) => {
                                        if (list.type.title === Types.PACKING && list.departAt && index < 3) {
                                            return (
                                                <Button
                                                    variant="ghost"
                                                    className="flex flex-row items-center gap-x-2 justify-start w-full pl-0"
                                                    asChild
                                                >
                                                    <Link href={`/lists/${list.id}`}>
                                                        <div className="bg-stone-200 dark:bg-stone-700 p-1 text-xs rounded-lg">
                                                            {new Date(list.departAt).toLocaleString("sv-SV", { day: "2-digit", month: "long" })}
                                                        </div>
                                                        <span className="text-xs">
                                                            {list.title}
                                                        </span>
                                                    </Link>
                                                </Button>

                                            )
                                        }
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className="bg-stone-100 dark:bg-stone-800 rounded-xl p-2 hidden sm:flex flex-col justify-center items-center w-full h-full">
                            <Chart chartData={chartData} />
                            <div className="flex flex-row items-center gap-x-2">
                                <div className="flex flex-row items-center gap-x-1">
                                    <div className="size-5 bg-sky-200 rounded-lg"></div>
                                    <span className="text-xs">Packing</span>
                                </div>
                                <div className="flex flex-row items-center gap-x-1">
                                    <div className="size-5 bg-green-200 rounded-lg"></div>
                                    <span className="text-xs">Grocery</span>
                                </div>
                                <div className="flex flex-row items-center gap-x-1">
                                    <div className="size-5 bg-rose-300 rounded-lg"></div>
                                    <span className="text-xs">Todo</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h1 className="text-xl font-bold">Recently used</h1>
                        <div className="w-full mt-3 grid sm:grid-cols-2 gap-3 pb-3">
                            <ListFormDrawer themes={themes} types={types}>
                                <Button
                                    className="bg-green-400 rounded-lg p-1.5 hover:bg-green-400/80 h-16"
                                    size="lg"
                                >
                                    <div className="flex flex-row items-center gap-x-1">
                                        <PlusIcon />
                                        <span>Create New List</span>
                                    </div>
                                </Button>
                            </ListFormDrawer>
                            {lists.length > 0 ? lists.map((list, index) => {
                                if (index < 5) {
                                    return (
                                        <ListItem key={list.id} list={list} />
                                    )
                                }
                            }) : (
                                <NoLists centered />
                            )}

                        </div>
                        {lists.length > 0 && (
                            <Button
                                variant="ghost"
                                className="w-full"
                                asChild
                            >
                                <Link href="/lists">
                                    See more...
                                </Link>
                            </Button>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default DashboardPage;