import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader as ShadcnCardHeader } from "@/components/ui/card";
import Link from "next/link";
import { CardHeader } from "../_components/card-header";
import { currentUser } from "@/lib/auth";
import { getListsByUserId } from "@/data/data";
import { ListWithItemsThemeAndType, Types } from "@/types";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ListItem } from "../dashboard/_components/list-item";
import { ListsList } from "./_components/lists-list";

const ListsPage = async () => {
    const user = await currentUser();

    if (!user) {
        return <p>unauthorized</p>
    }

    const lists = await getListsByUserId(user.id);



    return (
        <div className="flex flex-col items-center w-full gap-y-2">
            <Card className="w-full h-full flex flex-col rounded-l-3xl rounded-r-none shadow-none border-none">
                <CardHeader
                    user={user}
                    breadcrumbs={[
                        {
                            name: "Lists",
                            href: "/lists",
                        }
                    ]}
                />
                <ShadcnCardHeader>
                    <h1 className="text-2xl font-bold">Lists</h1>
                </ShadcnCardHeader>
                <CardContent className="h-full overflow-y-scroll">
                    <ListsList lists={lists} />
                </CardContent>
            </Card>
        </div>
    );
}

export default ListsPage;