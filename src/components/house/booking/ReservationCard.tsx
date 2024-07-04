'use client'
import useLocation from "@/app/hooks/useLocations";
import { Badge } from "@/components/shadcn/badge";
import { Button } from "@/components/shadcn/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/shadcn/card";
import { Separator } from "@/components/shadcn/separator";
import { ReservationCardTypes } from "@/types/house/Booking";

import { differenceInCalendarDays } from "date-fns";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export const ReservationCard = ({ house }: ReservationCardTypes) => {
    // React, Next
   const router = useRouter();
   console.log('booking', house.bookings)
   console.log('house', house)

   // Paiement
   const [bookingIsLoading, setBookingIsLoading] = useState(false);


    // Localisation
   const { getCountryByCode, getStateByCode } = useLocation();
   const country = getCountryByCode(house.country);

    // Réservation dates
    moment.locale("fr");
    const startDate = moment(house.bookings[0].startDate).format("dd.MMMM.YYYY");
    const endDate = moment(house.bookings[0].endDate).format("dd.MMMM.YYYY");
    const dayCount = differenceInCalendarDays(
        house.bookings[0].endDate,
        house.bookings[0].startDate
    );
   return (
      <Card>
         <CardContent className="flex flex-col sm:flex-row p-0">
            {/* Illustration */}
            <div className="relative w-full sm:w-[40%] min-h-[200px] bg-background">
               <Image
                  src={house.image ?? ""}
                  fill
                  alt={house.title ?? ""}
                  className="object-cover rounded-l"
               />
            </div>
            {/* Details */}
            <div className="w-full sm:w-[60%] flex flex-col">
               <CardHeader>
                  <div className="space-y-2">
                     {house.bookings[0].paymentStatus ? (
                        <Badge
                           variant="outline"
                           className="text-emerald-500 font-medium inline-block"
                        >
                           Payé
                        </Badge>
                     ) : (
                        <Badge
                           variant="outline"
                           className="text-red-500 font-medium"
                        >
                           Non payé
                        </Badge>
                     )}
                     <CardTitle>{house.title}</CardTitle>
                  </div>
                  <CardDescription>
                     {house.city}, {country?.name}
                  </CardDescription>
               </CardHeader>
               <CardContent className="text-sm">
                  <p>
                     Réservation effectuée le{" "}
                     {moment(house.bookings[0].bookedAt).format("dd.MMMM.YYYY")} par{" "}
                     <Link
                        href="/user"
                        className="hover:text-gray-500 underline"
                     >
                        {house.bookings[0].userName}
                     </Link>
                     .
                  </p>
                  {house.bookings[0].paymentStatus ? (
                     <p className="text-xs text-gray-500">
                        Payé {house.bookings[0].totalPrice} € -{" "}
                        <span className="text-emerald-500">
                           Logement réservé
                        </span>
                     </p>
                  ) : (
                     <div className="text-xs text-gray-500">
                        <p>
                           Paiement en attente{" "}
                           <span className="text-red-500">
                              Logement non-réservé
                           </span>
                        </p>
                        <p>Restant dû: {house.bookings[0].totalPrice} €</p>
                     </div>
                  )}
                  <Separator className="my-2" />
                  <p className="text-xs">Arrivée le {startDate}</p>
                  <p className="text-xs">Départ le {endDate}</p>
               </CardContent>
               <CardFooter className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                  <Button
                     disabled={bookingIsLoading}
                     variant="outline"
                     onClick={() =>
                        router.push(`/annonce/${house.bookings[0].houseId}`)
                     }
                  >
                     Voir l'annonce
                  </Button>
                  {/* {house.bookings[0].paymentStatus === false &&
                     house.bookings[0].userId === userId && (
                        <Button
                           disabled={bookingIsLoading}
                           onClick={() => handleBookHouse()}
                        >
                           {bookingIsLoading ? "Chargement..." : "Payer"}
                        </Button>
                     )} */}
               </CardFooter>

            </div>
         </CardContent>
      </Card>
   );
};
