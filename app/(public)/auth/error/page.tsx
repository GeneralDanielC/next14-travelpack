import { ErrorCard } from "@/components/auth/error-card";

const AuthErrorPage = () => {
    return (
        <div className="h-full flex justify-center items-center w-full">
            <ErrorCard />
        </div>
    );
}

export default AuthErrorPage;