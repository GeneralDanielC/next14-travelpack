import { PreviewSidebar } from "./_components/preview-sidebar";

const PreviewLayout = ({
    children
}: { children: React.ReactNode }) => {
    return (
        <div className="overflow-hidden w-[100vw] h-full">
            <div className="absolute inset-0 flex flex-col justify-between">
                <div className="bg-stone-500/40 dark:bg-stone-900 blur-3xl size-52 sm:size-64 ml-36 sm:ml-40"></div>
                <div className="bg-stone-400/50 dark:bg-stone-600/70 blur-3xl size-48 md:size-64 ml-48 md:ml-60"></div>
                <div className="bg-stone-300/70 dark:bg-stone-700/50 blur-3xl ml-4 size-64"></div>
            </div>
            <div className="relative z-10 h-full">
                <main className="max-w-6xl 2xl:max-w-screen-xl mx-auto h-full">
                    <div className="flex h-full">
                        {/* Sidebar */}
                        <PreviewSidebar />

                        {children}
                    </div>
                </main>
            </div>

        </div>
    );
}

export default PreviewLayout;