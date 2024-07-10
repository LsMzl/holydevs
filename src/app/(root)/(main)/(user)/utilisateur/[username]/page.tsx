import { Badge } from "@/components/shadcn/badge";
import { db } from "@/lib/prisma";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

export const metadata: Metadata = {
   title: `Profil de $`,
   description: "Profil utilisateur de ...",
};

export default async function UserProfile({
   params,
}: {
   params: { username: string };
}) {
   const user = await db.user.findFirst({
      where: {
         username: params.username,
      },
      select: {
         id: true,
         firstname: true,
         lastname: true,
         username: true,
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
   if (!user) redirect("/");
   return (
      <section className="flex items-start gap-5">
         {/* Left */}
         <aside className="hidden w-[27%] md:flex flex-col gap-5">
            <div className="flex items-center justify-center text-center rounded m-auto bg-card w-full">
               <span className="w-28 hover:bg-border/70 py-2 border-r border-border">
                  {user.followings.length === 0 && (
                     <>
                        <p className="font-semibold leading-5">0</p>
                        <p className="text-sm">Follower</p>
                     </>
                  )}
                  {user.followings.length === 1 && (
                     <>
                        <p className="font-semibold leading-5">
                           {user?.followings.length}
                        </p>
                        <p className="text-sm">Follower</p>
                     </>
                  )}
                  {user.followings.length > 1 && (
                     <>
                        <p className="font-semibold leading-5">
                           {user.followings.length}
                        </p>
                        <p className="text-sm">Followers</p>
                     </>
                  )}
               </span>
               <Link
                  href="/mes-annonces"
                  className="w-28 hover:bg-border/70 py-2 border-r border-border"
                  title="Annonces utilisateur"
               >
                  {user.houses.length === 0 && (
                     <>
                        <p className="font-semibold leading-5">0</p>
                        <p className="text-sm">Annonce</p>
                     </>
                  )}
                  {user.houses.length === 1 && (
                     <>
                        <p className="font-semibold leading-5">
                           {user?.houses.length}
                        </p>
                        <p className="text-sm">Annonce</p>
                     </>
                  )}
                  {user.houses.length > 1 && (
                     <>
                        <p className="font-semibold leading-5">
                           {user?.houses.length}
                        </p>
                        <p className="text-sm">Annonces</p>
                     </>
                  )}
               </Link>
               {/* Avis */}
               <span className="w-28 hover:bg-border/70 py-2">
                  <div>
                     {user?.opinions.length === 0 && (
                        <>
                           <p className="font-semibold leading-5">0</p>
                           <p className="text-sm">Avis</p>
                        </>
                     )}
                     {user?.opinions.length > 1 && (
                        <>
                           <p className="font-semibold leading-5">
                              {user?.opinions.length}
                           </p>
                           <p className="text-sm">Avis</p>
                        </>
                     )}
                  </div>
               </span>
            </div>
            <div className="rounded-lg shadow-sm bg-card w-full p-3 flex flex-col gap-3">
               {/* Biographie */}
               <p className="text-lg font-semibold">Informations</p>
               <div>
                  <p className="font-semibold mb-2">Biographie</p>
                  {user?.biography ? (
                     <p className="text-sm">{user?.biography}</p>
                  ) : user.firstname && user.lastname ? (
                     <p className="text-xs">
                        {user.firstname} {user.lastname} n'a pas encore
                        renseigné de biographie
                     </p>
                  ) : (
                     <p className="text-xs">
                        {user.username} n'a pas encore renseigné de biographie
                     </p>
                  )}
               </div>
               {/* Centres d'intêrets */}
               <div>
                  <p className="font-semibold mb-2">Centres d'intêrets</p>
                  <p className="text-xs">
                     {user?.interests
                        ? user?.interests
                        : user.firstname && user.lastname
                        ? `${user.firstname} ${user.lastname} n'a pas encore renseigné de centres d'intêrets`
                        : `${user.username} n'a pas encore renseigné de centres d'intêrets`}
                  </p>
               </div>
               {/* Langues parlées */}
               <div>
                  <p className="font-semibold mb-2">Langues parlées</p>
                  <p className="text-xs">
                     {user?.languages
                        ? user?.languages
                        : user.firstname && user.lastname
                        ? `${user.firstname} ${user.lastname} n'a pas encore renseigné de langues parlées`
                        : `${user.username} n'a pas encore renseigné de langues parlées`}
                  </p>
               </div>
            </div>

            {/* Connexions */}
            <div className="rounded-lg shadow-sm bg-card p-3">
               <div className="flex items-center justify-between mb-2">
                  <p className="font-semibold text-lg">Followers</p>
                  <p className="text-sm text-cyan-500">Voir tout</p>
               </div>
               <div className="bg-background grid grid-cols-3 gap-3 justify-between">
                  {user.followings.map((follower) => (
                     <Link
                        href={follower.following.username ?? ""}
                        key={follower.id}
                     >
                        <Image
                           src={follower.following.profilePicture ?? ""}
                           alt="Photo de profil"
                           width={70}
                           height={70}
                           className="rounded"
                        />
                     </Link>
                  ))}
               </div>
            </div>
            {/* Annonces */}
            <div className="rounded-lg shadow-sm bg-card w-full p-3 flex flex-col gap-3">
               {/* Biographie */}
               <div>
                  <p className="font-semibold mb-2">Annonces</p>
                  <div className="space-y-2">
                     {user.houses.length > 0 ? (
                        user.houses.map((house) => (
                           <Link
                              href={`/annonce/${house.id}`}
                              className="flex items-start justify-between bg-background rounded p-1 hover:bg-foreground/10 transition-colors gap-2"
                              title="Voir l'annonce"
                              key={house.id}
                           >
                              <div className="relative h-16 w-16">
                                 <Image
                                    src={house.image ?? ""}
                                    alt="Photo de l'annonce"
                                    fill
                                    sizes="100%"
                                    className="rounded"
                                 />
                              </div>
                              <div>
                                 <p className="text-sm font-medium">
                                    {house.title}
                                 </p>
                                 <p className="text-xs">Localisation</p>
                                 <p className="text-xs">{house.price}€ /nuit</p>
                              </div>
                              {/* <div> */}
                              <Badge variant="success" className="self-center">
                                 Réservé
                              </Badge>
                              {/* <Badge variant="info" className="self-end">Disponible</Badge> */}
                              {/* </div> */}
                           </Link>
                        ))
                     ) : (
                        <p className="text-xs">
                           {user.firstname && user.lastname
                              ? `${user.firstname} ${user.lastname} n'a pas encore ajouté d'annonce`
                              : `${user.username} n'a pas encore ajouté d'annonce`}
                        </p>
                     )}
                  </div>
               </div>
            </div>
         </aside>
         {/* Right */}
         <p>Contenu</p>
      </section>
   );
}
