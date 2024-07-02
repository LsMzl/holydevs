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
      select: {
         id: true,
         firstname: true,
         profilePicture: true,
         biography: true,
         languages: true,
         interests: true,
         houses: {
            select: {
               id: true,
               image: true,
               title: true,
               price: true,
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
               id: true,
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
         <Publications />
      </section>
   );
}
