import { TopNav } from "@/components/navigation/TopNav";
import { auth } from "@clerk/nextjs/server";
import { getUserByClerkId } from "@/actions/getUserByClerkId";
import { BottomNav } from "@/components/navigation/BottomNav";

import { db } from "@/lib/prisma";
import { FooterMobile } from "@/components/navigation/FooterMobile";
import { FooterScreen } from "@/components/navigation/FooterScreen";


export default async function MainLayout({
   children,
}: Readonly<{ children: React.ReactNode }>) {
   // Utilisateur connecté
   const { userId } = auth();
   if (!userId) return null;
   // Informations utilisateur
   const user = await getUserByClerkId(userId);

   const currentUser = await db.user.findFirst({
      where: {
         clerkId: userId,
      },
      select: {
         username: true,
      },
   });
   if (!currentUser) return null;

   return (
      <>
         <TopNav
            userId={userId}
            userAvatar={user?.profilePicture}
            userClerkId={userId}
            userMail={user?.email || null}
            firstname={user?.firstname || null}
            lastname={user?.lastname || null}
            username={user?.username || null}
         />
         <div className="hidden lg:block h-[56px]" />
         <main>{children}</main>
         <div className="md:hidden">
            <FooterMobile currentUser={currentUser} />
         </div>
         <div className="hidden md:block">
            <FooterScreen currentUser={currentUser} />
         </div>
         <div className="lg:hidden h-[56px]" />
         <BottomNav
            userId={userId}
            userAvatar={user?.profilePicture}
            userClerkId={userId}
            userMail={user?.email || null}
            firstname={user?.firstname || null}
            lastname={user?.lastname || null}
            username={user?.username || null}
         />
      </>
   );
}
