
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
        <Card className="w-full">
            <CardHeader>
                <h1>Lists</h1>
            </CardHeader>
            <CardContent>
                <form>
                    <FormPicker 
                        id="theme"
                        // errors={}
                    />
                    <FormInput
                        id="title"
                        label="List Title"
                        type="text"
                        // errors={}
                    />
                    <FormSubmit>
                        Create
                    </FormSubmit>
                </form>
                <div className="w-full flex flex-col gap-y-2">
                    {lists.length > 0 ? lists.map((list) => (
                        <ListItem list={list} />
                    )) : <h1>none...</h1>}
                </div>
            </CardContent>
        </Card>
    );
}

export default DashboardPage;