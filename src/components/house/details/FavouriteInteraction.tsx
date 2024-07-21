"use client";
import { useOptimistic, useState } from "react";


// Images
import NoFav from "../../../../public/icon/noFavourite.png";
import Fav from "../../../../public/icon/favourite.png";
import Image from "next/image";
import { FavouriteInteractionTypes } from "@/types/house/houseDetails";
import { switchFavourite } from "@/actions/interaction/favourite";

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
      <form action={favAction}>
         {optimisticFav.isFaved ? (
            //Faved
            <button>
               <Image
                  src={Fav}
                  alt="Icône de partage"
                  height={20}
                  width={20}
                  className="h-5 w-5 hover:animate-bounce cursor-pointer"
               />
            </button>
         ) : (
            <button>
               <Image
                  src={NoFav}
                  alt="Icône de partage"
                  height={20}
                  width={20}
                  className="h-5 w-5 hover:animate-bounce cursor-pointer"
               />
            </button>
         )}
      </form>
   );
};
