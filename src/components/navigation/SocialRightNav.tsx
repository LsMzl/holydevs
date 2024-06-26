import Image from "next/image";
import Link from "next/link";
import React from "react";
import Friends from "../../../public/icon/friends.png";
import { Button } from "../shadcn/button";
import { SocialRightNavTypes } from "@/types/user/navigation";

// Libraries
import { v4 as uuidv4 } from "uuid";

export const SocialRightNav = ({ lastUsers }: SocialRightNavTypes) => {
   return (
      <aside className="space-y-5">
         {/* Top */}
         <div className="bg-card rounded-lg shadow flex flex-col gap-3 p-5">
            {/* Title */}
            <div className="flex items-center justify-between">
               <h3 className="font-semibold text-foreground/70">
                  Demandes d'amis
               </h3>
               <Link
                  href=""
                  title="Voir les demandes d'amis en attente"
                  className="font-medium text-sm text-cyan-500"
               >
                  Voir tout
               </Link>
            </div>
            {/* Content */}
            <div className="flex flex-col items-start">
               <span className="flex justify-between items-center gap-2 w-full">
                  {/* User Infos */}
                  <Link
                     href={`/utilisateur/j_babouche`}
                     title="Visiter le profil de jason babouche"
                  >
                     <div className="flex items-center gap-2">
                        {/* Avatar */}
                        <div className="relative h-10 w-10 rounded-full shadow">
                           <Image
                              src={Friends}
                              alt={`Photo de profil de Jason babouche`}
                              fill
                              sizes="100%"
                              className="absolute top-0 left-0 rounded-full object-cover"
                           />
                        </div>
                        {/* Name */}
                        <p className="font-medium text-sm">Jason babouche</p>
                     </div>
                  </Link>
                  {/* Icons */}
                  <div className="flex items-center gap-2">
                     <p>V</p>
                     <p>X</p>
                  </div>
               </span>
            </div>
         </div>
         {/* Middle */}
         <div className="bg-card rounded-lg shadow flex flex-col gap-3 p-5">
            {/* Title */}

            <h3 className="font-semibold text-foreground/70">
               Nouveaux membres
            </h3>
            {/* Last members */}
            <div className="flex flex-col gap-2">
               {lastUsers.length >= 1 ? (
                  lastUsers.map((user) => (
                     <span
                        className="flex items-center justify-between hover:bg-foreground/5 p-1 rounded-lg"
                        key={uuidv4()}
                     >
                        <Link
                           href={`/utilisateur/${user.username}`}
                           title={`Visiter le profil de ${user.firstname} ${user.lastname}`}
                        >
                           <div className="flex items-center gap-2">
                              {/* Avatar */}
                              <div className="relative h-11 w-11 rounded-full shadow">
                                 <Image
                                    src={
                                       user.profilePicture
                                          ? user.profilePicture
                                          : `https://api.dicebear.com/6.x/fun-emoji/svg?seed=${user?.username}`
                                    }
                                    alt={`Photo de profil de ${user.firstname} ${user.lastname}`}
                                    fill
                                    sizes="100%"
                                    className="absolute top-0 left-0 rounded-full object-cover"
                                 />
                              </div>
                              {/* Name */}
                              <p className="font-medium text-sm">
                                 {user.firstname} {user.lastname}
                              </p>
                           </div>
                        </Link>

                        <Button size="sm" className="w-[50px]">
                           Voir
                        </Button>
                     </span>
                  ))
               ) : (
                  <p>Pas de nouveau membres pour le moment</p>
               )}
            </div>
         </div>

         {/* Bottom */}
      </aside>
   );
};
