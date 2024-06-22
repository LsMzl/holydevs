'use client'
import { User } from "@prisma/client";
import { createContext } from "react";

/**
 * Propage les infos de l'utilisateur connecté.
 */
export const ConnectedUserContext = createContext<User | undefined>(undefined);
