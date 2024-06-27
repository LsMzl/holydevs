import React from "react";
import { AddPost } from "../../post/AddPost";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import PostCard from "../../post/PostCard";

export const Publications = async () => {
   // Utilisateur connecté
   const { userId } = auth();
   if (!userId) return null;
   // Informations utilisateur
   const user = await db.user.findUnique({
      where: {
         clerkId: userId,
      },
      select: {
         id: true,
         firstname: true,
         profilePicture: true,
      },
   });
   if (!user) return null;

   // User posts Datas
   const posts = await db.post.findMany({
      where: {
         authorId: user.id,
      },
      include: {
         author: {
            select: {
               id: true,
               firstname: true,
               lastname: true,
               username: true,
               profilePicture: true,
            },
         },
         likes: {
            select: {
               id: true,
            },
         },
         comments: {
            select: {
               id: true,
            },
         },
      },
      orderBy: {
         createdAt: "desc",
      },
   });

   return (
      <div className="w-full">
         <AddPost currentUser={user} />
         {/* AllPosts */}
         <div>
            {posts.length === 0 ? (
               <p className="text-sm">Vous n'avez pas encore publié de post</p>
            ) : (
               posts.map((post) => <PostCard post={post} key={post.id} />)
            )}
         </div>
      </div>
   );
};
