import { getUserByClerkId } from "@/actions/getUserByClerkId";
import { UserSecondStep } from "@/components/user/onboarding/SecondStep";
import { UserOnboardingTypes } from "@/types/user/onboarding";
import { currentUser } from "@clerk/nextjs/server";
import { Metadata } from "next";
import React from "react";


export const metadata: Metadata = {
   title: "Onboarding",
   description: "Deuxième étape de l'onboarding pour l'inscription utilisateur",
};

export default async function UserOnboarding2() {
   const user = await currentUser();
   if (!user) return null;

   const dbUser = await getUserByClerkId(user.id);
   if (!dbUser) return null;

   const userData: UserOnboardingTypes = {
      user: {
         id: user.id,
         firstName: user.firstName,
         lastName: user.lastName,
         username: user.username,
         email: user.emailAddresses[0].emailAddress,
         image: user.imageUrl,
      },
   };

   return <UserSecondStep user={userData.user} />;
}
