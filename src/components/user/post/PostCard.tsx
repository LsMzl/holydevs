import Image from "next/image";
import React from "react";
import House from "../../../../public/img/house.jpg";
import {
   EllipsisIcon,
   HeartIcon,
   ReplyIcon,
   Share2Icon,
   ThumbsUpIcon,
} from "lucide-react";
import { Separator } from "@/components/shadcn/separator";
import { Comments } from "./Comments";

export default function PostCard() {
   return (
      <div className="flex flex-col gap-4 w-[500px] bg-card p-2 rounded-lg mx-auto">
         {/* User */}
         <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
               <div className="relative h-12 w-12">
                  <Image
                     src={House}
                     fill
                     sizes="100%"
                     alt=""
                     className="rounded-full object-cover"
                  />
               </div>
               <span className="font-medium">Louis Mazzella</span>
            </div>
            <EllipsisIcon />
         </div>
         {/* Content */}
         <div className=" flex flex-col gap-4">
            <div className="w-full min-h-96 relative">
               <Image
                  src={House}
                  alt=""
                  className="rounded-md object-cover"
                  fill
                  sizes="100%"
                  priority
               />
            </div>
            <p>
               Lorem ipsum dolor sit amet consectetur, adipisicing elit.
               Quisquam velit quod ipsam quos. Molestias, debitis?
            </p>
         </div>
         <Separator />
         {/* Interaction */}
         <div className="flex items-center justify-between">
            <div className="flex items-center gap-5">
               <div className="flex gap-2 items-center bg-foreground/5 p-2 rounded-xl">
                  <div className="flex items-center">
                     <HeartIcon className="cursor-pointer h-5 w-5" />
                  </div>
                  <span>12</span>
               </div>
               <div className="flex gap-2 items-center bg-foreground/5 p-2 rounded-xl">
                  <div className="flex items-center">
                     <ReplyIcon className="cursor-pointer h-5 w-5" />
                  </div>
                  <span>12</span>
               </div>
            </div>
            <div className="flex gap-2 items-center bg-foreground/5 p-2 rounded-xl">
               <div className="flex items-center">
                  <Share2Icon className="cursor-pointer h-5 w-5" />
               </div>
               <span>12</span>
            </div>
         </div>
         <Separator />
         {/* Add comment */}
         <div>
            <Comments/>
         </div>
      </div>
   );
}
