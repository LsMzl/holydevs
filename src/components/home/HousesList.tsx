"use client";

import { v4 as uuidv4 } from "uuid";
// import HouseCard from "../elements/cards/HouseCard";

// import CountryFilter from "./CountryFilter";

import { usePathname, useRouter } from "next/navigation";
import { HouseListTypes } from "@/types/home/House";

import HouseCard from "../house/HouseCard";

import {
   Carousel,
   CarouselContent,
   CarouselItem,
   CarouselNext,
   CarouselPrevious,
} from "@/components/shadcn/carousel";
import { Button } from "../shadcn/button";
import { useState } from "react";

// import CategoriesCarousel from "./Carousel";

const HousesList = ({ categories, types, houses }: HouseListTypes) => {
   const router = useRouter();

   const pathName = usePathname();
   const isMyHouses = pathName.includes("mes-annonces");
   // console.log("houses", houses);

   const [filter, setFilter] = useState("");


   const handleFilter = (e: any) => {
      setFilter(e.currentTarget.textContent);
   };

   const resetFilter = () => {
      setFilter("");
   };

   // Filtrage des résultats selon la catégorie ou type selectionné
   const filteredHouses = houses.filter(
      (house) =>
         house.categories[0].category.name.toLowerCase().includes(filter) ||
         house.types[0].type.name.toLowerCase().includes(filter) ||
         house.city.toLowerCase().includes(filter)
   );

   return (
      <section className="mt-10">
         <div className="flex items-center gap-2 md:gap-5 mt-3 md:mt-4">
            <h2 className="text-xl md:text-2xl font-semibold">
               Toutes les annonces
            </h2>
            <div className="flex items-center md:gap-2 md:mt-1.5">
               <p>en</p>
               {/* <CountryFilter /> */}
            </div>
         </div>
         {/* Categories Filter */}
         <div className="">
            <Carousel
               opts={{
                  align: "start",
                  loop: true,
                  dragFree: true,
               }}
               className="w-full relative pt-5"
            >
               <CarouselContent className="-ml-0">
                  <Button
                     size="sm"
                     className="shadow hover:bg-secondary"
                     onClick={() => resetFilter()}
                  >
                     Tout
                  </Button>

                  {types.map((type) => (
                     <CarouselItem key={uuidv4()} className="basis-1/8">
                        <Button
                           size="sm"
                           className="shadow hover:bg-primary hover:text-black capitalize"
                           key={uuidv4()}
                           variant={filter === type.name ? "default" : "secondary"}
                           onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                              handleFilter(e)
                           }
                        >
                           {type.name}
                        </Button>
                     </CarouselItem>
                  ))}
                  {categories.map((category) => (
                     <CarouselItem key={uuidv4()} className="basis-1/8">
                        <Button
                           size="sm"
                           className="shadow hover:bg-primary hover:text-black capitalize"
                           key={uuidv4()}
                           variant={filter === category.name ? "default" : "secondary"}
                           onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                              handleFilter(e)
                           }
                        >
                           {category.name}
                        </Button>
                     </CarouselItem>
                  ))}
               </CarouselContent>
               <div className="absolute -top-4 right-12">
                  <CarouselNext />
                  <CarouselPrevious />
               </div>
            </Carousel>
         </div>
         <div className="flex items-center justify-between mt-5">
            <div className="text-sm flex items-center gap-5 font-medium">
               <p>Autour de moi</p>
               <p className="underline decoration-cyan-500 decoration-2 underline-offset-4">
                  Partout dans le monde
               </p>
            </div>
            <div className="hidden md:block">
               <p>Trier par</p>
            </div>
         </div>
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-5 gap-y-5 mt-4">
            {filteredHouses.map((house) => (
               <HouseCard key={uuidv4()} house={house} />
            ))}
         </div>
      </section>
   );
};

export default HousesList;
