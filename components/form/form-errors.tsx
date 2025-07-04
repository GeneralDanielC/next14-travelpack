import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

interface FormErrorsProps {
    id: string;
    errors?: Record<string, string[] | undefined>
};

export const FormErrors = ({
    id,
    errors
}: FormErrorsProps) => {
    if (!errors) return null;

    console.log(errors);

    return (
        <div
        id={`${id}-error`}
        aria-live="polite"
        className="mt-2 text-xs text-rose-500"
    >
        {errors?.[id]?.map((error: string) => (
            <div
                key={error}
                className="flex items-center font-medium p-2 border border-rose-500 bg-desctructive rounded-sm"
            >
                <ExclamationTriangleIcon className="h-4 w-4" />
                {error}
            </div>
        ))}
    </div>
    )
}