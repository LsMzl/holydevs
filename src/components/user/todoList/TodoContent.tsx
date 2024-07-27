"use client";
import { Separator } from "@/components/shadcn/separator";
import React, { useState } from "react";
import { AddTask } from "./AddTask";
import { Checkbox } from "@/components/shadcn/checkbox";
import { PenIcon, X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Task, Todolist } from "@prisma/client";
import { DeleteList } from "./DeleteList";
import { cn } from "@/lib/utils";
import { EditTask } from "./EditTask";

interface TodoContentProps {
   allList: Todolist[];
   allTasks: Task[];
}

export const TodoContent = ({ allList, allTasks }: TodoContentProps) => {
   // Récupération de l'id de la liste dans l'URL
   const searchParams = useSearchParams();
   const search = searchParams.get("liste");

   // Récupération des tâches selon leur statut
   const taskStatus = searchParams.get("status");
   let isDone: boolean;
   if (taskStatus === "done") {
      isDone = true;
   } else if (taskStatus === "todo") {
      isDone = false;
   }

   // Liste active selon l'id de la liste dans l'URL
   const activeList = allList.filter((list) => list.id === search);
   if (activeList.length === 0) {
      return (
         <p className="bg-card rounded p-2 w-full">
            Veuillez sélectionner une liste pour continuer
         </p>
      );
   }

   // Liste des tâches selon ID de la todoList
   const tasksByListId = allTasks.filter(
      (task) => task.todoListId === activeList[0].id
   );

   // Filtrage des tâches selon le statut selectionné
   const filteredTasks = tasksByListId.filter((task) => task.isDone == isDone);

   return (
      <div className="rounded bg-card w-[73%] p-5 min-h-[330px]">
         {/* Liste non sélectionnée */}
         {activeList.length === 0 ? (
            <p>Veuillez sélectionner une liste pour continuer</p>
         ) : (
            <>
               <div className="flex items-center justify-between">
                  <p className="text-2xl font-medium">{activeList[0].name}</p>
                  <DeleteList todoListId={activeList[0].id} />
               </div>
               <Separator className="my-5" />
               <AddTask listId={activeList[0].id} />
               {/* Tâches non triées */}
               {filteredTasks.length === 0 ? (
                  tasksByListId.length === 0 ? (
                     <p className="text-sm mt-5">
                        Cette liste ne contient aucune tâche
                     </p>
                  ) : (
                     tasksByListId.map((task) => (
                        <div
                           className="flex flex-col gap-2 mt-5 "
                           key={task.id}
                        >
                           {/* Task */}
                           <div
                              className={cn(
                                 task.isDone
                                    ? "bg-foreground/10"
                                    : "bg-background/80",
                                 "border rounded flex items-start gap-2 p-3"
                              )}
                           >
                              <Checkbox className="mt-1" />
                              {/* Details */}
                              <div className="flex flex-col gap-2">
                                 <div>
                                    <p className="font-medium">
                                       {task.name} {task.isDone && "(terminé)"}
                                    </p>
                                    <p className="text-xs text-foreground/80">
                                       {task.description}
                                    </p>
                                 </div>
                                 {task.isDone == false && (
                                    <div className="flex items-center gap-3">
                                       <EditTask task={task} />
                                       <span className="flex items-center gap-1 text-red-600 cursor-pointer hover:font-semibold -ml-0.5">
                                          <X className="h-4 w-4" />
                                          <p className="text-xs">Supprimer</p>
                                       </span>
                                    </div>
                                 )}
                              </div>
                           </div>
                        </div>
                     ))
                  )
               ) : (
                  // Tâches triées
                  filteredTasks.map((filteredTask) => (
                     <div
                        className="flex flex-col gap-2 mt-5 "
                        key={filteredTask.id}
                     >
                        {/* Task */}
                        <div
                           className={cn(
                              filteredTask.isDone
                                 ? "bg-foreground/10"
                                 : "bg-background/80",
                              "border rounded flex items-start gap-2 p-3"
                           )}
                        >
                           <Checkbox className="mt-1" />
                           {/* Details */}
                           <div className="flex flex-col gap-2">
                              <div>
                                 <p className="font-medium">
                                    {filteredTask.name}{" "}
                                    {filteredTask.isDone && "(terminé)"}
                                 </p>
                                 <p className="text-xs text-foreground/80">
                                    {filteredTask.description}
                                 </p>
                              </div>
                              {filteredTask.isDone == false && (
                                 <div className="flex items-center gap-3">
                                    <EditTask task={filteredTask} />
                                    <span className="flex items-center gap-1 text-red-600 cursor-pointer hover:font-semibold -ml-0.5">
                                       <X className="h-4 w-4" />
                                       <p className="text-xs">Supprimer</p>
                                    </span>
                                 </div>
                              )}
                           </div>
                        </div>
                     </div>
                  ))
               )}
            </>
         )}
      </div>
   );
};
