import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logo from "../../../public/logo/logo.png";
import { Badge } from "../shadcn/badge";
import { Checkbox } from "../shadcn/checkbox";
import {
   EarthIcon,
   FacebookIcon,
   GithubIcon,
   LinkedinIcon,
   MailIcon,
} from "lucide-react";

export const Footer = () => {
   return (
      <footer className="w-full border-t bg-card mt-20 text-foreground/60">
         <div className="max-w-[1200px] flex flex-col mx-auto p-5">
            {/* Haut */}
            <div className="flex justify-center items-center gap-20 border-b">
               {/* Left */}
               <div className="flex flex-col gap-4 flex-1">
                  {/* Logo */}
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
                  {/* Links */}
                  <div className="grid grid-cols-2 text-sm">
                     <Link href="">Réservations</Link>
                     <Link href="">Annonces</Link>

                     <Link href="">Profil</Link>
                     <Link href="">Réseau social</Link>
                     <Link href="">Accueil</Link>
                  </div>
                  {/* Réseaux sociaux */}
                  <div className="flex items-center gap-2 mb-10 mt-6">
                     <a
                        href=""
                        className="p-1 bg-foreground/5 text-primary/70 rounded group"
                        title="Facebook"
                     >
                        <FacebookIcon className="group-hover:animate-spin-fast" />
                     </a>
                     <a
                        href=""
                        className="p-1 bg-foreground/5 text-primary/70 rounded group"
                        title="Github"
                     >
                        <GithubIcon className="group-hover:animate-spin-fast" />
                     </a>
                     <a
                        href=""
                        className="p-1 bg-foreground/5 text-primary/70 rounded group"
                        title="LinkedIn"
                     >
                        <LinkedinIcon className="group-hover:animate-spin-fast" />
                     </a>
                     <a
                        href=""
                        className="p-1 bg-foreground/5 text-primary/70 rounded group"
                        title="Email"
                     >
                        <MailIcon className="group-hover:animate-spin-fast" />
                     </a>
                     <a
                        href=""
                        className="p-1 bg-foreground/5 text-primary/70 rounded group"
                        title="Portfolio"
                     >
                        <EarthIcon className="group-hover:animate-spin-fast" />
                     </a>
                  </div>
               </div>
               {/* Right */}
               <div className="flex-1">
                  <p className="text-xs font-semibold mb-3">
                     Etre informé des dernières annonces autour de chez moi
                  </p>
                  <form className="space-y-5">
                     <div className="flex items-center">
                        <input
                           className="border bg-transparent px-3 py-2 w-full focus:outline-none"
                           type="email"
                           placeholder="Votre email"
                        />
                        <button className="border border-l-0 py-2 px-3">
                           Valider
                        </button>
                     </div>
                     <div className="flex items-start gap-2">
                        <Checkbox />
                        <p className="text-xs">
                           En cochant cette case, vous acceptez que vos données
                           soient conservés.
                        </p>
                     </div>
                  </form>
               </div>
            </div>
            {/* Bas */}
            <div className="flex flex-col gap-3 mt-5 text-xs font-light">
               {/* top */}
               <div>
                  <Link href="">Politique de confidentialité | </Link>
                  <Link href="">Traitement de données | </Link>
                  <Link href="">Accessibilité | </Link>
                  <Link href=""></Link>
               </div>
               {/* Middle */}
               <div>
                  <Link href="">Centre d'aide | </Link>
                  <Link href="">Support client | </Link>
                  <Link href="">Accueil des voyageurs | </Link>
               </div>
               {/* Bottom */}
               <div>
                  <p>
                     ©2024 Holydevs. Ce site à été réalisé dans le cadre d'un
                     projet de fin de formation.
                  </p>
                  <Badge
                     variant="outline"
                     className="hover:animate-pulse border-primary/50 mt-2"
                  >
                     <a href="" className="text-primary/80 font-semibold">
                        @LouisMzl
                     </a>
                  </Badge>
               </div>
            </div>
         </div>
      </footer>
   );
};
