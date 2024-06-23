import { SignUp } from "@clerk/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Inscription",
    description: "Page d'inscription ",
  };

export default function Page() {
  return <SignUp />;
}