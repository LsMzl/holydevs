"use client";
import { Bell, Home, LayoutGrid, Pen, Plus, Search, Users } from "lucide-react";
import Logo from "../../../public/logo/logo.png";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "../shadcn/button";
import { Input } from "../shadcn/input";
import { Popover, PopoverContent, PopoverTrigger } from "../shadcn/popover";
import { UserMenuProps } from "@/types/topNav";
import { UserMenu } from "./components/UserMenu";
import { GuestMenu } from "./components/GuestMenu";

export const TopNav = ({
   userId,
   userMail,
   userAvatar,
   userClerkId,
   firstname,
   lastname,
   username,
}: UserMenuProps) => {
   return (
      <nav className="hidden lg:flex items-center py-1 fixed w-full top-0 left-0 z-50 bg-card shadow">
         {/* left */}
         <div className="w-[20%] flex items-center justify-center">
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

         {/* Middle */}
         <div className="w-[60%] flex items-center justify-between">
            {/* Onglets */}
            <div className="flex items-center flex-1">
               <Link
                  href="/"
                  className="hover:bg-secondary py-3 max-md:px-3 px-8 rounded"
                  title="Accueil"
               >
                  <Home />
               </Link>
               <Link
                  href="/utilisateurs"
                  className="hover:bg-secondary py-3 max-md:px-3 px-8 rounded"
                  title="Utilisateurs"
               >
                  <Users />
               </Link>
               <Link
                  href="/posts"
                  className="hover:bg-secondary py-3 max-md:px-3 px-8 rounded"
                  title="Posts"
               >
                  <LayoutGrid />
               </Link>
            </div>
            {/* SearchBar */}
            <div className="flex items-center flex-1">
               <label htmlFor="searchBar" />
               <Input
                  // className="hidden sm:block md:w-[300px] md:absolute md:left-[50%] md:translate-x-[-50%] 2xl:w-[500px]"
                  placeholder="Recherchez une annonce, ville, catégorie..."
                  name="searchBar"
                  id="searchBar"
               />
            </div>
         </div>

         {/* Right */}
         <div className="w-[20%] flex items-center justify-center gap-5">
            {userId && (
               <Link
                  href="/annonce/ajouter"
                  className={cn(
                     buttonVariants(),
                     "hidden md:flex items-center gap-1"
                  )}
                  title="Ajouter une annonce"
               >
                  <Plus size={15} />
                  Annonce
               </Link>
            )}

            <div className="relative md:ml-5">
               <Bell size={20} />
               <span className="absolute h-4 w-4 rounded-full bg-red-500 -top-1 -right-1"></span>
            </div>

            {userId ? (
               <UserMenu
                  userMail={userMail}
                  userClerkId={userClerkId}
                  userAvatar={userAvatar}
                  firstname={firstname}
                  lastname={lastname}
                  username={username}
               />
            ) : (
               <GuestMenu />
            )}
         </div>
      </nav>
   );
};
