import { SignUp } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
   title: "Inscription",
   description: "Page d'inscription ",
};

export default function Page() {
   return (
      <div className="max-w-[350px] mx-auto mt-10 md:mt-20">
         <SignUp />
      </div>
   );
}
