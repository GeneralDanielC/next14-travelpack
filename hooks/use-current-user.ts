import { useSession } from "next-auth/react";

// Custom hook to retrieve the user from the current session.
export const useCurrentUser = () => {
    const session = useSession();

    return session.data?.user;
}