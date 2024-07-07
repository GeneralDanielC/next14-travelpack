"use client";

import React from "react";

interface BillingListItemProps {
    title: string,
    children: React.ReactElement,
}

export const BillingListItem = ({
    title,
    children
}: BillingListItemProps) => {
    return (
        <div className="flex flex-row items-center gap-x-2">
            {children}
            <span className="text-xs">{title}</span>
        </div>
    )
}