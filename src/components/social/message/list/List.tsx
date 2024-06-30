import React from "react";
import { UserInfo } from "./userInfo/UserInfo";
import { ChatList } from "./chatList/ChatList";

export const List = () => {
   return (
      <div className="bg-card rounded-lg flex items-center justify-between">
         <UserInfo />
         <ChatList />
      </div>
   );
};
