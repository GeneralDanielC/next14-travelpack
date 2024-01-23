import { db } from "@/lib/db";
import { ListCard } from "./_components/list-card";
import { currentUser } from "@/lib/auth";

interface ListPageProps {
    params: {
        listId: string;
    }
}

const ListPage = async ({
    params
}: ListPageProps) => {
    const user = await currentUser();

    const list = await db.list.findUnique({
        where: {
            id: params.listId,
            userId: user?.id,
        },
        include: {
            items: {
                include: {
                    category: true,
                },
            },
            theme: true,
        }
    });    

    const themes = await db.theme.findMany();

    const categories = await db.category.findMany({
        where: {
            userId: user?.id,
        },
    });

    const totalCountChecked = await db.item.count({
        where: {
            listId: params.listId,
            isChecked: true
        }
    });    

    if (!list) {
        return (
            <div>No list found</div>
        )
    }

    return (
        <ListCard data={list} themes={themes} totalCountChecked={totalCountChecked} categories={categories} />
    );
}

export default ListPage;