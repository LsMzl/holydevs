import { Button, buttonVariants } from "@/components/shadcn/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

export const WelcomeStep = ({}) => {
   return (
      <section className="w-full h-screen flex items-center justify-center">
         <div className="flex flex-col justify-center items-center">
            <h1 className=" text-3xl md:text-5xl lg:text-6xl font-medium text-center">
               Bienvenue sur Holydevs
            </h1>
            <p className="mb-5 text-xs">Le réseau social entre propriétaires</p>
            <p className="text-xl">Félicitations Louis votre profil à jour !</p>
            <p className="text-center">
               Vous pouvez à présent profiter de toutes les fonctionnaliés du
               site
            </p>
            <div className="flex items-center justify-center gap-5 mt-5">
              <Link href={'/'} className={cn(buttonVariants())}>Ajouter une annonce</Link>
              <Link href={'/'} className={cn(buttonVariants())}>Terminer</Link>
            </div>
         </div>
      </section>
   );
};
