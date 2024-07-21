import { WelcomeStep } from "@/components/user/onboarding/WelcomeStep";
import { db } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";

export const metadata: Metadata = {
   title: "Bienvenue",
   description: "Dernière étape de l'onboarding pour l'inscription utilisateur",
};

export default async function WelcomePage() {
   const user = await currentUser();
   const dbUser = await db.user.findUnique({
      where: { clerkId: user?.id },
      select: {
         firstname: true,
      },
   });
   // Utilisateur dans la database => redirection
   if (dbUser) {
      redirect("/");
   }

   return <WelcomeStep dbUser={dbUser} />;
}
