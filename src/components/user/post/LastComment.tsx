import { Separator } from "@/components/shadcn/separator";
import { db } from "@/lib/prisma";
import { PostTypes } from "@/types/user/posts";
import { EllipsisIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { CommentsList } from "./CommentsList";
import { DeleteComment } from "@/components/social/DeleteComment";

export const LastComment = async ({ post, user }: PostTypes) => {
   // Last Comment Datas
   const lastComment = await db.comment.findFirst({
      where: {
         postId: post.id,
      },
      orderBy: {
         createdAt: "desc",
      },
      include: {
         author: {
            select: {
               id: true,
               firstname: true,
               lastname: true,
               username: true,
               email: true,
               profilePicture: true,
            },
         },
      },
   });

   if (!lastComment) return null;

   return (
      <div className="flex items-start justify-between gap-2 mb-4">
         <div className=" min-w-[5%]">
            <Image
               src={
                  lastComment?.author.profilePicture
                     ? lastComment?.author.profilePicture
                     : `https://api.dicebear.com/6.x/fun-emoji/svg?seed=${lastComment?.author.username}`
               }
               width={40}
               height={40}
               alt={`Photo de ${lastComment?.author.firstname} ${lastComment?.author.lastname}`}
               className="rounded-full object-cover h-9 w-9"
            />
         </div>

         <div className="space-y-1 bg-gradient-to-r from-foreground/10 to-card/10 rounded-lg p-2 min-w-[95%]">
            <div className="flex items-center justify-between">
               {lastComment.author.firstname && lastComment.author.lastname ? (
                  <p className="font-semibold text-sm">
                     {lastComment?.author.firstname}{" "}
                     {lastComment?.author.lastname}
                  </p>
               ) : (
                  <p className="font-medium text-sm">
                     {lastComment?.author.username}
                  </p>
               )}
               {/* Delete comment */}
               {user?.id === lastComment.author.id && (
                  <DeleteComment commentId={lastComment.id} />
               )}
            </div>
            <p className="text-xs">{lastComment?.content}</p>
         </div>
      </div>
   );
};
