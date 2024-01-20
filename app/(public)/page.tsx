"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const MarketingPage = async () => {

    return (
        <div className="flex items-center justify-center flex-col">
            <div className="flex items-center justify-center flex-col mb-10 gap-y-2">
                <Badge variant="filled">
                    Travelpack (travelsize?)
                </Badge>
                <h1 className="text-3xl md:text-6xl text-center font-extrabold text-stone-800 dark:text-stone-200">
                    <span>Pack </span>
                    <span className="bg-gradient-to-r from-rose-600 to-rose-400 text-transparent bg-clip-text">
                        Smart,
                    </span>
                    <span> Travel </span>
                    <span className="bg-gradient-to-r from-rose-300 to-rose-400 text-transparent bg-clip-text">
                        Light.
                    </span>


                </h1>
                <h2 className="mb-6 text-2xl md:text-5xl text-center font-semibold text-stone-600 dark:text-stone-400">
                    The Ultimate Packing Web App.
                </h2>
                <div className="text-3xl md:text-4xl bg-gradient-to-r from-rose-600 to-rose-400 text-transparent bg-clip-text px-4 p-2 rounded-md w-fit font-extrabold">
                    TRAVELPACK
                </div>
            </div>
            <div className="flex items-center justify-center flex-row gap-x-5">
                <Button variant="filled" asChild>
                    <Link href="/auth/register">
                        Get started
                    </Link>
                </Button>
                <Button variant="default" className="bg-stone-500" asChild>
                    <Link href="/auth/login">
                        Sign in
                    </Link>
                </Button>
            </div>
        </div>
    );
}

export default MarketingPage;