import { WelcomeStep } from '@/components/user/onboarding/WelcomeStep'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
    title: "Bienvenue",
    description: "Dernière étape de l'onboarding pour l'inscription utilisateur",
 };

export default function WelcomePage() {
  return (
    <WelcomeStep/>
  )
}
