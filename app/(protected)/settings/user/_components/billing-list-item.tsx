"use client";

type Item = {
    freeIcon: React.ReactElement,
    freeTitle: string,
    proIcon: React.ReactElement,
    proTitle: string,
}

interface BillingListItemProps {
    sectionTitle: string,
    billingItems: Item[],
}

export const BillingListItem = ({
    sectionTitle,
    billingItems,
}: BillingListItemProps) => {
    return (
        <div className="flex flex-row">
            <span>{sectionTitle}</span>
            {billingItems.map((item) => (
                <>
                    <div className="dark:bg-stone-900 p-2 rounded-xl flex flex-row gap-x-2">
                        {item.freeIcon}
                        <span className="text-xs">{item.freeTitle}</span>
                    </div>
                    <div className="dark:bg-stone-900 p-2 rounded-xl flex flex-row gap-x-2">
                        {item.proIcon}
                        <span className="text-xs">{item.proTitle}</span>
                    </div>
                </>
            ))}

        </div>
    )
}