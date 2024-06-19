import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader as ShadcnCardHeader } from "@/components/ui/card";
import Link from "next/link";
import { FaAngleLeft } from "react-icons/fa";
import { CardNavigation } from "../../_components/card-navigation";
import { currentUser } from "@/lib/auth";
import { getCategoriesByUserId, getListTypeIds, getListTypes } from "@/data/data";
import { ArrowRightIcon, InfoIcon } from "lucide-react";
import { CategoryCommand } from "./_components/category-command";
import { CategoryCreateForm } from "./_components/category-create-form";
import { Types } from "@/types";

const CategoriesPage = async () => {
    const user = await currentUser();

    if (!user) {
        return <p>unauthorized</p>
    }

    const categories = await getCategoriesByUserId(user.id);

    const listTypes = await getListTypes();

    const listTypeIds = listTypes.reduce((acc, listType) => {
        if (listType.title === Types.PACKING) {
            acc.listTypePackingId = listType.id;
        } else if (listType.title === Types.GROCERY) {
            acc.listTypeGroceryId = listType.id;
        } else if (listType.title === Types.TODO) {
            acc.listTypeTodoId = listType.id;
        }
        return acc;
    }, {
        listTypePackingId: '',
        listTypeGroceryId: '',
        listTypeTodoId: ''
    });
    
    const { listTypePackingId, listTypeGroceryId, listTypeTodoId } = listTypeIds;

    const packingCategories = categories.filter(category => category.listTypeId === listTypePackingId).sort((a, b) => a.displayName.localeCompare(b.displayName));


    const groceryCategories = categories.filter(category => category.listTypeId === listTypeGroceryId).sort((a, b) => a.displayName.localeCompare(b.displayName));

    const todoCategories = categories.filter(category => category.listTypeId === listTypeTodoId).sort((a, b) => a.displayName.localeCompare(b.displayName));

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
                    <CategoryCreateForm listTypes={listTypes}  />
                    <CategoryCommand categories={{ packingCategories, groceryCategories, todoCategories }} />

                </CardContent>
            </Card>
        </div>
    );
}

export default CategoriesPage;