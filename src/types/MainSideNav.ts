import { LucideIcon } from "lucide-react";

export interface MainSideNaveUser {
   userAvatar: string | undefined | null;
   userFirstName: string | undefined | null;
   userLastName: string | undefined | null;
   username: string | undefined | null;
   userId: string | undefined | null;
}

export interface MainSideNavData {
   title: string;
   icon: LucideIcon;
   variant: string;
   href: string;
}
