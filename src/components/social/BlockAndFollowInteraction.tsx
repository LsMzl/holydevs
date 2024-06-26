import React from "react";
import { Button } from "../shadcn/button";
import Image from "next/image";

import Block from "../../../public/icon/block.png";
import Smile from "../../../public/icon/smile.png";
import Follow from "../../../public/icon/follow.png";
import unFollow from "../../../public/icon/unFollow.png";
import hourglass from "../../../public/icon/hourglass.png";
import { BlockAndFollowTypes } from "@/types/social/SocialInteractions";

export const BlockAndFollowInteraction = ({
   currentUserId,
   userId,
   isUserBlocked,
   isFollowing,
   isFollowingRequestSent,
}: BlockAndFollowTypes) => {
   return (
      <>
         {isFollowing ? (
            // Ami
            <Button variant="secondary" className="flex items-center gap-1">
               <Image
                  src={unFollow}
                  alt="Icône d'arret d'amitié"
                  width={20}
                  height={20}
                  className="w-6 h-6"
                  title="Ne plus suivre l'utilisateur"
               />
               <p>Abonné</p>
            </Button>
         ) : isFollowingRequestSent ? (
            // Demande en attente
            <Button
               variant="secondary"
               className="flex items-center gap-1"
               disabled
            >
               <Image
                  src={hourglass}
                  alt="Icône d'attente de réponse"
                  width={20}
                  height={20}
                  className="w-6 h-6"
                  title="En attente de réponse utilisateur"
               />
               <p>En attente</p>
            </Button>
         ) : (
            // Pas ami
            <Button variant="secondary" className="flex items-center gap-1">
               <Image
                  src={Follow}
                  alt="Icône de demande d'amis"
                  width={20}
                  height={20}
                  className="w-6 h-6"
                  title="Suivre l'utilisateur"
               />
               <p>Suivre</p>
            </Button>
         )}

         {/* Blocage */}
         {isUserBlocked ? (
            // Utilisateur bloqué
            <Button variant="secondary">
               <Image
                  src={Smile}
                  alt="Icône de déblocage"
                  width={20}
                  height={20}
                  className="w-6 h-6"
                  title="Débloquer"
               />
            </Button>
         ) : (
            // Utilisateur non bloqué
            <Button variant="secondary">
               <Image
                  src={Block}
                  alt="Icône de blocage"
                  width={20}
                  height={20}
                  className="w-6 h-6"
                  title="Bloquer"
               />
            </Button>
         )}
      </>
   );
};
