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
                <div className="flex overflow-hidden max-w-full">
                    <Breadcrumb className="flex-1">
                        <BreadcrumbList className="flex-1 flex items-center overflow-hidden">
                            {!hideUser && (
                                <React.Fragment>
                                    <BreadcrumbItem className="flex-shrink-0">
                                        <BreadcrumbLink href={hideUser ? "/" : "/dashboard"}>pakkit</BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator className="flex-shrink-0" />
                                </React.Fragment>
                            )}
                            {breadcrumbs?.map((breadcrumb, index) => (
                                <React.Fragment key={index}>
                                    <BreadcrumbItem className="flex-shrink-0">
                                        <BreadcrumbLink className="truncate max-w-[100px]" href={breadcrumb.href}>{breadcrumb.name}</BreadcrumbLink>
                                    </BreadcrumbItem>
                                    {breadcrumbs.length - 1 !== index && <BreadcrumbSeparator className="flex-shrink-0" />}
                                </React.Fragment>
                            ))}
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
                <div className="flex items-center">
                    {!hideUser && (
                        <React.Fragment>
                            <ThemeToggle />
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
                        </React.Fragment>
                    )}
                </div>
            </div>
        </ShadCardHeader>
    )
}