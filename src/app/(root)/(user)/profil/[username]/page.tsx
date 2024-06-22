import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: "Mon profil",
  description: "Page d'accueil d'Holydevs",
};

export default function MyProfile({params}: {params: {username: string}}) {
  return (
    <div>Page de {params.username}</div>
  )
}
