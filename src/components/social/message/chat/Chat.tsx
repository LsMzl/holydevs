"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

// Images
import Avatar from "../../../.././../public/img/palmier.jpg";
import Phone from "../../../.././../public/svg/phone.svg";
import Camera from "../../../.././../public/icon/camera.png";
import More from "../../../.././../public/icon/more.png";
import Emoji from "../../../.././../public/icon/smile.png";
import Picture from "../../../.././../public/logo/picture.png";
import Camera2 from "../../../.././../public/icon/camera2.png";
import Micro from "../../../.././../public/icon/microphone.png";
import Send from "../../../.././../public/icon/send.png";

// Libraries
import EmojiPicker from "emoji-picker-react";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { format } from "date-fns";

interface ChatProps {
   connectedUser: {
      id: string;
   };
   allDiscussions: {
      id: string;
      createdAt: Date;
      ownerId: string;
      friendId: string;
      owner: {
         id: string;
         username: string | null;
         firstname: string | null;
         lastname: string | null;
         profilePicture: string | null;
      };
      friend: {
         id: string;
         username: string | null;
         firstname: string | null;
         lastname: string | null;
         profilePicture: string | null;
      };
   }[];
   messages:
      | {
           id: string;
           discussionId: string;
           content: string;
           receiver: {
              id: string;
              username: string | null;
              firstname: string | null;
              lastname: string | null;
              profilePicture: string | null;
           };
           sender: {
              id: string;
              username: string | null;
              firstname: string | null;
              lastname: string | null;
              profilePicture: string | null;
           };
        }[]
      | null;
}

export const Chat: React.FC<ChatProps> = ({
   allDiscussions,
   messages,
   connectedUser,
}) => {
   // States
   const [isOpen, setIsOpen] = useState(false);
   const [text, setText] = useState("");

   // Récupération de l'id de la discussion dans l'URL
   const searchParams = useSearchParams();
   const activeChatId = searchParams.get("chat");

   // Filtrage de la discussion active selon Id dans l'URL
   const currentDiscussion = allDiscussions.filter(
      (discussion) => discussion.id === activeChatId
   );
   if (currentDiscussion.length === 0) {
      return (
         <p className="bg-card rounded p-2 w-full">
            Veuillez sélectionner une discussion pour continuer
         </p>
      );
   }

   // Filtrage des messages selon ID de la discussion active
   const filteredMessages = messages?.filter(
      (items) => items.discussionId == currentDiscussion[0].id
   );

   // AutoScroll to last message
   // const endRef = useRef<null | HTMLDivElement>(null);
   // useEffect(() => {
   //    endRef.current?.scrollIntoView({ behavior: "smooth" });
   // }, []);

   // Emoji on input
   const handleEmoji = (e: any) => {
      setText((prev) => prev + e.emoji);
      setIsOpen(false);
   };

   return (
      <>
         {activeChatId == null ? (
            <p className="bg-card w-full rounded p-2">
               👉 Veuillez sélectionner une discussion
            </p>
         ) : (
            <div className="bg-card rounded-lg flex flex-col">
               {/* Top */}
               <div className="flex items-center justify-between py-2 px-5 border-b">
                  {/* User Infos */}
                  <div className="flex items-center gap-5">
                     <div className="relative h-10 w-10">
                        {currentDiscussion[0]?.owner.id == connectedUser.id ? (
                           <Image
                              src={
                                 currentDiscussion[0]?.friend.profilePicture ??
                                 Avatar
                              }
                              alt="Photo de profil"
                              fill
                              sizes="100%"
                              className="rounded-full object-cover"
                           />
                        ) : (
                           <Image
                              src={
                                 currentDiscussion[0]?.owner.profilePicture ??
                                 Avatar
                              }
                              alt="Photo de profil"
                              fill
                              sizes="100%"
                              className="rounded-full object-cover"
                           />
                        )}
                     </div>

                     <div>
                        {currentDiscussion[0]?.owner.id == connectedUser.id ? (
                           <p className="text-lg">
                              {currentDiscussion[0]?.friend.firstname}{" "}
                              {currentDiscussion[0]?.friend.lastname}
                           </p>
                        ) : (
                           <p className="text-lg">
                              {currentDiscussion[0]?.owner.firstname}{" "}
                              {currentDiscussion[0]?.owner.lastname}
                           </p>
                        )}

                        <p className="text-xs text-foreground/70 font-light">
                           Début des messages le{" "}
                           {format(
                              currentDiscussion[0].createdAt,
                              "dd MMMM yyyy"
                           )}
                        </p>
                     </div>
                  </div>
                  {/* Icons */}
                  <div className="flex items-center gap-2">
                     <div className="p-1 hover:bg-foreground/10 rounded-full cursor-pointer">
                        <Image
                           src={Phone}
                           alt="Icone de téléphone pour les appels"
                           width={20}
                           height={20}
                           className="rounded-full h-5 w-5"
                        />
                     </div>
                     <div className="p-1 hover:bg-foreground/10 rounded-full cursor-pointer">
                        <Image
                           src={Camera}
                           alt="Icone de caméra pour les appels vidéo"
                           width={10}
                           height={10}
                           className="rounded-full h-5 w-5"
                        />
                     </div>
                     <div className="p-1 hover:bg-foreground/10 rounded-full cursor-pointer">
                        <Image
                           src={More}
                           alt="Menu d'options"
                           width={10}
                           height={10}
                           className="rounded-full h-5 w-5"
                        />
                     </div>
                  </div>
               </div>
               {/* Middle */}
               <div className="px-5 py-5 flex-1 min-h-[650px] max-h-[650px] bg-card/5 flex flex-col gap-5 overflow-y-auto">
                  {filteredMessages?.map((message) => (
                     <div
                        key={message?.id}
                        className={cn(
                           message.sender.id === connectedUser.id
                              ? "self-end"
                              : "",
                           "flex items-start max-w-[70%] gap-1"
                        )}
                     >
                        {/* Profile Picture */}
                        <div className="relative h-10 w-10">
                           {message.sender.id === connectedUser.id ? (
                              // Me
                              <Image
                                 src={message.sender.profilePicture ?? Avatar}
                                 alt="Photo de profil"
                                 width={40}
                                 height={40}
                                 className="rounded-full h-9 w-9 object-cover"
                              />
                           ) : (
                              // Friend
                              <Image
                                 src={
                                    currentDiscussion[0]?.owner
                                       .profilePicture ?? Avatar
                                 }
                                 alt="Photo de profil"
                                 width={40}
                                 height={40}
                                 className="rounded-full h-9 w-9 object-cover"
                              />
                           )}
                        </div>
                        {/* Content */}
                        <p
                           className={cn(
                              message.sender.id === connectedUser.id
                                 ? "bg-primary/50"
                                 : "bg-foreground/10",
                              "rounded-md px-2 py-1 shadow"
                           )}
                        >
                           {message.content}
                        </p>
                     </div>
                  ))}

                  {/* useRef auto-scroll */}
                  {/* <div ref={endRef}></div> */}
               </div>
               {/* Bottom */}
               <div className="flex items-center justify-between gap-2 py-2 px-5 border-t">
                  {/* Icons */}
                  <div className="flex items-center">
                     <div className="cursor-pointer p-1 hover:bg-foreground/30 rounded-full">
                        <Image
                           src={Picture}
                           alt="Emoji smiley pour ouvrir le menu d'ajout d'émoji"
                           width={20}
                           height={20}
                           className="h-4 w-4"
                        />
                     </div>
                     <div className="cursor-pointer p-1 hover:bg-foreground/30 rounded-full">
                        <Image
                           src={Camera2}
                           alt="Emoji smiley pour ouvrir le menu d'ajout d'émoji"
                           width={20}
                           height={20}
                           className="h-4 w-4"
                        />
                     </div>
                     <div className="cursor-pointer p-1 hover:bg-foreground/30 rounded-full">
                        <Image
                           src={Micro}
                           alt="Emoji smiley pour ouvrir le menu d'ajout d'émoji"
                           width={20}
                           height={20}
                           className="h-4 w-4"
                        />
                     </div>
                  </div>
                  {/* Input */}
                  <div className="relative flex-1">
                     <input
                        type="text"
                        placeholder="Ecrire un message"
                        className="bg-foreground/20 outline-none rounded-full py-1 px-3 text-sm w-full"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                     />
                     {/* Emoji */}
                     <div
                        className="absolute top-[50%] translate-y-[-50%] right-0 cursor-pointer p-1 hover:bg-foreground/30 rounded-full"
                        onClick={() => setIsOpen(!isOpen)}
                     >
                        <Image
                           src={Emoji}
                           alt="Emoji smiley pour ouvrir le menu d'ajout d'émoji"
                           width={20}
                           height={20}
                           className="h-4 w-4"
                        />
                     </div>
                     <div className="absolute bottom-10 -right-10">
                        <EmojiPicker
                           open={isOpen}
                           onEmojiClick={handleEmoji}
                           className=""
                           allowExpandReactions={false}
                           height={300}
                           searchDisabled={true}
                        />
                     </div>
                  </div>
                  {/* Submit */}
                  <button>
                     <Image
                        src={Send}
                        alt="Emoji smiley pour ouvrir le menu d'ajout d'émoji"
                        width={20}
                        height={20}
                        className="h-4 w-4"
                     />
                  </button>
               </div>
            </div>
         )}
      </>
   );
};
