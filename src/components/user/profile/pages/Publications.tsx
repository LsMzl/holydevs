import React from "react";
import { AddPost } from "../../post/AddPost";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";

export const Publications = async () => {
   // Utilisateur connecté
   const { userId } = auth();
   if (!userId) return null;
   // Informations utilisateur
   const user = await db.user.findUnique({
      where: {
         clerkId: userId,
      },
      select: {
         id: true,
         firstname: true,
         profilePicture: true,
      },
   });
   if (!user) return null;
   return (
      <div className="w-full">
         <AddPost currentUser={user} />
      </div>
   );
};
