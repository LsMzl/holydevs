import { Chat } from "@/components/social/message/chat/Chat";
import { List } from "@/components/social/message/list/List";

export default function Messenger({
   params,
}: {
   params: { username: string };
}) {
   return (
      <div className="flex flex-col gap-2">
         <List />
         <Chat />
      </div>
   );
}
