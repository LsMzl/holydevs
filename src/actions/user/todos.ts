"use server";
import { db } from "@/lib/prisma";
import { createTaskSchema, createTodoSchema } from "@/schema/todoSchema";

import { auth } from "@clerk/nextjs/server";
import { z } from "zod";
import { getUserByClerkId } from "../getUserByClerkId";

export const createTodo = async (values: z.infer<typeof createTodoSchema>) => {
   console.log("values", values);
   // Vérification des champs
   const validateFields = createTodoSchema.safeParse(values);
   if (!validateFields.success) {
      return { error: "Champs invalides" };
   }

   const { userId } = auth();

   if (!userId) {
      return { error: "Non autorisé" };
   }
   const user = await getUserByClerkId(userId);
   if (!user) {
      return { error: "Non autorisé" };
   }

   // Création de la liste
   await db.todolist.create({
      data: {
         user: {
            connect: { id: user.id },
         },
         name: values.name,
      },
   });

   return { success: "Liste créée" };
};

export const deleteTodo = async (todolistId: string) => {
   // Utilisateur connecté
   const { userId } = auth();
   if (!userId) {
      return { error: "Non autorisé" };
   }

   const user = await getUserByClerkId(userId);
   if (!user) {
      return { error: "Non autorisé" };
   }

   // Création du post
   await db.todolist.delete({
      where: {
         id: todolistId,
      },
   });

   return { success: "Liste supprimée" };
};

export const editTask = async (
   values: z.infer<typeof createTaskSchema>,
   taskId: string
) => {
   console.log("values", values);
   // Vérification des champs
   const validateFields = createTodoSchema.safeParse(values);
   if (!validateFields.success) {
      return { error: "Champs invalides" };
   }

   const { userId } = auth();

   if (!userId) {
      return { error: "Non autorisé" };
   }
   const user = await getUserByClerkId(userId);
   if (!user) {
      return { error: "Non autorisé" };
   }

   // Création de la liste
   await db.task.update({
      where: {
         id: taskId,
      },
      data: {
         ...values,
      },
   });

   return { success: "Tâche modifiée" };
};
export const createTask = async (
   values: z.infer<typeof createTaskSchema>,
   todoListId: string
) => {
   console.log("values", values);
   // Vérification des champs
   const validateFields = createTodoSchema.safeParse(values);
   if (!validateFields.success) {
      return { error: "Champs invalides" };
   }

   const { userId } = auth();

   if (!userId) {
      return { error: "Non autorisé" };
   }
   const user = await getUserByClerkId(userId);
   if (!user) {
      return { error: "Non autorisé" };
   }

   // Création de la liste
   await db.task.create({
      data: {
         todoList: {
            connect: { id: todoListId },
         },
         ...values,
         isDone: false,
      },
   });

   return { success: "Tâche ajoutée à votre liste" };
};
