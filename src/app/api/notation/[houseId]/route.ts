import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(
   req: Request,
   { params }: { params: { houseId: string } }
) {
   try {
      // Récuperarion des informations de l'annonce depuis le body.
      const body = await req.json();

      // Récupération de l'id de l'utilisateur connecté.
      const { userId } = auth();

      const user = await db.user.findFirst({
         where: {
            clerkId: userId,
         },
      });
      const dbUser = {
         id: user?.id,
      };

      if (!userId) {
         return new NextResponse("Non autorisé", { status: 401 });
      }

      const rate = await db.rates.create({
         data: {
            rate: body,
            author: {
               connect: {
                  id: dbUser.id,
               },
            },
            house: {
               connect: {
                  id: params.houseId,
               },
            },
         },
      });

      return NextResponse.json(rate);
   } catch (error) {
      console.log("Error at api/notation/[houseId] POST", error);
      return new NextResponse("Internal server error", { status: 500 });
   }
}
