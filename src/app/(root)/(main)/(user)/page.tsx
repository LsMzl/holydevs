import HousesList from "@/components/home/HousesList";
import LastHousesCarousel from "@/components/home/LastHousesCarousel";
import MainSideNav from "@/components/navigation/MainSideNav";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next";

export const metadata: Metadata = {
   title: "Accueil",
   description: "Page d'accueil d'Holydevs",
};

export default async function Home() {
   // User Datas
   const { userId } = auth();
   if (!userId) return <p>Vous n'êtes pas connecté</p>;
   const currentUser = await db.user.findFirst({
      where: {
         clerkId: userId,
      },
      select: {
         firstname: true,
         lastname: true,
         username: true,
         id: true,
         email: true,
         profilePicture: true,
         coverPicture: true,
         city: true,
         country: true,
         state: true,
      },
   });

   // Lasts Houses data
   const lastHouses = await db.house.findMany({
      orderBy: {
         createdAt: "desc",
      },
      take: 10,
      select: {
         id: true,
         country: true,
         image: true,
         title: true,
         city: true,
         price: true,
      },
   });

   const categories = await db.category.findMany({
      select: {
         name: true,
         id: true,
      },
   });

   const types = await db.type.findMany({
      select: {
         name: true,
         id: true,
      },
   });

   const houses = await db.house.findMany({
      select: {
         id: true,
         image: true,
         title: true,
         city: true,
         country: true,
         price: true,
         userId: true,
         ownerId: true,
         user: {
            select: {
               firstname: true,
               lastname: true,
               username: true,
               id: true,
            },
         },
         categories: {
            select: {
               category: {
                  select: {
                     name: true,
                     id: true,
                  },
               },
            },
         },
         types: {
            select: {
               type: {
                  select: {
                     name: true,
                     id: true,
                  },
               },
            },
         },
      },
   });

   return (
      <div className="flex items-start gap-5 mt-5 max-w-[1700px] mx-auto">
         <div className="max-lg:hidden w-[20%]">
            <MainSideNav user={currentUser} />
         </div>
         <div className="max-lg:w-full max-lg:mx-2 w-[80%] mx-2">
            <LastHousesCarousel houses={lastHouses} />
            <HousesList categories={categories} types={types} houses={houses} />
         </div>
      </div>
   );
}
