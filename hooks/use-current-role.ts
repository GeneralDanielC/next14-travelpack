import { useSession } from "next-auth/react";

// Custom hook to retrieve the user role from the current session.
export const useCurrentRole = () => {
    const session = useSession();

    return session.data?.user?.role;
};