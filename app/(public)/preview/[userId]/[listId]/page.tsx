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

    if (!list) {
        return <FullscreenError code={404} heading="Not found" message="The list you were looking for could not be found." />
    }
    
    const totalCountChecked = list.items.reduce((count, item) => {
        if (item.isChecked) {
            count++;
        }
        return count;
    }, 0);

    return (
        <div className="pt-3 w-full h-full">
            <PreviewCard data={list} totalCountChecked={totalCountChecked} />
        </div>
    );
}

export default PreviewListPage;