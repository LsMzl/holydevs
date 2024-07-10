"use client";
import React, { useState } from "react";
import Rating from "@mui/material/Rating";

import {
   Dialog,
   DialogClose,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/shadcn/dialog";
import { Separator } from "@/components/shadcn/separator";

import Star from "../../../../public/icon/star.png";
import Image from "next/image";
import {
   HouseDetailsTypes,
   NotationSystemTypes,
} from "@/types/house/houseDetails";
import { Button } from "@/components/shadcn/button";
import axios from "axios";
import { toast } from "@/components/shadcn/use-toast";
import { useRouter } from "next/navigation";

export const NotationSystem = ({ house, averageRate }: NotationSystemTypes) => {
   const [value, setValue] = useState<number>(0);
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const router = useRouter();



   const handleNotation = () => {
      axios
         .post(`/api/notation/${house.id}`, value)
         .then((res) => {
            setIsLoading(true);
            toast({
               variant: "success",
               description: "Merci pour votre note!",
            });
            setIsLoading(false);
            router.refresh();
         })
         .catch((error) => {
            console.log(error);
            toast({
               variant: "destructive",
               description:
                  "Une erreur est survenue lors de la notation. Veuillez réessayer plus tard.",
            });
            setIsLoading(false);
            router.push(`/annonce/${house.id}`);
         });
   };

   return (
      <Dialog>
         <DialogTrigger asChild>
            <div className="flex items-center justify-center gap-2 border rounded-full p-2 w-[170px] bg-foreground/5 group cursor-pointer hover:shadow">
               <Image
                  src={Star}
                  alt="Icône de note du logement"
                  height={20}
                  width={20}
                  className="h-5 w-5 group-hover:animate-spin-fast"
               />
               {house.rates.length === 0 ? (
                  <p>Aucune note</p>
               ) : (
                  <p>
                     {averageRate}/5 | {house.rates.length} notes
                  </p>
               )}
            </div>
         </DialogTrigger>
         <DialogContent>
            <DialogHeader>
               <DialogTitle>Donner une note</DialogTitle>
            </DialogHeader>
            <Separator />
            <div className="flex flex-col items-center gap-3">
               <Rating
                  name="simple-controlled"
                  size="large"
                  // defaultValue={averageRate ?? 0}
                  value={value}
                  precision={0.5}
                  onChange={(event, newValue) => {
                     setValue(Number(newValue));
                  }}
               />
               <Button size="sm" onClick={handleNotation}>
                  Valider
               </Button>
            </div>
         </DialogContent>
      </Dialog>
   );
};
