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

export const Chat = () => {
   // States
   const [isOpen, setIsOpen] = useState(false);
   const [text, setText] = useState("");

   // AutoScroll to last messsage
   const endRef = useRef<null | HTMLDivElement>(null);
   useEffect(() => {
      endRef.current?.scrollIntoView({ behavior: "smooth" });
   }, []);

   // Emoji on input
   const handleEmoji = (e: any) => {
      setText((prev) => prev + e.emoji);
      setIsOpen(false);
      console.log("text", text);
   };

   return (
      <div className="bg-card rounded-lg flex flex-col">
         {/* Top */}
         <div className="flex items-center justify-between py-2 px-5 border-b">
            {/* User Infos */}
            <div className="flex items-center gap-5">
               <Image
                  src={Avatar}
                  alt="Photo de profil"
                  width={40}
                  height={40}
                  className="rounded-full"
               />
               <div>
                  <p className="text-lg">John Doe</p>
                  <p className="text-xs text-foreground/50 font-light">
                     Lorem ipsum dolor sit amet.
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
         <div className="px-5 py-5 flex-1 min-h-[380px] max-h-[600px] bg-card/5 flex flex-col gap-5 overflow-y-auto">
            {/* User message */}
            <div className="flex items-start gap-2 max-w-[70%]">
               {/* User Avatar */}
               <Image
                  src={Avatar}
                  alt="Photo de profil"
                  width={28}
                  height={28}
                  className="rounded-full h-7 w-7 object-cover"
               />
               {/* Text */}
               <div className="text-sm">
                  <div className="w-full h-60 relative mb-1">
                     <Image
                        src={Avatar}
                        alt="Photo de profil"
                        fill
                        sizes="100%"
                        className="absolute object-cover rounded"
                     />
                  </div>
                  <p className=" bg-foreground/10 p-1 rounded-lg">
                     Lorem ipsum dolor sit amet consectetur adipisicing elit.
                     Magnam, ex?
                  </p>

                  <span className="text-xs">Il y a 5 minutes</span>
               </div>
            </div>
            {/* Own message */}
            <div className="flex items-start self-end gap-2 max-w-[70%]">
               {/* User Avatar */}
               <Image
                  src={Avatar}
                  alt="Photo de profil"
                  width={28}
                  height={28}
                  className="rounded-full h-7 w-7 object-cover"
               />
               {/* Text */}
               <div className="text-xs">
                  <p className=" bg-primary/50 p-1 rounded-lg">
                     Lorem ipsum dolor sit amet consectetur adipisicing elit.
                     Magnam, ex?
                  </p>
                  <span>Il y a 1 minute</span>
               </div>
            </div>
            {/* User message */}
            <div className="flex items-start gap-2 max-w-[70%]">
               {/* User Avatar */}
               <Image
                  src={Avatar}
                  alt="Photo de profil"
                  width={28}
                  height={28}
                  className="rounded-full h-7 w-7 object-cover"
               />
               {/* Text */}
               <div className="text-sm">
                  <div className="w-full h-60 relative mb-1">
                     <Image
                        src={Avatar}
                        alt="Photo de profil"
                        fill
                        sizes="100%"
                        className="absolute object-cover rounded"
                     />
                  </div>
                  <p className=" bg-foreground/10 p-1 rounded-lg">
                     Lorem ipsum dolor sit amet consectetur adipisicing elit.
                     Magnam, ex?
                  </p>

                  <span className="text-xs">Il y a 5 minutes</span>
               </div>
            </div>
            {/* useRef auto-scroll */}
            <div ref={endRef}></div>
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
   );
};
