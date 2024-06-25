import { db } from "@/lib/prisma";


export const getAllCategories = async () => {
   try {
     const categories = db.category.findMany()
     return categories;
   } catch (error: any) {
      console.log("error >>", error);
      throw new Error(error);
   }
};
