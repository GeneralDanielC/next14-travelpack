import { db } from "@/lib/db";
import { List } from "@prisma/client";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useParams } from "next/navigation";
import { PreviewCard } from "./_components/preview-card";
import { getListByIdAndUserId } from "@/data/data";
import { FullscreenError } from "@/app/(protected)/_components/fullscreen-error";



const PreviewListPage = async ({
    params,
}: {
    params: { listId: string, userId: string }
}) => {

    const list = await getListByIdAndUserId(params.listId, params.userId);

    const totalCountChecked = await db.item.count({
        where: {
            listId: params.listId,
            isChecked: true
        }
    });

    if (!list || !totalCountChecked) {
        return <FullscreenError code={404} heading="Not found" message="The list you were looking for could not be found." />
    }

    return (
        <PreviewCard data={list} totalCountChecked={totalCountChecked} />
    );
}

export default PreviewListPage;