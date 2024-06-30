import ProfileSideBar from "@/components/navigation/components/ProfileSideBar";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import React from "react";

export default async function Reservations() {
   // Utilisateur connecté
   const { userId } = auth();
   if (!userId) return null;
   // Informations utilisateur
   const user = await db.user.findUnique({
      where: {
         clerkId: userId,
      },
      include: {
         houses: {
            select: {
               id: true,
            },
         },
         opinions: {
            select: {
               id: true,
            },
         },
         followers: {
            select: {
               id: true,
               follower: {
                  select: {
                     id: true,
                     firstname: true,
                     lastname: true,
                     username: true,
                     profilePicture: true,
                  },
               },
            },
         },
         followings: {
            select: {
               following: {
                  select: {
                     id: true,
                     firstname: true,
                     lastname: true,
                     username: true,
                     profilePicture: true,
                  },
               },
            },
         },
      },
   });
   if (!user) return <h1>Vous n'êtes pas connecté</h1>;
   return (
      <section className="flex items-start gap-5">
         {/* Left */}
         <ProfileSideBar user={user} />
         {/* Right */}
         <div className="flex flex-col gap-5">
            {/* Haut */}
            <div className="bg-card rounded-lg w-full p-2">Outils</div>
            {/* Bas */}
            <div className="bg-card rounded-lg w-full p-2">Réservations</div>
         </div>
      </section>
   );
}
