// React / Next
import Image from "next/image";
import React from "react";
import Link from "next/link";

// Components
import { Comments } from "./Comments";

// UI Components
import { Separator } from "@/components/shadcn/separator";

// Icons
import { EllipsisIcon } from "lucide-react";
import Heart from "../../../../public/icon/heart.png";
import Reply from "../../../../public/icon/reply-all.png";
import Share from "../../../../public/icon/share.png";
import Send from "../../../../public/icon/send.png";

// Types
import { PostTypes } from "@/types/user/posts";

// Libraries
import { format } from "date-fns";

export default function PostCard({ post }: PostTypes) {
   return (
      <div className="flex flex-col gap-4 bg-card py-2 px-5 rounded-lg mx-auto my-5">
         {/* User */}
         <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
               <Link
                  href={`/utilisateur/${post.author.username}`}
                  title={`Visiter le profil de ${post.author.firstname} ${post.author.lastname}`}
               >
                  <div className="relative h-12 w-12">
                     <Image
                        src={
                           post.author.profilePicture
                              ? post.author.profilePicture
                              : `https://api.dicebear.com/6.x/fun-emoji/svg?seed=${post.author.username}`
                        }
                        fill
                        sizes="100%"
                        alt=""
                        className="rounded-full object-cover"
                     />
                  </div>
               </Link>
               <div>
                  <span className="font-medium">
                     {post.author.firstname} {post.author.lastname}
                  </span>
                  <p className="text-xs text-gray-400">
                     Publié le {format(post.createdAt, "dd MMMM yyyy")}
                  </p>
               </div>
            </div>
            <EllipsisIcon />
         </div>
         <Separator className=""/>
         {/* Content */}
         <div className=" flex flex-col gap-4">
            {post.image && (
               <div className="w-full max-sm:h-44 h-96 relative">
                  <Image
                     src={post.image}
                     alt=""
                     className="rounded-md object-cover"
                     fill
                     sizes="100%"
                     priority
                  />
               </div>
            )}
            <p className="text-sm">{post.content}</p>
         </div>
         <Separator />
         {/* Interaction */}
         <div className="flex items-center justify-between">
            <div className="flex items-center gap-5">
               {/* Like */}
               <div className="flex gap-2 items-center bg-foreground/5 p-2 rounded-xl cursor-pointer hover:bg-foreground/10">
                  <div className="flex items-center" title="Likes">
                     <Image
                        src={Heart}
                        alt="Icône d'un coeur"
                        className="w-5 h-5"
                        width={20}
                        height={20}
                     />
                  </div>
                  <span>{post.likes.length}</span>
               </div>
               {/* Reply */}
               <div className="flex gap-2 items-center bg-foreground/5 p-2 rounded-xl cursor-pointer hover:bg-foreground/10">
                  <div className="flex items-center" title="Commenter">
                     <Image
                        src={Reply}
                        alt="Icône de réponse"
                        className="w-5 h-5"
                        width={20}
                        height={20}
                     />
                  </div>
                  <span>{post.comments.length}</span>
               </div>
            </div>
            {/* Share */}
            <div className="flex items-center gap-2">
               <div
                  className="flex gap-2 items-center bg-foreground/5 p-2 rounded-xl cursor-pointer hover:bg-foreground/10"
                  title="Partager"
               >
                  <Image
                     src={Share}
                     alt="Icône de partage"
                     className="w-5 h-5"
                     width={20}
                     height={20}
                  />
               </div>
               <div
                  className="flex gap-2 items-center bg-foreground/5 p-2 rounded-xl cursor-pointer hover:bg-foreground/10 transition-colors group"
                  title="Envoyer"
               >
                  <Image
                     src={Send}
                     alt="Icône d'envoi'"
                     className="w-5 h-5 group-hover:animate-bounce"
                     width={20}
                     height={20}
                  />
               </div>
            </div>
         </div>
         <Separator />
         {/* Add comment */}
         <div>
            <Comments />
         </div>
      </div>
   );
}
