export interface LastHousesTypes {
   houses: {
      id: string;
      country: string;
      image: string | null;
      title: string;
      city: string;
      price: number | null;
   }[];
}
export interface LastHouseCardTypes {
   house: {
      id: string;
      country: string;
      image: string | null;
      title: string;
      city: string;
      price: number | null;
   };
}
