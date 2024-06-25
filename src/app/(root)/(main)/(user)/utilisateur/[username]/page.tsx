import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
   title: "Profil de ...",
   description: "Profil utilisateur de ...",
};

export default function UserProfile({
   params,
}: {
   params: { username: string };
}) {
   return <div>Profil de {params.username}</div>;
}
