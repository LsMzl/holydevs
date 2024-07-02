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

   // Houses datas
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
   return (
      <div className="flex items-start gap-5 mt-5 max-w-[1700px] mx-auto">
         <div className="max-lg:hidden w-[20%]">
            <MainSideNav user={currentUser} />
         </div>
         <div className="max-lg:w-full max-lg:mx-2 w-[80%] mx-2 h-screen">
            <LastHousesCarousel houses={lastHouses} />
         </div>
      </div>
   );
}
