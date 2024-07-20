"use client";

// React / Next
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Libraries
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { ICity, IState } from "country-state-city";

// Types
import { UserOnboardingTypes } from "@/types/user/onboarding";

// Hooks
import useLocation from "@/app/hooks/useLocations";

// Icons
import { LoaderCircle } from "lucide-react";

// UI Components
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/shadcn/form";
import { Input } from "@/components/shadcn/input";
import { toast } from "@/components/shadcn/use-toast";
import { Button } from "@/components/shadcn/button";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/shadcn/select";


// Zod Schema
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
   country: z.string().min(1, {
      message: "Vous devez sélectionner un pays",
   }),
   state: z.string().min(1, {
      message: "Vous devez sélectionner un état ou département",
   }),
   city: z.string().min(1, {
      message: "La ville est requise",
   }),
   address: z.string().min(1, {
      message: "L'adresse est requise",
   }),
});

export const UserFirstStep = ({ user }: UserOnboardingTypes) => {
   // States
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const [states, setStates] = useState<IState[]>([]);
   const [cities, setCities] = useState<ICity[]>([]);

   const { getAllCountries, getCountryStates, getStateCities } = useLocation();
   const countries = getAllCountries();

   const router = useRouter();

   // Form values
   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         firstname: user.firstName || "",
         lastname: user.lastName || "",
         username: user.username || "",
         email: user.email || "",
         phone: user.phone || "",
         country: "",
         state: "",
         city: "",
         address: "",
      },
   });

   // Use Effects
   /** Récupération des états d'un pays lors d'un changement dans le formulaire */
   useEffect(() => {
      const selectedCountry = form.watch("country");
      // Récupération des états du pays selectionné
      const countryStates = getCountryStates(selectedCountry);
      if (countryStates) {
         setStates(countryStates);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [form.watch("country")]);

   /** Récupération des états d'un pays lors d'un changement dans le formulaire */
   useEffect(() => {
      const selectedCountry = form.watch("country");
      const selectedState = form.watch("state");
      // Récupération des villes de l'état selectionné
      const stateCities = getStateCities(selectedCountry, selectedState);
      if (stateCities) {
         setCities(stateCities);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [form.watch("country"), form.watch("state")]);

   const handleClick = () => {
      console.log("first")
   }


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
                        {/* Nom de famille */}
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
                     {/* Pseudo */}
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

                     {/* Localisation */}
                     <div className="grid grid-cols-3 gap-5">
                        <FormField
                           control={form.control}
                           name="country"
                           render={({ field }) => (
                              <FormItem>
                                 <FormLabel htmlFor="country">
                                    Pays <span className="text-red-500">*</span>
                                 </FormLabel>

                                 <FormControl>
                                    <Select
                                       disabled={isLoading}
                                       onValueChange={field.onChange}
                                       value={field.value}
                                       defaultValue={field.value}
                                       name="country"
                                    >
                                       <SelectTrigger
                                          className="bg-background"
                                          name="country"
                                          id="country"
                                       >
                                          <SelectValue
                                             placeholder="Pays"
                                             defaultValue={field.value}
                                          />
                                       </SelectTrigger>
                                       <SelectContent>
                                          {countries.map((country) => (
                                             <SelectItem
                                                key={country.isoCode}
                                                value={country.isoCode}
                                             >
                                                {country.name}
                                             </SelectItem>
                                          ))}
                                       </SelectContent>
                                    </Select>
                                 </FormControl>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />
                        <FormField
                           control={form.control}
                           name="state"
                           render={({ field }) => (
                              <FormItem>
                                 <FormLabel htmlFor="state">
                                    Région{" "}
                                    <span className="text-red-500">*</span>
                                 </FormLabel>

                                 <FormControl>
                                    <Select
                                       disabled={isLoading || states.length < 1}
                                       onValueChange={field.onChange}
                                       value={field.value}
                                       defaultValue={field.value}
                                       name="state"
                                    >
                                       <SelectTrigger
                                          className="bg-background"
                                          name="state"
                                          id="state"
                                       >
                                          <SelectValue
                                             placeholder="Région"
                                             defaultValue={field.value}
                                          />
                                       </SelectTrigger>
                                       <SelectContent>
                                          {states.map((state) => (
                                             <SelectItem
                                                key={state.isoCode}
                                                value={state.isoCode}
                                             >
                                                {state.isoCode} - {state.name}
                                             </SelectItem>
                                          ))}
                                       </SelectContent>
                                    </Select>
                                 </FormControl>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />

                        <FormField
                           control={form.control}
                           name="city"
                           render={({ field }) => (
                              <FormItem>
                                 <FormLabel htmlFor="city">
                                    Ville{" "}
                                    <span className="text-red-500">*</span>
                                 </FormLabel>

                                 <FormControl>
                                    <Select
                                       disabled={isLoading || cities.length < 1}
                                       onValueChange={field.onChange}
                                       value={field.value}
                                       defaultValue={field.value}
                                       name="city"
                                    >
                                       <SelectTrigger
                                          className="bg-background"
                                          name="city"
                                          id="city"
                                       >
                                          <SelectValue
                                             placeholder="Ville"
                                             defaultValue={field.value}
                                          />
                                       </SelectTrigger>
                                       <SelectContent>
                                          {cities.map((city) => (
                                             <SelectItem
                                                key={city.name}
                                                value={city.name}
                                             >
                                                {city.name}
                                             </SelectItem>
                                          ))}
                                       </SelectContent>
                                    </Select>
                                 </FormControl>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />
                     </div>
                     {/* Adresse */}
                     <FormField
                           control={form.control}
                           name="address"
                           render={({ field }) => (
                              <FormItem>
                                 <FormLabel htmlFor="address">
                                    Adresse{" "}
                                    <span className="text-red-500">*</span>
                                 </FormLabel>
                                 <FormControl>
                                    <Input
                                       type="text"
                                       placeholder="15 rue ici"
                                       {...field}
                                       id="address"
                                       name="address"
                                       autoComplete="true"
                                    />
                                 </FormControl>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />

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
