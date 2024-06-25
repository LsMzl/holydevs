import { Metadata } from "next";

export const metadata: Metadata = {
   title: "Accueil",
   description: "Page d'accueil d'Holydevs",
};

export default function Home() {
   return (
      <div className="flex items-start gap-5">
         <div className="max-lg:hidden w-[20%] bg-cyan-400 h-screen static top-0 left-0">gfh</div>
         <div className="max-lg:w-full max-lg:mx-2 w-[80%] bg-indigo-400 mx-2 h-screen">hgf</div>
      </div>
   );
}
