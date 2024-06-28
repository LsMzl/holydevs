import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export const deletePost = async (postId: string) => {
   // Utilisateur connecté
   const { userId } = auth();
   if (!userId) {
      throw new Error("Utilisateur non connecté");
   }
   const currentUserId = await db.user.findUnique({
      where: {
         clerkId: userId,
      },
      select: {
         id: true,
      },
   });
   if (!currentUserId) {
      throw new Error("Utilisateur non trouvé");
   }

   try {
      await db.post.delete({
         where: {
            id: postId,
            authorId: currentUserId.id,
         },
      });
      revalidatePath("/");
   } catch (error) {
      console.error(error);
   }
};
export const deleteComment = async (commentId: string) => {
   // Utilisateur connecté
   const { userId } = auth();
   if (!userId) {
      throw new Error("Utilisateur non connecté");
   }
   const currentUserId = await db.user.findUnique({
      where: {
         clerkId: userId,
      },
      select: {
         id: true,
      },
   });
   if (!currentUserId) {
      throw new Error("Utilisateur non trouvé");
   }

   try {
      await db.comment.delete({
         where: {
            id: commentId,
            authorId: currentUserId.id,
         },
      });
      revalidatePath("/");
   } catch (error) {
      console.error(error);
   }
};
