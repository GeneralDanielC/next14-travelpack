import { Navbar } from "@/app/(public)/_components/navbar";

const MarketingLayout = ({
    children
}: { children: React.ReactNode }) => {
    return (
        <div className="h-full w-full flex flex-col items-center justify-center px-4">
            <Navbar />
            <main className="flex flex-col items-center justify-center h-full w-full">
                {children}
            </main>
            {/* <Footer /> */}
        </div>
    );
}

export default MarketingLayout;