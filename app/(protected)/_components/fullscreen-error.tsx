"use client";

interface FullscreenErrorProps {
    code?: number,
    heading: string,
    message?: string,
}

export const FullscreenError = ({
    code,
    heading,
    message
}: FullscreenErrorProps) => {
    return (
        <div className="absolute w-full h-full bg-stone-200 flex flex-col justify-center items-center">
            <h1 className="text-lg">{code}</h1>
            <h1 className="text-3xl font-bold">{heading}</h1>
            <p>{message}</p>
        </div>
    )
}