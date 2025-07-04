import { currentUser } from "@/lib/auth";
import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";
import { db } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { ModalProvider } from "@/components/providers/modal-provider";
import { getListsByUserId } from "@/data/data";
import { FullscreenError } from "./_components/fullscreen-error";

const DashboardLayout = async ({
    children
}: { children: React.ReactNode }) => {
    const user = await currentUser();

    if (!user) {
        return <FullscreenError code={400} heading="Unauthorized" message="You don't have permission to view this page." />
    }

    const lists = await getListsByUserId(user.id)

    const themes = await db.theme.findMany({
        where: { isListType: false }
    });

    const types = await db.theme.findMany({
        where: { isListType: true }
    })

    return (
        <div className="overflow-hidden h-full">
            <div className="absolute h-full inset-0 flex flex-col justify-between">
                <div className="bg-stone-500/40 dark:bg-stone-900 blur-3xl size-52 sm:size-64 ml-36 sm:ml-40"></div>
                <div className="bg-stone-400/50 dark:bg-stone-600/70 blur-3xl size-48 md:size-64 ml-48 md:ml-60"></div>
                <div className="bg-stone-300/70 dark:bg-stone-700/50 blur-3xl ml-4 size-30"></div>
            </div>
            <div className="relative z-10 h-full">
                {/* <div className="px-4">
                    <Navbar lists={lists} themes={themes} />
                </div> */}
                <main className="max-w-6xl 2xl:max-w-screen-xl mx-auto h-full">
                    <div className="flex h-full">
                        {/* Sidebar */}
                        <Sidebar lists={lists} themes={themes} types={types} />

                        {children}
                    </div>
                </main>
            </div>
            <ModalProvider />
        </div>
    );
}

export default DashboardLayout;