import { currentUser } from "@/lib/auth";
import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";
import { db } from "@/lib/db";

const DashboardLayout = async ({
    children
}: { children: React.ReactNode }) => {
    const user = await currentUser();
    const lists = await db.list.findMany({
        where: {
            userId: user?.id,
        },
        include: {
            theme: true,
            items: true,
        }
    });

    const themes = await db.theme.findMany();    

    return (
        <div className="overflow-hidden h-full">
            <div className="px-4">
                <Navbar lists={lists} themes={themes} />
            </div>
            <main className="pt-3 px-4 max-w-6xl 2xl:max-w-screen-xl mx-auto h-full pb-20">
                <div className="flex gap-x-5 h-full">
                    <div className="w-64 shrink-0 hidden md:block">
                        {/* Sidebar */}
                        <Sidebar lists={lists} themes={themes} />
                    </div>
                    {children}
                </div>
            </main>
        </div>
    );
}

export default DashboardLayout;