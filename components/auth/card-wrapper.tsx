"use client";

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Social } from "@/components/auth/social";
import { BackButton } from "@/components/auth/back-button";

interface CardWrapperProps {
    children: React.ReactNode;
    headerLabel: string;
    backButtonLabel: string;
    backButtonHref: string;
    showSocial?: boolean;
}

export const CardWrapper = ({
    children,
    headerLabel,
    backButtonLabel,
    backButtonHref,
    showSocial
}: CardWrapperProps) => {
    return (
        <Card className="w-[400px] shadow-md">
            <CardHeader>
                <h1 className="font-extrabold text-2xl">
                    {headerLabel}
                </h1>
            </CardHeader>
            {/* CardContent component wrapping the children passed to this CardWrapper component. */}
            <CardContent>
                {children}
            </CardContent>
            {showSocial && (
                <CardFooter>
                    {/* Separate component */}
                    <Social />
                </CardFooter>
            )}
            <CardFooter>
                {/* Separate component */}
                <BackButton
                    label={backButtonLabel}
                    href={backButtonHref}
                />
            </CardFooter>
        </Card>
    )
}