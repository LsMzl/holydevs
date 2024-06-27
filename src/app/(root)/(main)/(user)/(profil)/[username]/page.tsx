import ProfileSideBar from "@/components/navigation/components/ProfileSideBar";
import { Publications } from "@/components/user/profile/pages/Publications";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
   title: "Mon profil",
   description: "Page d'accueil d'Holydevs",
};

export default async function MyProfile() {
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
            },
         },
         followings: {
            select: {
               id: true,
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
         <Publications/>
      </section>
   );
}
