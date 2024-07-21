import * as z from "zod";

export const postCreateSchema = z.object({
    // Identité
    content: z.string().min(5, {
       message: "Votre post doit contenir au moins 5 caractères",
    }),
    image: z.optional(z.string()),
 });