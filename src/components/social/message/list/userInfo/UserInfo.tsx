import Image from "next/image";
import React from "react";

import Avatar from "../../../.././../../public/img/palmier.jpg";
import Avatar2 from "../../../.././../../public/img/van.jpg";

export const UserInfo = () => {
   return (
      <div>
         {/* User */}
         <div className="p-2 flex items-center gap-5">
            <div className="relative cursor-pointer">
               <Image
                  src={Avatar}
                  alt="Photo de profil"
                  width={40}
                  height={40}
                  className="rounded-full object-cover h-12 w-12"
               />
               <span className="absolute bg-red-600 rounded-full h-5 w-5 top-0 -right-2 text-white text-center font-semibold text-sm mb-1">
                  1
               </span>
            </div>
            <div className="relative cursor-pointer">
               <Image
                  src={Avatar2}
                  alt="Photo de profil"
                  width={40}
                  height={40}
                  className="rounded-full object-cover h-12 w-12"
               />
               <span className="absolute bg-red-600 rounded-full h-5 w-5 top-0 -right-2 text-white text-center font-semibold text-sm mb-1">
                  3
               </span>
            </div>
         </div>
         {/* Icons */}
         <div></div>
      </div>
   );
};
