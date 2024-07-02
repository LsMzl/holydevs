"use client";
// React / Next
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

// import { Typography } from "../ui/design-system/Typography";

import { cn } from "@/lib/utils";
// import LocationFilter from "./LocationFilter";

import { useUser } from "@clerk/nextjs";
// import MiniMap from "../user/MiniMap";

// Type
import { MainSideNaveUser } from "@/types/MainSideNav";

// Data

// Images
import House from "../../../public/icon/house.png";
import Booking from "../../../public/icon/booking.png";
import Fav from "../../../public/icon/favourite.png";

import { Separator } from "../shadcn/separator";
import { Avatar, AvatarImage } from "../shadcn/avatar";
import { buttonVariants } from "../shadcn/button";
import { sideNavLinks } from "@/data/navigationData";
import Image from "next/image";

import Banner from "../../../public/img/banniere.jpg";
import MiniMap from "../home/MiniMap";
import useLocation from "@/app/hooks/useLocations";

const MainSideNav = ({ user }: MainSideNaveUser) => {
   const pathname = usePathname();

   const { getStateCities } = useLocation();
   const cities = getStateCities(user?.country ?? "", user?.state ?? "");
   const city = cities?.filter((city) => city.name === user?.city);
   if (!city) return <p>Position non trouvée</p>;

   return (
      <aside
         className={cn(
            "hidden lg:block static top-0 left-0 ml-2 space-y-5"
         )}
      >
         {/* User infos */}
         <Link href={`/${user?.username}`} title="Visiter mon profil">
            <div className="bg-card rounded-lg shadow flex flex-col items-center pb-5">
               {/* Cover picture */}
               <div className="w-full h-28 bg-card rounded-t-lg relative">
                  <Image
                     src={user?.coverPicture ? user?.coverPicture : Banner}
                     alt={`Photo de profil de ${user?.firstname} ${user?.lastname}`}
                     fill
                     sizes="100%"
                     className="absolute top-0 left-0 rounded-t-lg object-cover"
                  />
                  {/* Avatar */}
                  <div className="relative top-[60%] left-[50%] translate-x-[-50%] h-20 w-20 rounded-full">
                     <Image
                        src={
                           user?.profilePicture
                              ? user?.profilePicture
                              : `https://api.dicebear.com/6.x/fun-emoji/svg?seed=${user?.username}`
                        }
                        alt={`Photo de profil de ${user?.firstname} ${user?.lastname}`}
                        fill
                        className="absolute rounded-full object-cover border-2 border-card"
                     />
                  </div>
               </div>
               {/* Name */}
               <div className="text-center mt-10">
                  {user?.firstname && user?.lastname ? (
                     <p className="text-lg font-semibold capitalize">
                        {user?.firstname} {user?.lastname}
                     </p>
                  ) : (
                     <p className="text-lg font-medium">Utilisateur</p>
                  )}

                  <p className="text-sm">@{user?.username}</p>
               </div>
            </div>
         </Link>
         {/* MiniMap */}
         <div>
            <MiniMap
               cityLatitude={Number(city[0].latitude)}
               cityLongitude={Number(city[0].longitude)}
            />
         </div>
         <section className="rounded py-3 bg-card/30 shadow">
            {/* Links */}
            <div className="flex flex-col gap-1">
               <Link
                  href=""
                  className={cn(
                     buttonVariants({ variant: "ghost" }),
                     "flex items-center gap-2 justify-start w-full"
                  )}
               >
                  <Image
                     src={House}
                     alt="Logo du lien"
                     width={16}
                     height={16}
                     className="w-4 h-4"
                  />
                  Mes annonces
               </Link>
               <Link
                  href=""
                  className={cn(
                     buttonVariants({ variant: "ghost" }),
                     "flex items-center gap-2 justify-start w-full"
                  )}
               >
                  <Image
                     src={Booking}
                     alt="Logo du lien"
                     width={16}
                     height={16}
                     className="w-4 h-4"
                  />
                  Mes réservations
               </Link>
               <Link
                  href=""
                  className={cn(
                     buttonVariants({ variant: "ghost" }),
                     "flex items-center gap-2 justify-start w-full"
                  )}
               >
                  <Image
                     src={Fav}
                     alt="Logo du lien"
                     width={16}
                     height={16}
                     className="w-4 h-4"
                  />
                  Mes favoris
               </Link>
            </div>

            <Separator className="my-5" />
            {/* Friends */}
            <div className="flex flex-col gap-1 px-3 font-medium">
               <p className="text-sm font-medium mb-3">Discussions récentes</p>
               <div className="flex items-center gap-2">
                  <Avatar className="hidden sm:block ml-1 bg-gray-200 h-8 w-8">
                     <AvatarImage
                        src={`https://api.dicebear.com/8.x/fun-emoji/svg?seed=userEmail`}
                     />
                  </Avatar>
                  <p className="text-xs">Harry Cover</p>
               </div>
               <div className="flex items-center gap-2">
                  <Avatar className="hidden sm:block ml-1 bg-gray-200 h-8 w-8">
                     <AvatarImage
                        src={`https://api.dicebear.com/8.x/fun-emoji/svg?seed=usgfderEmagfdgfdgfil`}
                     />
                  </Avatar>
                  <p className="text-xs">Nom de l'utilisateur</p>
               </div>
               <div className="flex items-center gap-2">
                  <Avatar className="hidden sm:block ml-1 bg-gray-200 h-8 w-8">
                     <AvatarImage
                        src={`https://api.dicebear.com/8.x/fun-emoji/svg?seed=usejrtyhsdhfrEmail`}
                     />
                  </Avatar>
                  <p className="text-xs">Nom de l'utilisateur</p>
               </div>
               <div className="flex items-center gap-2">
                  <Avatar className="hidden sm:block ml-1 bg-gray-200 h-8 w-8">
                     <AvatarImage
                        src={`https://api.dicebear.com/8.x/fun-emoji/svg?seed=userEmajnfgdhtrhrtil`}
                     />
                  </Avatar>
                  <p className="text-xs">Nom de l'utilisateur</p>
               </div>
               <div className="flex items-center gap-2">
                  <Avatar className="hidden sm:block ml-1 bg-gray-200 h-8 w-8">
                     <AvatarImage
                        src={`https://api.dicebear.com/8.x/fun-emoji/svg?seed=userEmjgfdjrtjyail`}
                     />
                  </Avatar>
                  <p className="text-xs">Nom de l'utilisateur</p>
               </div>
            </div>
         </section>
      </aside>
   );
};

export default MainSideNav;
