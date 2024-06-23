'use client'

import { User } from "@prisma/client";
import { createContext, useContext } from "react";

/**
 * Propage les infos de l'utilisateur connecté.
 */
export const DbUserContext = createContext<User | undefined>(undefined);

export function useUserContext() {
    const user = useContext(DbUserContext);

    if(user === undefined) {
        throw new Error('useUserContext doit être utilisé dans un DbUserContext Provider')
    }

    return user;
}
