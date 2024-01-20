"use client";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";

export const Navbar = () => {
    return (
        <div className="fixed top-[10px] w-[95%] md:w-[70%] left-[50%] translate-x-[-50%] h-16 px-4 shadow-sm bg-gradient-to-tr from-stone-200/90 to-rose-200 dark:bg-gradient-tor-tr dark:from-stone-800/90 dark:to-rose-600/80 flex items-center rounded-full">
            <div className="md:max-w-screen-xl mx-auto flex items-center w-full justify-between">
                <Logo />
                <div className="flex items-center gap-x-2">
                    <ThemeToggle />
                    <Button variant="filled" >
                        Login
                    </Button>
                </div>
            </div>
        </div>
    )
}
