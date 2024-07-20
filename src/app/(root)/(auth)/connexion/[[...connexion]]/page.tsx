import { SignIn } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
   title: "Connexion",
   description: "Page de connexion utilisateur",
};

export default function Page() {
   return (
      <div className="max-w-[350px] mx-auto mt-10 md:mt-20">
         <SignIn />
      </div>
   );
}
