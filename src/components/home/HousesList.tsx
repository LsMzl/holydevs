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
import { useEffect, useState } from "react";

import "../../../public/css/style.css";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "../shadcn/dropdown-menu";
import {
   ArrowDownNarrowWide,
   ArrowUpNarrowWide,
   LayoutGridIcon,
} from "lucide-react";

const HousesList = ({ categories, types, houses }: HouseListTypes) => {
   const router = useRouter();
   const pathName = usePathname();
   const isMyHouses = pathName.includes("mes-annonces");

   // Filters
   const [categoryFilter, setCategoryFilter] = useState("");
   const [typeFilter, setTypeFilter] = useState("");

   const [sortedHouses, setSortedHouses] = useState("");

   // Categories & types filter
   const handleCategoryFilter = (e: any) => {
      setCategoryFilter(e.currentTarget.textContent);
   };
   const handleTypeFilter = (e: any) => {
      setTypeFilter(e.currentTarget.textContent);
   };

   const resetFilter = () => {
      setCategoryFilter("");
      setTypeFilter("");
   };

   // Price filter
   const handlePriceAsc = () => {
      setSortedHouses("asc");
   };

   const handlePriceDesc = () => {
      setSortedHouses("desc");
   };

   // Filtrage des résultats selon la catégorie ou type selectionné
   let filteredHouses = houses.filter(
      (house) =>
         house.categories[0].category.name
            .toLowerCase()
            .includes(categoryFilter) &&
         house.types[0].type.name.toLowerCase().includes(typeFilter)
   );

   if (sortedHouses === "asc") {
      filteredHouses = houses
         .sort((a, b) => (a.price ?? 0) - (b.price ?? 0))
         .filter(
            (house) =>
               house.categories[0].category.name
                  .toLowerCase()
                  .includes(categoryFilter) &&
               house.types[0].type.name.toLowerCase().includes(typeFilter)
         );
   } else if (sortedHouses === "desc") {
      filteredHouses = houses
         .sort((a, b) => (b.price ?? 0) - (a.price ?? 0))
         .filter(
            (house) =>
               house.categories[0].category.name
                  .toLowerCase()
                  .includes(categoryFilter) &&
               house.types[0].type.name.toLowerCase().includes(typeFilter)
         );
   }

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
               <CarouselContent className="max-md:ml-4 -ml-0">
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
                           variant={
                              typeFilter === type.name ? "default" : "link"
                           }
                           onClick={(
                              e: React.MouseEvent<HTMLButtonElement>
                           ) => {
                              typeFilter === type.name
                                 ? resetFilter()
                                 : handleTypeFilter(e);
                           }}
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
                           variant={
                              categoryFilter === category.name
                                 ? "default"
                                 : "secondary"
                           }
                           onClick={(
                              e: React.MouseEvent<HTMLButtonElement>
                           ) => {
                              categoryFilter === category.name
                                 ? resetFilter()
                                 : handleCategoryFilter(e);
                           }}
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
            <div className="text-sm flex items-center gap-5 font-medium houseFilter">
               <p className="cursor-pointer">Autour de moi</p>
               <p className="cursor-pointer">Partout dans le monde</p>
            </div>
            <div className="hidden md:block">
               <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                     <Button
                        className="flex items-center gap-2 cursor-pointer"
                        variant="ghost"
                     >
                        <p className="text-md">Trier</p>
                        <LayoutGridIcon className="h-5 w-5" />
                     </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="p-1" align="end">
                     <DropdownMenuLabel>Prix</DropdownMenuLabel>
                     <DropdownMenuSeparator />
                     <DropdownMenuItem>
                        <div
                           className="flex items-center gap-2 group cursor-pointer"
                           onClick={() => handlePriceAsc()}
                        >
                           <ArrowUpNarrowWide className="h-5 w-5" />
                           <p className="group-hover:font-medium">Croissant</p>
                        </div>
                     </DropdownMenuItem>
                     <DropdownMenuItem>
                        <div
                           className="flex items-center gap-2 group"
                           onClick={() => handlePriceDesc()}
                        >
                           <ArrowDownNarrowWide className="h-5 w-5" />
                           <p className="cursor-pointer group-hover:font-medium">
                              Décroissant
                           </p>
                        </div>
                     </DropdownMenuItem>
                  </DropdownMenuContent>
               </DropdownMenu>
            </div>
         </div>
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-5 gap-y-5 mt-4">
            {filteredHouses.length === 0 ? (
               <p className="w-[490px]">
                  Aucune annonce ne correspond à votre recherche...
               </p>
            ) : (
               filteredHouses.map((house) => (
                  <HouseCard key={uuidv4()} house={house} />
               ))
            )}
         </div>
      </section>
   );
};

export default HousesList;
