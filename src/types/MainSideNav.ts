import { LucideIcon } from "lucide-react";

export interface MainSideNaveUser {
   userAvatar: string | undefined | null;
   userFirstName: string | undefined | null;
   userLastName: string | undefined | null;
   username: string | undefined | null;
   userId: string | undefined | null;
}

export interface MainSideNavData {
   className?: string;
   title: string;
   label?: string;
   icon: LucideIcon;
   variant: "default" | "ghost";
   href: string;
}
