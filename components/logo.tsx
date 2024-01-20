"use client";
import Link from "next/link";
import { PiSuitcaseRollingBold } from "react-icons/pi"

export const Logo = () => {
    return (
        <Link href="/" className="flex flex-row items-center gap-x-1">
            <PiSuitcaseRollingBold
                width={100} height={100}
                className="text-rose-500" />
            <h2 className="font-extrabold text-rose-500">
                Travelpack
            </h2>
        </Link>

    )
}