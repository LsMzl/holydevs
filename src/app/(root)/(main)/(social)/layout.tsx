// Clerk
import { auth } from "@clerk/nextjs/server";

// Queries
import { getUserByClerkId } from "@/actions/getUserByClerkId";

// Components
import { SocialLeftNav } from "@/components/navigation/SocialLeftNav";
import { SocialRightNav } from "@/components/navigation/SocialRightNav";
import { db } from "@/lib/prisma";

export default async function SocialLayout({
   children,
}: Readonly<{ children: React.ReactNode }>) {
   // Utilisateur connecté
   const { userId } = auth();
   if (!userId) return null;
   const user = await db.user.findUnique({
      where: {
         clerkId: userId,
      },
      select: {
         id: true,
         firstname: true,
         lastname: true,
         username: true,
         email: true,
         profilePicture: true,
         coverPicture: true,
      },
   });
   if (!user) return <p>Vous n'êtes pas connecté</p>;

   // Last members Datas
   const lastUsers = await db.user.findMany({
      orderBy: {
         createdAt: "desc",
      },
      take: 5,
      select: {
         id: true,
         firstname: true,
         lastname: true,
         username: true,
         profilePicture: true,
      },
   });
   if (!lastUsers) return <p>Aucun nouveau membres pour le moment</p>;

   // Friend Requests
   const requests = await db.friendRequest.findMany({
      where: {
         receiverId: user.id,
      },
      take: 5,
      include: {
         sender: {
            select: {
               id: true,
               firstname: true,
               lastname: true,
               username: true,
               profilePicture: true,
            },
         },
      },
   });

   return (
      <main className="flex items-start gap-10 2xl:mx-52 mt-5">
         <div className="max-lg:hidden w-[20%] static top-0 left-0 self-start">
            <SocialLeftNav user={user} />
         </div>
         <div className="max-lg:w-full max-lg:mx-2 w-[60%]">{children}</div>
         <div className="max-lg:hidden w-[20%] static top-0 right-0">
            <SocialRightNav lastUsers={lastUsers} requests={requests} />
         </div>
      </main>
   );
}
