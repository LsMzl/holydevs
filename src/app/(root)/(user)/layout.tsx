import type { Metadata } from "next";
import "../../globals.css";
import { TopNav } from "@/components/navigation/TopNav";
import { auth } from "@clerk/nextjs/server";
import { getUserByClerkId } from "@/actions/getUserByClerkId";

export default async function MainLayout({
   children,
}: Readonly<{ children: React.ReactNode }>) {
   // Utilisateur connecté
   const { userId } = auth();
   // Informations utilisateur
   const user = await getUserByClerkId(userId ?? "");

   return (
      <>
         <TopNav
            userId={userId}
            userAvatar={user?.profilePicture}
            userClerkId={userId}
            userMail={user?.email ?? ""}
            firstname={user?.firstname ?? ""}
            lastname={user?.lastname ?? ""}
         />
         <main>{children}</main>
      </>
   );
}
