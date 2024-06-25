import React from "react";
// import BiographyPopUpForm from "../BiographyPopUpForm";
import Link from "next/link";
import { PublicationsSideNavTypes } from "@/types/user/navigation";

const ProfileSideBar = ({ user }: PublicationsSideNavTypes) => {
   return (
      <aside className="hidden w-[25%] md:flex flex-col gap-5 ">
         <div className="flex items-center justify-center text-center rounded m-auto bg-card w-full">
            <span className="w-28 hover:bg-border/70 py-2 border-r border-border">
               {user.followers.length === 0 && (
                  <>
                     <p className="font-semibold leading-5">0</p>
                     <p className="text-sm">Relation</p>
                  </>
               )}
               {user.followers.length === 1 && (
                  <>
                     <p className="font-semibold leading-5">
                        {user?.followers.length}
                     </p>
                     <p className="text-sm">Relation</p>
                  </>
               )}
               {user.followers.length > 1 && (
                  <>
                     <p className="font-semibold leading-5">
                        {user.followers.length}
                     </p>
                     <p className="text-sm">Relations</p>
                  </>
               )}
            </span>
            <Link
               href="/mes-annonces"
               className="w-28 hover:bg-border/70 py-2 border-r border-border"
               title="Annonces utilisateur"
            >
               {user.houses.length === 0 && (
                  <>
                     <p className="font-semibold leading-5">0</p>
                     <p className="text-sm">Annonce</p>
                  </>
               )}
               {user.houses.length === 1 && (
                  <>
                     <p className="font-semibold leading-5">
                        {user?.houses.length}
                     </p>
                     <p className="text-sm">Annonce</p>
                  </>
               )}
               {user.houses.length > 1 && (
                  <>
                     <p className="font-semibold leading-5">
                        {user?.houses.length}
                     </p>
                     <p className="text-sm">Annonces</p>
                  </>
               )}
            </Link>
            <span className="w-28 hover:bg-border/70 py-2">
               <div>
                  {user?.opinions.length === 0 && (
                     <>
                        <p className="font-semibold leading-5">0</p>
                        <p className="text-sm">Avis</p>
                     </>
                  )}
                  {user?.houses.length > 0 && (
                     <>
                        <p className="font-semibold leading-5">
                           {user?.opinions.length}
                        </p>
                        <p className="text-sm">Avis</p>
                     </>
                  )}
               </div>
            </span>
         </div>
         <div className="rounded-lg shadow-sm bg-card w-full p-3 flex flex-col gap-3">
            {/* Biographie */}
            <div>
               <p className="font-semibold mb-2">Biographie</p>
               {/* //TODO: Bio ou bouton ajouter biographie */}
               {/* <p className="text-sm leading-4">
                  {user?.biography ? user?.biography : <BiographyPopUpForm />}
               </p> */}
            </div>
            {/* Centres d'intêrets */}
            <div>
               <p className="font-semibold mb-2">Centres d'intêrets</p>
               <p className="text-sm">
                  {user?.interests
                     ? user?.interests
                     : "Ajouter centres d'interets"}
               </p>
            </div>
            {/* Langues parlées */}
            <div>
               <p className="font-semibold mb-2">Langues parlées</p>
               <p className="text-sm">
                  {user?.languages
                     ? user?.languages
                     : "Ajouter langues parlées"}
               </p>
            </div>
         </div>

         {/* Connexions */}
         <div className="rounded-lg shadow-sm bg-card p-3">
            <div className="flex items-center justify-between mb-2">
               <p className="font-semibold">Mes connexions</p>
               <p className="text-sm text-cyan-500">Voir tout</p>
            </div>
            <div className="bg-secondary h-96"></div>
         </div>
      </aside>
   );
};

export default ProfileSideBar;
