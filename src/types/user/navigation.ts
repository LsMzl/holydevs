export interface PublicationsSideNavTypes {
   user: {
      id: string;
      firstname: string | null;
      profilePicture: string | null;
      biography: string | null;
      languages: string | null;
      interests: string | null;
      houses: {
         id: string;
      }[];
      opinions: {
         id: string;
      }[];
      followers: {
         id: string;
      }[];
   };
}
