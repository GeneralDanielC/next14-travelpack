import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader as ShadcnCardHeader } from "@/components/ui/card";
import Link from "next/link";
import { FaAngleLeft } from "react-icons/fa";
import { CardHeader } from "../../_components/card-header";
import { currentUser } from "@/lib/auth";
import { getCategoriesByUserId } from "@/data/data";
import { ArrowRightIcon } from "lucide-react";
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
                <CardHeader
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
                <CardContent className="h-full overflow-y-scroll">
                    <div className="w-full mt-2 flex flex-col gap-y-2 bg-accent p-2">
                        You can rename categories to a similar name. However, you can only change the display name.
                    </div>
                    
                    <span>search</span>
                    <CategoryCommand categories={categories} />


                </CardContent>
            </Card>
        </div>
    );
}

export default CategoriesPage;