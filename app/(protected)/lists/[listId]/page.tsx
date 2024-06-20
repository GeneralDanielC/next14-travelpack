import { db } from "@/lib/db";
import { ListCard } from "./_components/list-card";
import { currentUser } from "@/lib/auth";
import { getCategoriesByUserId, getListByIdAndUserId, getThemes } from "@/data/data";
import { FullscreenError } from "../../_components/fullscreen-error";

interface ListPageProps {
    params: {
        listId: string;
    }
}

const ListPage = async ({
    params
}: ListPageProps) => {
    const user = await currentUser();

    if (!user) {
        return <FullscreenError code={401} heading="Unauthorized" message="It seems as if you don't have access to this page." />;
    }

    const list = await getListByIdAndUserId(params.listId, user?.id);    

    if (!list) {
        return <FullscreenError code={404} heading="Not Found" message="The list you were looking for could not be found." />
    }

    const themes = await getThemes();
    
    const categories = await getCategoriesByUserId(list.userId);

    // const suggestions = await db.suggestion.findMany({
    //     where: {
    //         userId: user.id,
    //         themeIds: {
    //             has: list.themeId
    //         }
    //     },
    //     include: {
    //         category: true,
    //         themes: true,
    //     }
    // });

    return (
        <ListCard list={list} themes={themes} categories={categories} />
    );
}

export default ListPage;