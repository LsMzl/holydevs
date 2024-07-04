import MyBookingsClient from "@/components/booking/MyBookingsClient";
import { ReservationCard } from "@/components/house/booking/ReservationCard";
import ProfileSideBar from "@/components/navigation/components/ProfileSideBar";
import {
   Tabs,
   TabsContent,
   TabsList,
   TabsTrigger,
} from "@/components/shadcn/tabs";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import React from "react";
import { v4 as uuidv4 } from "uuid";

export default async function Reservations() {
   // Utilisateur connecté
   const { userId } = auth();
   if (!userId) return null;
   // Informations utilisateur
   const user = await db.user.findUnique({
      where: {
         clerkId: userId,
      },
      select: {
         id: true,
         firstname: true,
         profilePicture: true,
         biography: true,
         languages: true,
         interests: true,
         houses: {
            select: {
               id: true,
               image: true,
               title: true,
               price: true,
            },
         },
         opinions: {
            select: {
               id: true,
            },
         },
         followers: {
            select: {
               id: true,
               follower: {
                  select: {
                     id: true,
                     firstname: true,
                     lastname: true,
                     username: true,
                     profilePicture: true,
                  },
               },
            },
         },
         followings: {
            select: {
               id: true,
               following: {
                  select: {
                     id: true,
                     firstname: true,
                     lastname: true,
                     username: true,
                     profilePicture: true,
                  },
               },
            },
         },
      },
   });
   if (!user) return <h1>Vous n'êtes pas connecté</h1>;

   // Reservations on user houses
   const bookingsFromUsers = await db.house.findMany({
      where: {
         bookings: {
            some: { houseOwnerId: userId },
         },
      },
      select: {
         city: true,
         country: true,
         image: true,
         title: true,
         bookings: {
            select: {
               bookedAt: true,
               userName: true,
               totalPrice: true,
               paymentStatus: true,
               startDate: true,
               endDate: true,
               houseId: true,
               userId: true,
            },
         },
      },
      orderBy: {
         createdAt: "desc",
      },
   });

   // Current user reservations
   const bookingsFromMe = await db.house.findMany({
      where: {
         bookings: {
            some: { userId: userId },
         },
      },
      select: {
         city: true,
         country: true,
         image: true,
         title: true,
         bookings: {
            select: {
               bookedAt: true,
               userName: true,
               totalPrice: true,
               paymentStatus: true,
               startDate: true,
               endDate: true,
               houseId: true,
               userId: true,
            },
         },
      },
      orderBy: {
         createdAt: "desc",
      },
   });

   //! Pas de réservation trouvée
   if (!bookingsFromUsers && !bookingsFromMe)
      return <div>Aucune réservation trouvée</div>;

   return (
      <section className="flex items-start gap-5 w-full">
         {/* Left */}
         <ProfileSideBar user={user} />
         {/* Right */}
         <div className="flex flex-col gap-5 w-full">
            {/* Haut */}
            <Tabs defaultValue="myReservations">
               <div className="bg-card rounded-lg p-2">
                  <TabsList>
                     <TabsTrigger value="myReservations">
                        Mes réservations
                     </TabsTrigger>
                     <TabsTrigger value="userReservations">Autres</TabsTrigger>
                  </TabsList>
               </div>
               <TabsContent value="myReservations">
                  {/* Bas */}
                  <div className="bg-card rounded-lg p-2">
                     {bookingsFromMe.length === 0 ? (
                        <p>Aucune réservation pour le moment.</p>
                     ) : (
                        <>
                           <h2 className="text-xl md:text-2xl font-medium mb-6">
                              Mes réservations personnelles
                           </h2>
                           <div className="flex flex-col gap-5">
                              {bookingsFromMe.map((booking) => (
                                 <ReservationCard
                                    house={booking}
                                    key={uuidv4()}
                                 />
                              ))}
                           </div>
                        </>
                     )}
                  </div>
               </TabsContent>
               <TabsContent value="userReservations">
                  <div className="bg-card rounded-lg p-2">
                     {bookingsFromUsers.length === 0 ? (
                        <p>Aucune réservation pour le moment.</p>
                     ) : (
                        <>
                           <h2 className="text-xl md:text-2xl font-medium mb-6">
                              Réservations sur mes maisons
                           </h2>
                           <div className="flex flex-col gap-5">
                              {bookingsFromUsers.map((booking) => (
                                 <ReservationCard
                                    house={booking}
                                    key={uuidv4()}
                                 />
                              ))}
                           </div>
                        </>
                     )}
                  </div>
               </TabsContent>
            </Tabs>
         </div>
      </section>
   );
}
