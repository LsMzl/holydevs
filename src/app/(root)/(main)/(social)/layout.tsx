import { TopNav } from "@/components/navigation/TopNav";
import { auth } from "@clerk/nextjs/server";
import { getUserByClerkId } from "@/actions/getUserByClerkId";

export default async function MainLayout({
   children,
}: Readonly<{ children: React.ReactNode }>) {
   // Utilisateur connecté
   const { userId } = auth();
   if (!userId) return null;
   // Informations utilisateur
   const user = await getUserByClerkId(userId);

   return (
      <main className="flex items-start gap-10">
         <div className="max-lg:hidden w-[20%] bg-cyan-400 h-screen static top-0 left-0"></div>
         <div className="max-lg:w-full max-lg:mx-2 w-[60%]">{children}</div>
         <div className="max-lg:hidden w-[20%] bg-cyan-400 h-screen static top-0 right-0"></div>
      </main>
   );
}
