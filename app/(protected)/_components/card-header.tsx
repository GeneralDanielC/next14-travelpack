"use client";

import {
    CardHeader as ShadCardHeader
} from "@/components/ui/card";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User2Icon } from "lucide-react";
import { ExtendedUser } from "@/auth";

type Breadcrumbs = {
    name: string,
    href: string,
}

interface CardHeaderProps {
    user: ExtendedUser,
    breadcrumbs: Breadcrumbs[],
}

export const CardHeader = ({
    user,
    breadcrumbs
}: CardHeaderProps) => {

    return (
        <ShadCardHeader className="pb-0">
            <div className="flex flex-row justify-between items-center">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">travelsize</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        {breadcrumbs.map((breadcrumb, index) => (
                            <>
                                <BreadcrumbItem>
                                    <BreadcrumbLink href={breadcrumb.href}>{breadcrumb.name}</BreadcrumbLink>
                                </BreadcrumbItem>
                                {breadcrumbs.length - 1 !== index && <BreadcrumbSeparator />}
                            </>
                        ))}

                    </BreadcrumbList>
                </Breadcrumb>
                <div className="flex items-center">
                    <ThemeToggle />
                    <Button
                        variant="ghost"
                        size="icon"
                        asChild
                    >
                        <Link href="/settings/user">
                            <Avatar className="h-5 w-5">
                                <AvatarImage src={user?.image || ""} />
                                <AvatarFallback>
                                    <User2Icon className="size-5" />
                                </AvatarFallback>
                            </Avatar>
                        </Link>
                    </Button>
                </div>
            </div>
        </ShadCardHeader>
    )
}