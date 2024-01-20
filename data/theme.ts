import { db } from "@/lib/db";

export const getThemeById = async (id: string) => {
    try {
        const theme = db.theme.findFirst({
            where: { id }
        });

        return theme;
    } catch {
        return null;
    }
}