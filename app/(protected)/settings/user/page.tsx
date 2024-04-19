import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader as ShadcnCardHeader } from "@/components/ui/card";
import { UserSettingsForm } from "@/components/user-settings-form";
import Link from "next/link";
import { FaAngleLeft } from "react-icons/fa";
import { CardNavigation } from "../../_components/card-navigation";
import { currentUser } from "@/lib/auth";

const SettingsPage = async () => {
    const user = await currentUser();

    if (!user) {
        return <p>unauthorized</p>
    }

    return (
        <Card className="w-full h-full flex flex-col rounded-l-3xl rounded-r-none shadow-none border-none">
            <CardNavigation 
                user={user}
                breadcrumbs={[
                    {
                        name: "Settings",
                        href: "/settings/user"
                    }
                ]}
            />
            <ShadcnCardHeader>
                {/* <div className="flex items-center justify-start">
                    <Button size="sm" variant="ghost" asChild>
                        <Link href="/dashboard">
                            <FaAngleLeft className="w-4 h-4" />
                            Back
                        </Link>
                    </Button>
                </div> */}
                <h1 className="text-2xl font-bold"> Settings</h1>
            </ShadcnCardHeader>
            <CardContent>
                <UserSettingsForm />
            </CardContent>
        </Card>
    );
}

export default SettingsPage;