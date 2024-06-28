import React from "react";
import House from "../../../../public/img/house.jpg";
import Image from "next/image";
import { CommentInteractionTypes, PostTypes } from "@/types/user/posts";
import { db } from "@/lib/prisma";

export const CommentForm = ({ user, post }: PostTypes) => {
   if (!user) return <p>Vous devez être connecté pour commenter</p>;
   return (
      <div className="flex items-center w-full">
         <div className="relative h-10 w-10 mr-2 ">
            <Image
               src={
                  user.profilePicture
                     ? user.profilePicture
                     : `https://api.dicebear.com/6.x/fun-emoji/svg?seed=${user.username}`
               }
               fill
               sizes="100%"
               alt={`Photo de ${user.firstname} ${user.lastname}`}
               className="rounded-full object-cover"
            />
         </div>
         <div className="rounded-full py-2 px-5 bg-foreground/5 w-[94%]">
            <div className="bg-transparent cursor-pointer">
               <p className="font-light text-sm animate-pulse">
                  Ecrivez votre commentaire
               </p>
            </div>
         </div>
      </div>
   );
};
