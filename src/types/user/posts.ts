export interface PostTypes {
   post: {
      id: string;
      content: string;
      image: string | null;
      createdAt: Date;
      author: {
         id: string;
         firstname: string | null;
         lastname: string | null;
         username: string | null;
         profilePicture: string | null;
      };
      likes: {
         id: string;
      }[];
      comments: {
         id: string;
      }[];
   };
}
