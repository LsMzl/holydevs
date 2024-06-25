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
            <h1 className="text-5xl font-extrabold text-blue-700">404 Not Found</h1>
            <p className="text-2xl font-semibold">
               Oups ! On dirait que cette page n'existe pas
            </p>
         </div>
         <div className=" grid max-sm:grid-cols-1 max-sm:gap-5 grid-cols-3 justify-center gap-8">
            {NotFoundLinks.map((link) => (
               <Link
                  className="rounded-xl border flex flex-col items-center p-5 bg-gradient-to-r from-foreground/5 to-transparent shadow-sm mt-5 hover:bg-gradient-to-l transition duration-300"
                  key={uuidv4()}
                  href={link.href}
               >
                  <div className="p-2 rounded-lg bg-gradient-to-r from-foreground/10 to-transparent mb-2">
                     <link.icon />
                  </div>
                  <p>{link.label}</p>
               </Link>
            ))}
         </div>
      </div>
   );
}
