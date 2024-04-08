import { Logo } from "@/components/logo"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import Link from "next/link"
import { MobileSidebar } from "./mobile-sidebar"
import { ListWithItemsAndTheme, ListWithItemsThemeAndType } from "@/types"
import { Theme } from "@prisma/client"

interface NavbarProps {
    lists: ListWithItemsThemeAndType[],
    themes: Theme[],
}

export const Navbar = ({
    lists,
    themes,
}: NavbarProps) => {
    return (
        <nav className="z-50 px-4 mt-3 w-full h-14 border-2 border-stone-400 shadow-sm flex items-center dark:bg-stone-700 dark:border-stone-500 bg-stone-200/90 rounded-lg space-x-2">
            <div className={"block md:hidden"}>
                <MobileSidebar themes={themes} lists={lists} />
            </div>

            <div className="md:max-w-screen-xl mx-auto flex items-center w-full justify-between">
                <div className="flex items-center gap-x-3">
                    <Button
                        className="bg-stone-100 hover:bg-stone-50 dark:bg-stone-600"
                        variant="ghost"
                        asChild
                    >
                        <Link href="/dashboard">
                            <span className="text-2xl pr-1">🌴</span>
                            <span>travelsize</span>
                        </Link>
                    </Button>
                </div>
            </div>
        </nav>
    )
}