import { Navbar } from "@/app/(public)/_components/navbar";

const MarketingLayout = ({
    children
}: { children: React.ReactNode }) => {
    return (
        <div className="h-full bg-neutral-100 dark:bg-stone-900">
            <Navbar />
            <main className="pt-40 pb-20 h-full bg-neutral-100 dark:bg-stone-900">
                {children}
            </main>
            {/* <Footer /> */}
        </div>
    );
}

export default MarketingLayout;