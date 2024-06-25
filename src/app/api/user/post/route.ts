import { getUserByClerkId } from "@/actions/getUserByClerkId";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { connect } from "http2";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
   try {
      const body = await req.json();
      const { userId } = auth();

      //! Pas d'utilisateur connecté
      if (!userId) {
         return new NextResponse("Non autorisé", { status: 401 });
      }

      const user = await getUserByClerkId(userId);
      if (!user) return null;

      const dbUser = {
         id: user.id,
      };
      const post = await db.post.create({
         data: {
            ...body,
            author: {
               connect: {
                  id: dbUser.id,
               },
            },
         },
      });

      return NextResponse.json(post);
   } catch (error) {
      console.log("Error at api/user/post POST", error);
      return new NextResponse("Internal server error", { status: 500 });
   }
}
