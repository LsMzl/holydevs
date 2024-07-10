"use client";
import { useOptimistic, useState } from "react";
import { switchFavourite } from "@/app/api/user/favourite/favourite";

// Images
import NoFav from "../../../../public/icon/noFavourite.png";
import Fav from "../../../../public/icon/favourite.png";
import Image from "next/image";
import { FavouriteInteractionTypes } from "@/types/house/houseDetails";

export const FavouriteInteraction = ({ house }: FavouriteInteractionTypes) => {
   const favourites = house.favourites.map((favourite) => favourite.userId);
   const [favState, setFavState] = useState({
      isFaved: house.user?.id ? favourites.includes(house.user.id) : false,
   });

   const [optimisticFav, switchOptimisticFav] = useOptimistic(
      favState,
      (state, value) => {
         return {
            isFaved: !state.isFaved,
         };
      }
   );

   const favAction = async () => {
      switchOptimisticFav("");
      try {
         switchFavourite(house.id);
         setFavState((state) => ({
            isFaved: !state.isFaved,
         }));
      } catch (error) {
         console.error(error);
      }
   };
   return (
      <form className="flex items-center gap-1" action={favAction}>
         {optimisticFav.isFaved ? (
            //Faved
            <div className="flex items-center gap-1">
               <button>
                  <Image
                     src={Fav}
                     alt="Icône de partage"
                     height={20}
                     width={20}
                     className="h-5 w-5 hover:animate-bounce cursor-pointer"
                  />
               </button>
               <p className="hidden md:block md:text-sm">Dans vos favoris</p>
            </div>
         ) : (
            <div className="flex items-center gap-1">
               <button>
                  <Image
                     src={NoFav}
                     alt="Icône de partage"
                     height={20}
                     width={20}
                     className="h-5 w-5 hover:animate-bounce cursor-pointer"
                  />
               </button>
               <p className="hidden md:block md:text-sm">Ajouter aux favoris</p>
            </div>
         )}
      </form>
   );
};
