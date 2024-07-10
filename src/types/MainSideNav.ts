import { LucideIcon } from "lucide-react";

export interface MainSideNavUser {
   user: {
      id: string;
      firstname: string | null;
      lastname: string | null;
      username: string | null;
      email: string;
      profilePicture: string | null;
      coverPicture: string | null;
      city: string | null;
      country: string | null;
      state: string | null;
   } | null;
   favourites: {
      house: {
         id: string;
         title: string;
      };
   }[];
}
export interface MainSideNavFavouriteTypes {
   favourites: {
      house: {
         id: string;
         title: string;
      };
   }[];
}

export interface MainSideNavData {
   title: string;
   logo: string;
   variant: string;
   href: string;
}
