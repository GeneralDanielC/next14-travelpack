import { Logo } from "@/components/logo"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"

export const Navbar = () => {
    return (
        <div className="fixed z-50 px-4 top-0 w-full h-14 border-b shadow-sm flex items-center dark:bg-stone-500 bg-stone-300/90 rounded-b-lg">
            <div className="md:max-w-screen-xl mx-auto flex items-center w-full justify-between">
                <Logo />
                <div className="flex items-center gap-x-2">
                    <ThemeToggle />
                </div>
            </div>
        </div>
    )
}