import { TopNav } from "@/components/navigation/TopNav";
import { auth } from "@clerk/nextjs/server";
import { getUserByClerkId } from "@/actions/getUserByClerkId";

export default async function MainLayout({
   children,
}: Readonly<{ children: React.ReactNode }>) {
   // Utilisateur connecté
   const { userId } = auth();
   if(!userId) return null;
   // Informations utilisateur
   const user = await getUserByClerkId(userId);


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
         <main>{children}</main>
      </>
   );
}
