import { getAllCategories } from "@/actions/getAllCategories";
import { getAllFeatures } from "@/actions/getAllFeatures";
import { getAllHouseTypes } from "@/actions/getAllHouseTypes";
import SecondStep from "@/components/house/onboarding/SecondStep";
import { db } from "@/lib/prisma";
import React from "react";

interface AddHouseProps {
   params: {
      houseId: string;
   };
}

export default async function AddHouseSecondStep({ params }: AddHouseProps) {
   // House Datas
   const house = await db.house.findUnique({
      where: {
         id: params.houseId,
      },
      select: {
         id: true,
         
      }
   });
   // Categories Datas
   const categories = await getAllCategories();
   // Features Datas
   const features = await getAllFeatures();
   // HouseTypes Datas
   const types = await getAllHouseTypes();

   return (
      <SecondStep
         house={house}
         categories={categories}
         features={features}
         types={types}
      />
   );
}
