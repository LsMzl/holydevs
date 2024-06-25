import { Category, Feature, House, Type } from "@prisma/client";

export interface HouseOnboardingTypes {
   house: House | null;
   categories?: Category[];
   features?: Feature[];
   types?: Type[];
}
