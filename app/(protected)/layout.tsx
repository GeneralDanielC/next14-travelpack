import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";

const DashboardLayout = ({
    children
}: { children: React.ReactNode }) => {
    return (
        <>
            {/* <Navbar /> */}
            <main className="xs:pt-20 sm:py-5 px-4 max-w-6xl 2xl:max-w-screen-xl mx-auto h-full">
                <div className="flex gap-x-7 h-full">
                    <div className="w-64 shrink-0 hidden md:block">
                        {/* Sidebar */}
                        <Sidebar />
                    </div>
                    {children}
                </div>
            </main>
        </>
    );
}

export default DashboardLayout;