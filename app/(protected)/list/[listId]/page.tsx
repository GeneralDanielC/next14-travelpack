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

    const totalCountChecked = await db.item.count({
        where: {
            listId: params.listId,
            isChecked: true
        }
    });

    console.log(list);
    

    if (!list) {
        return (
            <div>No list found</div>
        )
    }

    return (
        <ListCard data={list} totalCountChecked={totalCountChecked} />
    );
}

export default ListPage;