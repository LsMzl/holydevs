import { SignIn } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
   title: "Connexion",
   description: "Page de connexion utilisateur",
};

export default function Page() {
   return (
      <div className="max-w-[1200px] mx-auto">
         <SignIn />
      </div>
   );
}
