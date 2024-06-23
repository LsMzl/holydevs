import { SignIn } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
   title: "Connexion",
   description: "Page de connexion utilisateur",
};

export default function Page() {
   return <SignIn />;
}
