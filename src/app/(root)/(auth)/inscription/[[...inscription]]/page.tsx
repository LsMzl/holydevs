import { SignUp } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
   title: "Inscription",
   description: "Page d'inscription ",
};

export default function Page() {
   return (
      <div className="max-w-[1200px] mx-auto">
         <SignUp />
      </div>
   );
}
