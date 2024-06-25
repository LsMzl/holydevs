export interface PublicationsPageType {
   currentUser: {
      id: string;
      firstname: string | null;
      profilePicture: string | null;
   };
}

export interface FriendsPageType {
   followers: {
      id: string;
      follower: {
         firstname: string | null;
         lastname: string | null;
         username: string | null;
         profilePicture: string | null;
      };
   }[];
   followings: {
      following: {
         firstname: string | null;
         lastname: string | null;
         username: string | null;
         profilePicture: string | null;
      };
   }[];
   
}
