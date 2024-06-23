import { UserFirstStep } from "@/components/user/onboarding/FirstStep";
import { UserOnboardingTypes } from "@/types/user/onboarding";
import { currentUser } from "@clerk/nextjs/server";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
   title: "Onboarding",
   description: "Première étape de l'onboarding pour l'inscription utilisateur",
};

export default async function UserOnboarding1() {
   const user = await currentUser();
   if (!user) return null;

   const userData: UserOnboardingTypes = {
      user: {
         id: user.id,
         firstName: user.firstName,
         lastName: user.lastName,
         username: user.username,
         email: user.emailAddresses[0].emailAddress,
      },
   };

   return <UserFirstStep user={userData.user} />;
}
