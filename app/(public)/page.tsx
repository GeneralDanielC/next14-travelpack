import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const MarketingPage = async () => {
    
    return (
        <div className="w-full space-y-14">
            <div className="flex items-center justify-center flex-col">
                <div className="flex items-center justify-center flex-col mb-10 gap-y-2">
                    <Badge>
                        pakkit
                    </Badge>
                    <h1 className="text-3xl md:text-6xl text-center font-extrabold text-stone-700 dark:text-stone-200">
                        <span>Pack </span>
                        <span className="bg-gradient-to-r from-stone-400 to-stone-300 text-transparent bg-clip-text">
                            Smart,
                        </span>
                        <span> Travel </span>
                        <span className="bg-gradient-to-r from-stone-300 to-stone-400 text-transparent bg-clip-text">
                            Light.
                        </span>


                    </h1>
                    <h2 className="mb-6 text-2xl md:text-5xl text-center font-semibold text-stone-600 dark:text-stone-400">
                        Lists made easy.
                    </h2>
                    <div className="text-3xl md:text-4xl bg-gradient-to-r from-stone-500 to-stone-300 text-transparent bg-clip-text px-4 p-2 rounded-md w-fit font-extrabold">
                        pakkit, lystio, .
                    </div>
                </div>
                <div className="flex items-center justify-center flex-row gap-x-5">
                    <Button variant="filled" asChild>
                        <Link prefetch={true} href="/auth/register">
                            Get started
                        </Link>
                    </Button>
                    <Button variant="outline" asChild>
                        <Link prefetch={true} href="/auth/login">
                            Sign in
                        </Link>
                    </Button>
                </div>

            </div>
            <div className="w-full h-full bg-stone-400/40 rounded-t-3xl">
                <div className="p-4">
                    <h2 className="text-lg font-bold">test</h2>
                </div>
                <footer className="w-full h-full bg-white rounded-t-3xl">

                </footer>
            </div>

        </div>
    );
}

export default MarketingPage;