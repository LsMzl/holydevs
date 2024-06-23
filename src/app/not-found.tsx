/** Page pour erreur 404 - Not Found */
import { NotFoundLinks } from "@/data/404";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { v4 as uuidv4 } from "uuid";

export const metadata: Metadata = {
   title: "Page non trouvée",
   description: "Page d'accueil d'Holydevs",
};

export default function NotFound() {
   return (
      <div className="flex flex-col justify-center items-center min-h-screen">
         <div className="text-center space-y-2 mb-5">
            <h1 className="text-5xl font-bold">404 Not Found</h1>
            <p className="text-2xl font-semibold">
               Oups ! On dirait que cette page n'existe pas
            </p>
         </div>
         <div className=" grid grid-cols-2  justify-center gap-5">
            {NotFoundLinks.map((link) => (
               <div
                  className="rounded-xl border flex flex-col items-center p-5"
                  key={uuidv4()}
               >
                  <div className="p-2 rounded-lg ">
                     <link.icon />
                  </div>
                  <Link href={link.link}>{link.label}</Link>
               </div>
            ))}
         </div>
      </div>
   );
}
