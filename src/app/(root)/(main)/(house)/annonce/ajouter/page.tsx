import FirstStep from '@/components/house/onboarding/FirstStep'
import { HouseOnboardingTypes } from '@/types/house/onboarding'
import React from 'react'

export default function AddHouseFirstStep({house}: HouseOnboardingTypes) {
  return (
    <FirstStep house={house}/>
  )
}
