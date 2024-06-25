import React from "react";
import House from "../../../../public/img/house.jpg";
import Smiley from "../../../../public/logo/smile.png";
import Image from "next/image";

export const Comments = () => {
   return (
      <div>
         <div className="flex items-center w-full gap-2">
            <div className="relative h-10 w-10">
               <Image
                  src={House}
                  fill
                  sizes="100%"
                  alt=""
                  className="rounded-full object-cover"
               />
            </div>
            <div className="rounded-full py-2 px-5 bg-foreground/5 w-[440px]">
               <div className="bg-transparent cursor-pointer">
                <p className="font-light text-sm animate-pulse">Ecrivez votre commentaire</p>
               </div>
            </div>
         </div>
      </div>
   );
};
