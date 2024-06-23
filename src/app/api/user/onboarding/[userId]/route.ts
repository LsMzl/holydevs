import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
   req: Request,
   { params }: { params: { userId: string } }
) {
   try {
      const body = await req.json();
      const { userId } = auth();

      //! Pas d'utilisateur connecté
      if (!userId) {
         return new NextResponse("Non autorisé", { status: 401 });
      }

      const user = await db.user.update({
         where: {
            clerkId: params.userId,
         },
         data: {
            ...body,
         },
      });

      return NextResponse.json(user);
   } catch (error) {
      console.log("Error at api/user/onboarding/[userId] PATCH", error);
      return new NextResponse("Internal server error", { status: 500 });
   }
}
