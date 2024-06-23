import { Avatar, AvatarImage } from "@/components/shadcn/avatar";
import { Button } from "@/components/shadcn/button";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuGroup,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuTrigger,
} from "@/components/shadcn/dropdown-menu";
import { Menu } from "lucide-react";
import Link from "next/link";
import React from "react";

export const GuestMenu = () => {
   return (
      <DropdownMenu>
         <DropdownMenuTrigger asChild>
            <Button
               variant="outline"
               className="py-5 px-1 rounded-full drop-shadow-md focus-visible:ring-0 focus-visible:ring-offset-0"
               size="lg"
            >
               <Menu className="cursor-pointer sm:mr-1 mx-1 sm:mx-0" />

               <Avatar className="hidden sm:block ml-1">
                  <AvatarImage
                     src={`https://api.dicebear.com/8.x/thumbs/svg?seed=${
                        Math.floor(Math.random() * 100) + 1
                     }`}
                  />
               </Avatar>
            </Button>
         </DropdownMenuTrigger>
         {/* Contenu du menu */}
         <DropdownMenuContent className="w-56 px-3 py-4 rounded">
            <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
            <DropdownMenuGroup>
               <DropdownMenuItem>
                  <Link href="/inscription">Inscription</Link>
               </DropdownMenuItem>

               <DropdownMenuItem>
                  <Link href="/connexion">Connexion</Link>
               </DropdownMenuItem>
            </DropdownMenuGroup>
         </DropdownMenuContent>
      </DropdownMenu>
   );
};
