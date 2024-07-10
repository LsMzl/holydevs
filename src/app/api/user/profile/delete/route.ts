import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
   try {
      // Récupération de l'id de l'utilisateur connecté.
      const { userId } = auth();

      //! Pas d'utilisateur connecté
      if (!userId) {
         return new NextResponse("Non autorisé", { status: 401 });
      }

      const user = await db.user.delete({
         where: {
            clerkId: userId,
         },
      });

      return NextResponse.json("");
   } catch (error) {
      console.log("Error at api/user/profile/delete DELETE", error);
      return new NextResponse("Internal server error", { status: 500 });
   }
}
