export interface HouseDetailsTypes {
   house: {
      // id: string;
      country: string;
      state: string;
      city: string;
      address: string;
      createdAt: Date;
      title: string;
      image?: string | null;
      introduction?: string | null;
      description: string;
      price?: number | null;
      bedroom?: number | null;
      kitchen?: number | null;
      bathroom?: number | null;
      isAvailable: boolean;
      ownerId: string;
      types: {
         type: {
            name: string;
            image: string | null;
         };
      }[];
      categories: {
         category: {
            name: string;
            image: string | null;
         };
      }[];
      features: {
         feature: {
            name: string;
            image: string | null;
         };
      }[];
      user: {
         firstname: string | null;
         lastname: string | null;
         username: string | null;
         profilePicture: string | null;
      };
   };
   propositionHouse: {
      id: string;
      title: string;
      image: string | null;
      price: number | null;
      city: string;
   }[];

   //    bookings?: Booking[];
   lastOpinions: {
      title: string | null;
      content: string;
      createdAt: Date;
      author: {
         lastname: string | null;
         firstname: string | null;
         username: string | null;
         profilePicture: string | null;
      };
   }[];
   allOpinions: {
      title: string | null;
      content: string;
      createdAt: Date;
      author: {
         lastname: string | null;
         firstname: string | null;
         username: string | null;
         profilePicture: string | null;
      };
   }[];
}

export interface AllOpinionsTypes {
   allOpinions: {
      title: string | null;
      content: string;
      createdAt: Date;
      author: {
         lastname: string | null;
         firstname: string | null;
         username: string | null;
         profilePicture: string | null;
      };
   }[];
}

export interface LastOpinionsTypes {
   lastOpinions: {
      title: string | null;
      content: string;
      createdAt: Date;
      author: {
         lastname: string | null;
         firstname: string | null;
         username: string | null;
         profilePicture: string | null;
      };
   }[];
}

export interface PropositionHousesTypes {
   houses: {
      id: string;
      title: string;
      image: string | null;
      price: number | null;
      city: string;
   }[];
}

export interface PropositionHouseTypes {
   house: {
      id: string;
      title: string;
      image: string | null;
      price: number | null;
      city: string;
   };
}
