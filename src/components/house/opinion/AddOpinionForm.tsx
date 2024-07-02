"use client";
import React, { useState } from "react";

import {
   Dialog,
   DialogClose,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/shadcn/dialog";
import { Button } from "@/components/shadcn/button";
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/shadcn/form";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/shadcn/input";
import { Textarea } from "@/components/shadcn/textarea";
import { Separator } from "@/components/shadcn/separator";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";

import { toast } from "@/components/shadcn/use-toast";

const formSchema = z.object({
   title: z
      .string()
      .min(2, { message: "Le titre doit contenir au moins 2 caractères" }),
   content: z.string().min(5, {
      message: "Votre avis doit contenir au moins 5 caractères",
   }),
});

const AddOpinionForm = () => {
   const [isLoading, setIsLoading] = useState(false);
   const router = useRouter();

   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         title: "",
         content: "",
      },
   });

   function onSubmit(values: z.infer<typeof formSchema>) {
      setIsLoading(true);
      axios
         .post(`../api/opinion/${house?.id}`, values)
         .then((res) => {
            toast({
               variant: "success",
               description: "Informations modifiées avec succès !",
            });
            setIsLoading(false);
            router.refresh();
         })
         .catch((error) => {
            console.log(error);
            toast({
               variant: "destructive",
               description:
                  "Une erreur est survenue, veuillez réessayer plus tard",
            });
            setIsLoading(false);
         });
   }
   return (
      <Dialog>
         <DialogTrigger asChild>
            <div>
               {/* Mobile */}
               <Button size="sm" className="md:hidden">
                  + Avis
               </Button>
               {/* Screen */}
               <Button className="hidden md:block">
                  Mettre un avis
               </Button>
            </div>
         </DialogTrigger>
         <DialogContent>
            <DialogHeader>
               <DialogTitle>Mettre un avis</DialogTitle>
               <DialogDescription>
                  Partagez avec les autres utilisateurs votre avis sur cette
                  annonce
               </DialogDescription>
            </DialogHeader>
            <Separator className="my-3" />
            <Form {...form}>
               <form onSubmit={form.handleSubmit(onSubmit)}>
                  <div className="space-y-5">
                     <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel htmlFor="title">Titre</FormLabel>
                              <FormControl>
                                 <Input
                                    placeholder="Donnez envie aux membres d'entrer en contact avec vous"
                                    {...field}
                                    id="title"
                                    name="title"
                                    autoComplete="title"
                                 />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                     <FormField
                        control={form.control}
                        name="content"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel htmlFor="content">Contenu</FormLabel>
                              <FormControl>
                                 <Textarea
                                    placeholder="Donnez envie aux membres d'entrer en contact avec vous"
                                    {...field}
                                    id="content"
                                    name="content"
                                    autoComplete="content"
                                 />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                  </div>
                  <DialogFooter className="mt-3">
                     <DialogClose className="space-x-2">
                        <Button
                           disabled={isLoading}
                           className="max-w-[150px] self-end"
                           type="submit"
                        >
                           {isLoading ? (
                              // Pendant le chargement
                              <>
                                 <Loader2 className="h-4 w-4" />
                              </>
                           ) : (
                              // Sans chargement
                              <>Publier</>
                           )}
                        </Button>
                        <Button variant="secondary" type="button">
                           Annuler
                        </Button>
                     </DialogClose>
                  </DialogFooter>
               </form>
            </Form>
         </DialogContent>
      </Dialog>
   );
};

export default AddOpinionForm;
