import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader as ShadcnCardHeader } from "@/components/ui/card";
import Link from "next/link";
import { FaAngleLeft } from "react-icons/fa";
import { CardNavigation } from "../../_components/card-navigation";
import { currentUser } from "@/lib/auth";
import { getCategoriesByUserId } from "@/data/data";
import { ArrowRightIcon, InfoIcon } from "lucide-react";
import { CategoryCommand } from "./_components/category-command";

const CategoriesPage = async () => {
    const user = await currentUser();

    if (!user) {
        return <p>unauthorized</p>
    }

    const categories = await getCategoriesByUserId(user.id);

    categories.sort((a, b) => a.displayName.localeCompare(b.displayName));

    return (
        <div className="flex flex-col items-center w-full gap-y-2">
            <Card className="w-full h-full flex flex-col rounded-l-3xl rounded-r-none shadow-none border-none">
                <CardNavigation
                    user={user}
                    breadcrumbs={[
                        {
                            name: "Categories",
                            href: "/settings/categories",
                        }
                    ]}
                />
                <ShadcnCardHeader>
                    <h1 className="text-2xl font-bold">Categories</h1>
                </ShadcnCardHeader>
                <CardContent className="h-full overflow-y-scroll space-y-2">
                    {/* <div className="w-full mt-2 flex flex-row gap-x-1 items-center bg-accent p-2 rounded-lg">
                        <InfoIcon className="size-5" />
                        <span className="text-xs">
                            You can rename categories to a similar one. The essence needs to be the same.
                        </span>
                    </div> */}

                    <CategoryCommand categories={categories} />


                </CardContent>
            </Card>
        </div>
    );
}

export default CategoriesPage;