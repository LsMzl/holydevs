import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logo from "../../../public/logo/logo.png";

export const Footer = () => {
   return (
      <footer className="w-full border-t bg-card mt-20 p-5">
         <div className="max-w-[1200px] flex flex-col mx-auto bg-blue-400">
            {/* Haut */}
            <div className="flex justify-between border-b">
               <div>
                  <Link
                     href="/"
                     className="text-md "
                     title="Retour à la page d'accueil"
                  >
                     <div className="flex items-center gap-2">
                        <Image
                           src={Logo}
                           width={40}
                           height={40}
                           alt="Logo de Holydevs représentant des maisons de vacances sous des palmiers."
                           className="hidden sm:block"
                        />
                        <p className="hidden lg:block text-red-500 uppercase font-semibold text-lg">
                           Holydevs
                        </p>
                     </div>
                  </Link>
               </div>
               <div>Droit</div>
            </div>
            {/* Bas */}
            <div>Bas</div>
         </div>
      </footer>
   );
};
