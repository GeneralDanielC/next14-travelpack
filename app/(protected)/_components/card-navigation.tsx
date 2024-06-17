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
import React from "react";

type Breadcrumbs = {
    name: string,
    href: string,
}

interface CardNavigationProps {
    user?: ExtendedUser,
    breadcrumbs?: Breadcrumbs[],
    hideUser?: boolean,
}

export const CardNavigation = ({
    user,
    breadcrumbs,
    hideUser
}: CardNavigationProps) => {

    return (
        <ShadCardHeader className="pb-0">
            <div className="flex flex-row justify-between items-center">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href={hideUser ? "/" : "/dashboard"}>pakkit</BreadcrumbLink>
                        </BreadcrumbItem>
                        {!hideUser && (
                            <BreadcrumbSeparator />
                        )}
                        {breadcrumbs?.map((breadcrumb, index) => (
                            <React.Fragment key={index}>
                                <BreadcrumbItem>
                                    <BreadcrumbLink href={breadcrumb.href}>{breadcrumb.name}</BreadcrumbLink>
                                </BreadcrumbItem>
                                {breadcrumbs.length - 1 !== index && <BreadcrumbSeparator />}
                            </React.Fragment>
                        ))}

                    </BreadcrumbList>
                </Breadcrumb>
                <div className="flex items-center">
                    <ThemeToggle />
                    {!hideUser && (
                        <Button
                            variant="ghost"
                            size="icon"
                            asChild
                        >
                            <Link prefetch={true} href="/settings/user">
                                <Avatar className="h-5 w-5">
                                    <AvatarImage src={user?.image || ""} />
                                    <AvatarFallback>
                                        <User2Icon className="size-5" />
                                    </AvatarFallback>
                                </Avatar>
                            </Link>
                        </Button>
                    )}
                </div>
            </div>
        </ShadCardHeader>
    )
}