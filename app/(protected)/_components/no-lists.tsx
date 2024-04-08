import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils";

interface NoListProps {
    centered?: boolean;
}

export const NoLists = ({ centered }: NoListProps) => {
    return (
        <Button
            variant="ghost"
            className={"space-y-4 w-full flex items-center justify-start p-1.5 h-auto dark:bg-stone-800"}
            asChild
        >
            <div className="flex flex-col w-full gap-y-1">
                <div className={cn(
                    "flex items-center gap-x-2",
                    !centered && "w-full"
                )}>
                    <span className="text-2xl rounded-full flex items-center justify-center w-10 h-10 bg-stone-100 dark:bg-stone-500">
                        👀
                    </span>
                    <span className="text-md">No lists yet.</span>
                </div>
            </div>
        </Button>
    )
}