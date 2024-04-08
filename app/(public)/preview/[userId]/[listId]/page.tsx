import { db } from "@/lib/db";
import { List } from "@prisma/client";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useParams } from "next/navigation";

interface PreviewListPageProps {
    list: List;
}

const PreviewListPage = ({ list }: PreviewListPageProps) => {

    return (
        <div>
            {list.id}/
            {list.userId}
        </div>
    );
}

export default PreviewListPage;


// export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
//     const { userId, listId } = context.params;


//     const list = await db.list.findUnique({
//         where: {
//             userId: userId,
//             id: listId
//         }
//     })

//     return { props: { list } };
// };
