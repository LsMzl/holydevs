import { AddPost } from "@/components/user/post/AddPost";
import { Comments } from "@/components/user/post/Comments";
import PostCard from "@/components/user/post/PostCard";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
   title: "Tous les posts",
   description:
      "Page du réseau social de Holydevs. Contient les posts de tous les membres du site",
};

export default function Post() {
   return (
      <>
         <AddPost />
         <PostCard />

      </>
   );
}
