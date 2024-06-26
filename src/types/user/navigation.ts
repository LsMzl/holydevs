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

export interface SocialLeftNavTypes {
   user: {
      id: string;
      firstname: string | null;
      lastname: string | null;
      username: string | null;
      email: string;
      profilePicture: string | null;
      coverPicture: string | null;
   };
}



export interface SocialRightNavTypes {
   lastUsers: {
      id: string;
      firstname: string | null;
      lastname: string | null;
      username: string | null;
      profilePicture: string | null;
   }[];
}
