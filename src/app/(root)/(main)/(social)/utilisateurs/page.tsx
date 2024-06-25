import { Button } from "@/components/shadcn/button";
import { db } from "@/lib/prisma";
import { Metadata } from "next";
import Image from "next/image";
import React from "react";

// Image
import Follower from "../../../../../../public/icon/followers.png";
import House from "../../../../../../public/icon/home-button.png";

// Libraries
import { v4 as uuidv4 } from "uuid";

export const metadata: Metadata = {
   title: "Tous les membres",
   description: "Réseau social - liste de tous les membres d'Holydevs",
};

// TODO: Ajouter un layout avec une barre de navigation sur la gauche
export default async function AllUsers() {
   const allUsers = await db.user.findMany({
      include: {
         houses: {
            select: {
               id: true,
            },
         },
         followers: {
            select: {
               follower: {
                  select: {
                     id: true,
                  },
               },
            },
         },
      },
   });
   if (!allUsers) return <h1>Aucun utilisateur trouvé.</h1>;

   return (
      <section>
         <h1 className="text-2xl font-semibold my-5">Rechercher des membres</h1>
         <div className=" grid grid-cols-3 lg:grid-cols-5 gap-5">
            {allUsers.length > 1 &&
               allUsers.map((user) => (
                  <div
                     className="flex flex-col shadow rounded-lg bg-card"
                     key={uuidv4()}
                  >
                     {/* Avatar */}
                     <div className="relative w-full h-24 lg:h-44 rounded-lg ">
                        <Image
                           src={
                              user.profilePicture
                                 ? user.profilePicture
                                 : `https://api.dicebear.com/6.x/fun-emoji/svg?seed=${user?.username}`
                           }
                           alt={`Photo de ${user.firstname} ${user.lastname}`}
                           fill
                           className="absolute top-0 left-0 object-cover rounded-lg rounded-b-none border-b-cyan-400 border-b-4"
                           sizes="100%"
                        />
                     </div>
                     <div className="p-2">
                        {/* Infos */}
                        <div className="my-1">
                           <p className="font-semibold text-xl">
                              {user.firstname} {user.lastname}
                           </p>
                           <div className="flex flex-col gap-1 p-2">
                              {/* Annonces */}
                              <div className="flex items-center gap-3">
                                 <Image
                                    // TODO mettre image par défaut
                                    src={House}
                                    height={20}
                                    width={20}
                                    alt=""
                                    className="h-5 w-5"
                                 />
                                 <p className="font-medium text-sm">
                                    {user.houses.length <= 1 ? (
                                       <>{user.houses.length} annonce</>
                                    ) : (
                                       <>{user.houses.length} annonces</>
                                    )}
                                 </p>
                              </div>
                              {/* Followers */}
                              <div className="flex items-center gap-3">
                                 <Image
                                    // TODO mettre image par défaut
                                    src={Follower}
                                    height={20}
                                    width={20}
                                    alt=""
                                    className="h-5 w-5"
                                 />
                                 <p className="font-medium text-sm">
                                    {user.followers.length <= 1 ? (
                                       <>{user.followers.length} abonné</>
                                    ) : (
                                       <>{user.followers.length} abonnés</>
                                    )}
                                 </p>
                              </div>
                           </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex items-center justify-center gap-2">
                           <Button>Ajouter</Button>
                           <Button>Message</Button>
                        </div>
                     </div>
                  </div>
               ))}
         </div>
      </section>
   );
}
