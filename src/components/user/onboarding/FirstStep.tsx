"use client";
import React, { useState } from "react";

// Libraries
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserOnboardingTypes } from "@/types/user/onboarding";
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/shadcn/form";
import { Input } from "@/components/shadcn/input";
import axios from "axios";
import { toast } from "@/components/shadcn/use-toast";
import { Button } from "@/components/shadcn/button";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
   firstname: z.string().min(2, {
      message: "Votre prénom doit contenir au moins 2 caractères",
   }),
   lastname: z.string().min(2, {
      message: "Votre nom de famille doit contenir au moins 2 caractères",
   }),
   username: z.string().min(4, {
      message: "Votre pseudo doit contenir au moins 4 caractères",
   }),
   email: z.string().email({
      message: "Votre email n'est pas valide",
   }),
   phone: z.string().min(10, {
      message: "Votre numéro de téléphone n'est pas valide",
   }),
});

export const UserFirstStep = ({ user }: UserOnboardingTypes) => {
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const router = useRouter();

   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         firstname: user.firstName || "",
         lastname: user.lastName || "",
         username: user.username || "",
         email: user.email || "",
         phone: user.phone || "",
      },
   });

   function onSubmit(values: z.infer<typeof formSchema>) {
      console.log("onSubmit", values);
      setIsLoading(true);
      axios
         .post("/api/user/onboarding", values)
         .then((res) => {
            toast({
               variant: "success",
               description: "Super, plus qu'une étape !",
            });
            setIsLoading(false);
            console.log("res", res.data.username);
            router.push(`/onboarding/ ${res.data.username}`);
         })
         .catch((error) => {
            console.log(error);
            toast({
               variant: "destructive",
               description: "Une erreur s'est produite",
            });
            setIsLoading(false);
         });
   }

   return (
      <section className="flex m-auto h-screen max-sm:mx-5 ">
         <div className="flex flex-col md:flex-row justify-center items-center m-auto w-7xl">
            {/* Left section */}
            <div className="mb-3 md:mb-6 lg:mb-0 flex-1 flex flex-col rounded-l-xl py-5 bg-gradient-to-b from-foreground/10 to-transparent self-start">
               <div className=" md:w-[350px] m-auto ">
                  <h1 className=" text-center md:text-start text-3xl md:text-4xl font-medium mb-3">
                     Bienvenue sur <br /> Holydevs !
                  </h1>
                  <p className="text-sm">
                     Pour finaliser votre inscription, merci de compléter les
                     informations demandées. Elles serviront à vous connecter et
                     permettront aux autres utilisateurs d'entrer en contact
                     avec vous.
                  </p>
               </div>
            </div>
            {/* Right section */}
            <div className="flex-1 flex flex-col gap-3 items-center justify-center rounded-b-xl rounded-l-none md:ml-5">
               <Form {...form}>
                  <form
                     className="md:space-y-5 mb-5 md:mb-10 flex flex-col"
                     onSubmit={form.handleSubmit(onSubmit)}
                  >
                     {/* Nom et prénom */}
                     <div className="flex gap-5">
                        <FormField
                           control={form.control}
                           name="lastname"
                           render={({ field }) => (
                              <FormItem>
                                 <FormLabel htmlFor="lastname">
                                    Nom de famille{" "}
                                    <span className="text-red-500">*</span>
                                 </FormLabel>
                                 <FormControl>
                                    <Input
                                       placeholder="Maison au bord de la mer..."
                                       {...field}
                                       id="lastname"
                                       name="lastname"
                                       autoComplete="true"
                                    />
                                 </FormControl>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />
                        <FormField
                           control={form.control}
                           name="firstname"
                           render={({ field }) => (
                              <FormItem>
                                 <FormLabel htmlFor="firstname">
                                    Prénom{" "}
                                    <span className="text-red-500">*</span>
                                 </FormLabel>
                                 <FormControl>
                                    <Input
                                       placeholder="Maison au bord de la mer..."
                                       {...field}
                                       id="firstname"
                                       name="firstname"
                                       autoComplete="true"
                                    />
                                 </FormControl>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />
                     </div>
                     <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel htmlFor="username">
                                 Pseudo <span className="text-red-500">*</span>
                              </FormLabel>
                              <FormControl>
                                 <Input
                                    placeholder="Maison au bord de la mer..."
                                    {...field}
                                    id="username"
                                    name="username"
                                    autoComplete="true"
                                 />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                     {/* Mail et phone */}
                     <div className="grid grid-cols-2 gap-5">
                        <FormField
                           control={form.control}
                           name="email"
                           render={({ field }) => (
                              <FormItem>
                                 <FormLabel htmlFor="email">
                                    Email{" "}
                                    <span className="text-red-500">*</span>
                                 </FormLabel>
                                 <FormControl>
                                    <Input
                                       type="email"
                                       placeholder="votre@email.fr"
                                       {...field}
                                       id="email"
                                       name="email"
                                       autoComplete="true"
                                    />
                                 </FormControl>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />
                        <FormField
                           control={form.control}
                           name="phone"
                           render={({ field }) => (
                              <FormItem>
                                 <FormLabel htmlFor="phone">
                                    Numéro de téléphone
                                 </FormLabel>
                                 <FormControl>
                                    <Input
                                       placeholder="0123456789"
                                       {...field}
                                       id="phone"
                                       name="phone"
                                       autoComplete="true"
                                    />
                                 </FormControl>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />
                     </div>
                     <Button
                        disabled={isLoading}
                        className="w-[150px] self-end"
                        type="submit"
                     >
                        {isLoading ? (
                           // Pendant le chargement
                           <>
                              <LoaderCircle className="h-4 w-4 animate-spin" />
                           </>
                        ) : (
                           // Sans chargement
                           <>Suivant</>
                        )}
                     </Button>
                  </form>
               </Form>
            </div>
         </div>
      </section>
   );
};
