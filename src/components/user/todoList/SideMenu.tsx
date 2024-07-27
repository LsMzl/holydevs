"use client";
import { Checkbox } from "@/components/shadcn/checkbox";
import { Todolist } from "@prisma/client";
import React, { useState } from "react";
import { CreateTodo } from "./CreateTodo";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { X } from "lucide-react";

interface SideMenuProps {
   allList: Todolist[];
}

export const SideMenu = ({ allList }: SideMenuProps) => {
   // States
   const [allChecked, setIsAllChecked] = useState(false);
   const [doneChecked, setIsDoneChecked] = useState(false);
   const [todoChecked, setIsTodoChecked] = useState(false);

   const searchParams = useSearchParams();
   const pathname = usePathname();
   const { replace } = useRouter();

   // Ajout de l'id de la liste dans l'url
   const handleSelectedList = (listId: string) => {
      const params = new URLSearchParams(searchParams);
      if (listId) {
         params.set("liste", listId);
      } else {
         params.delete("liste");
      }
      params.set("liste", listId);
      replace(`${pathname}?${params.toString()}`);
   };

   // Tri des tâche selon leur status
   const handleSelectedAllTasks = () => {
      setIsAllChecked(!allChecked);

      if (doneChecked || todoChecked) {
         setIsDoneChecked(false);
         setIsTodoChecked(false);
      }

      const params = new URLSearchParams(searchParams);

      params.delete("status");
      replace(`${pathname}?${params.toString()}`);
   };

   const handleSelectedDoneTasks = (taskStatus: string) => {
      setIsDoneChecked(!doneChecked);
      if (allChecked || todoChecked) {
         setIsAllChecked(false);
         setIsTodoChecked(false);
      }

      const params = new URLSearchParams(searchParams);

      if (!doneChecked) {
         params.set("status", taskStatus);
      } else {
         params.delete("status");
      }
      replace(`${pathname}?${params.toString()}`);
   };

   const handleSelectedTodoTasks = (taskStatus: string) => {
      setIsTodoChecked(!todoChecked);

      if (allChecked || doneChecked) {
         setIsAllChecked(false);
         setIsDoneChecked(false);
      }

      const params = new URLSearchParams(searchParams);

      if (!todoChecked) {
         params.set("status", taskStatus);
      } else {
         params.delete("status");
      }
      replace(`${pathname}?${params.toString()}`);
   };

   return (
      <div className="rounded bg-card w-[27%] p-2 space-y-5 min-h-[500px] relative">
         <div className="flex flex-col gap-2">
            <p className="font-medium text-xl pb-2">Tâches</p>
            <span
               className="flex items-center justify-between text-sm cursor-pointer hover:font-semibold"
               onClick={() => handleSelectedAllTasks()}
            >
               <p>Toutes</p>
               <Checkbox checked={allChecked} />
            </span>
            <span
               className="flex items-center justify-between text-sm cursor-pointer hover:font-semibold"
               onClick={() => handleSelectedDoneTasks("done")}
            >
               <p>Terminées</p>
               <Checkbox checked={doneChecked} />
            </span>
            <span
               className="flex items-center justify-between text-sm cursor-pointer hover:font-semibold"
               onClick={() => handleSelectedTodoTasks("todo")}
            >
               <p>A faire</p>
               <Checkbox checked={todoChecked} />
            </span>
         </div>
         {/* TodoLists */}
         <div>
            <p className="font-medium text-xl pb-2">Mes listes</p>
            <div className="space-y-2 capitalize">
               {allList.length === 0 ? (
                  <p className="text-sm">Aucune liste créé</p>
               ) : (
                  allList.map((list) => (
                     <div
                        key={list.id}
                        onClick={() => handleSelectedList(list.id)}
                     >
                        <p className="text-sm cursor-pointer hover:font-semibold">
                           {list.name}
                        </p>
                     </div>
                  ))
               )}
            </div>
         </div>

         <div className="absolute bottom-2 left-[50%] translate-x-[-50%] w-full">
            <CreateTodo />
         </div>
      </div>
   );
};
