// Import the auth function from the local auth module.
import { auth } from "@/auth";

// Define an asynchronous function to get (fetch) the current user from the session.
export const currentUser = async () => {
    // Call the auth function to get the current session.
    const session = await auth();

    // Return the user object from the session if it exists, otherwise return undefined.
    return session?.user;
}

// Define an asynchronous function to get the current user's role from the session.
export const currentRole = async () => {
    // Call the auth function to get the current session again.
    const session = await auth();

    // Return the role of the user from the session if it exists, otherwise return undefined.
    return session?.user?.role;
}