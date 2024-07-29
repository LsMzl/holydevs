"use client";
import React, { useState } from "react";

import {
   Form,
   FormControl,
   FormDescription,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/shadcn/form";

// Libraries
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/shadcn/input";
import { Switch } from "@/components/shadcn/switch";
import { v4 as uuidv4 } from "uuid";
import { Checkbox } from "@/components/shadcn/checkbox";

import House from "../../../../public/img/house.jpg";
import Glasses from "../../../../public/img/lunettes.jpg";
import Palmier from "../../../../public/img/palmier.jpg";
import Van from "../../../../public/img/van.jpg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/shadcn/select";
import { cn } from "@/lib/utils";
import { Camera, Loader2 } from "lucide-react";
import axios from "axios";
import { toast } from "@/components/shadcn/use-toast";
import { Button } from "@/components/shadcn/button";
import { HouseOnboardingTypes } from "@/types/house/onboarding";
import useLocation from "@/app/hooks/useLocations";

const formSchema = z.object({
   image: z.string().min(1, {
      message: "Au moins 1 photo est requise",
   }),
   bedroom: z.coerce.number().min(1, {
      message: "Vous devez posséder au moins 1 chambre",
   }),
   kitchen: z.coerce.number().min(1, {
      message: "Vous devez posséder au moins 1 cuisine",
   }),
   bathroom: z.coerce.number().min(1, {
      message: "Vous devez posséder au moins 1 salle de bain",
   }),

   features: z.array(z.string()).refine((value) => value.some((item) => item), {
      message: "You have to select at least one item.",
   }),
   categories: z.string().min(1, {
      message: "Vous devez sélectionner un pays",
   }),
   types: z.string().min(1, {
      message: "Vous devez sélectionner un état ou département",
   }),
   price: z.coerce.number().min(1, {
      message: "Le prix doit être supérieur à 0",
   }),
   isAvailable: z.boolean(),
});

const SecondStep = ({
   house,
   categories,
   features,
   types,
}: HouseOnboardingTypes) => {
   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         image: "",
         bedroom: 0,
         kitchen: 0,
         bathroom: 0,
         categories: "",
         types: "",
         features: [],
         price: 0,
         isAvailable: true,
      },
   });

   const router = useRouter();

   const [isLoading, setIsLoading] = useState<boolean>(false);


   const [files, setFiles] = useState<File[]>([]);

   // Récupération des données du local storage
   const houseStorage = JSON.parse(localStorage.getItem("house") || "");

   const { getCountryByCode, getStateByCode, getStateCities } = useLocation();
   const country = getCountryByCode(houseStorage.country);
   const state = getStateByCode(houseStorage.country, houseStorage.state);
   const cities = getStateCities(houseStorage.country, houseStorage.state);
   const city = cities?.filter((city) => city.name === houseStorage.city);

   /** Affichage de l'image selectionnée par l'utilisateur.*/
   const handleImageSelect = (
      e: React.ChangeEvent<HTMLInputElement>,
      fieldChange: (value: string) => void
   ) => {
      e.preventDefault();

      const fileReader = new FileReader();

      if (e.target.files && e.target.files.length > 0) {
         const file = e.target.files?.[0];
         setFiles(Array.from(e.target.files));

         if (!file.type.includes("image")) return;

         fileReader.onload = async (event) => {
            const imageDataUrl = event.target?.result?.toString() || "";
            fieldChange(imageDataUrl);
         };

         fileReader.readAsDataURL(file);
      }
   };

   function onSubmit(values: z.infer<typeof formSchema>) {
      axios
         .patch(`/api/house/${house?.id}`, values)
         .then((res) => {
            toast({
               variant: "success",
               description: "Annonce créée avec succès !",
            });
            setIsLoading(false);
            localStorage.clear();
            router.push(`/annonce/${house?.id}`);
         })
         .catch((error) => {
            console.log(error);
            toast({
               variant: "destructive",
               description:
                  "Une erreur est survenue lors de la création de l'annonce",
            });
            setIsLoading(false);
         });
   }

   return (
      <section className="flex flex-col md:flex-row justify-center items-start max-w-7xl m-auto px-10 pt-20 ">
         {/* left section */}
         <div className="flex-1 flex flex-col items-center justify-center rounded-l-xl py-5 bg-gradient-to-b from-foreground/10 to-background mb-10">
            <div className="">
               <div className="px-10">
                  <h2 className="text-3xl font-semibold mb-2">
                     Dernière étape
                  </h2>
                  <p className="text-sm text-gray-400 font-light">
                     Phrase explicative Lorem ipsum dolor sit amet consectetur
                     adipisicing elit. Architecto, voluptate.
                  </p>
                  {/* Récapitulatif */}
                  <div className="border rounded-lg my-5 p-2 bg-card/40">
                     <p className="text-sm font-medium">
                        Récapitulatif de votre annonce:
                     </p>
                     <div className="text-xs p-2 flex flex-col gap-2">
                        <div>
                           <p className="font-semibold">Titre:</p>
                           <p className="text-sm">{houseStorage.title}</p>
                        </div>
                        <div>
                           <p className="font-semibold">Introduction:</p>
                           <p className="text-sm">
                              {houseStorage.introduction}
                           </p>
                        </div>
                        <div>
                           <p className="font-semibold">Description:</p>
                           <p className="text-sm max-h-36 overflow-y-auto">
                              {houseStorage.description}
                           </p>
                        </div>
                        <div>
                           <p className="font-semibold">Localisation:</p>
                           <div className="flex items-center gap-2 text-sm">
                              <p>Pays: {country?.name}</p>
                              <p>Région: {state?.name}</p>
                              <p>Ville: {city[0].name}</p>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               {/* Illustrations */}
               <div className="w-full h-96 flex justify-between gap-2 mt-10">
                  <div className="relative self-start rounded-lg bg-background h-[320px] w-[25%] drop-shadow">
                     <Image
                        src={House}
                        alt=""
                        fill
                        sizes="100%"
                        className="absolute top-0 left-0 object-cover rounded-lg"
                     />
                  </div>
                  <div className="relative self-end rounded-lg bg-background h-[320px] w-[25%] drop-shadow">
                     <Image
                        src={Glasses}
                        alt=""
                        fill
                        sizes="100%"
                        className="absolute top-0 left-0 object-cover rounded-lg"
                     />
                  </div>
                  <div className="relative self-start rounded-lg bg-background h-[320px] w-[25%] drop-shadow">
                     <Image
                        src={Palmier}
                        alt=""
                        fill
                        sizes="100%"
                        className="absolute top-0 left-0 object-cover rounded-lg"
                     />
                  </div>
                  <div className="relative self-end rounded-lg bg-background h-[320px] w-[25%] drop-shadow">
                     <Image
                        src={Van}
                        alt=""
                        fill
                        sizes="100%"
                        className="absolute top-0 left-0 object-cover rounded-lg"
                     />
                  </div>
               </div>
            </div>
         </div>
         {/* Right section */}
         <div className="flex-1 flex flex-col gap-3 items-center justify-center">
            <Form {...form}>
               <form className="px-10" onSubmit={form.handleSubmit(onSubmit)}>
                  <div className="mb-5 flex flex-col gap-5">
                     {/* Photo */}
                     <div className="relative group">
                        <p className="mb-2">Image</p>
                        <FormField
                           control={form.control}
                           name="image"
                           render={({ field }) => (
                              <FormItem className=" w-full h-[188px]">
                                 <FormLabel htmlFor="image">
                                    {field.value ? (
                                       <Image
                                          src={field.value}
                                          alt="Photo de l'annonce"
                                          fill
                                          sizes="100%"
                                          priority
                                          className="absolute top-0 left-0 rounded w-full object-fit"
                                       />
                                    ) : (
                                       <div className="bg-blue-200/80 h-48 border-dashed border-2 border-blue-500 rounded " />
                                    )}
                                 </FormLabel>
                                 <FormControl>
                                    <label
                                       className={cn(
                                          isLoading
                                             ? "cursor-not-allowed"
                                             : "cursor-pointer",
                                          " font-medium animate shadow"
                                       )}
                                       htmlFor="image"
                                    >
                                       <div className="hidden group-hover:flex items-center gap-2 text-sm absolute bottom-[35%]  left-[50%] -translate-x-[50%] bg-secondary hover:bg-primary rounded p-2">
                                          <Camera />
                                          <span className="hidden md:block">
                                             Sélectionner une photo
                                          </span>
                                       </div>
                                       <Input
                                          className="hidden"
                                          type="file"
                                          accept="image/*"
                                          onChange={(e) =>
                                             handleImageSelect(
                                                e,
                                                field.onChange
                                             )
                                          }
                                          id="image"
                                          name="image"
                                       />
                                    </label>
                                 </FormControl>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />
                     </div>
                     {/* Nombres de pièces */}
                     <div>
                        <p className="font-medium">Nombre de pièces</p>
                        <div className="flex justify-between gap-5">
                           {/* Chambres */}
                           <div className="flex-1">
                              <FormField
                                 control={form.control}
                                 name="bedroom"
                                 render={({ field }) => (
                                    <FormItem>
                                       <FormLabel
                                          className="text-xs"
                                          htmlFor="bedroom"
                                       >
                                          Chambre{" "}
                                          <span className="text-red-500">
                                             *
                                          </span>
                                       </FormLabel>
                                       <FormControl>
                                          <Input
                                             type="number"
                                             min="1"
                                             max="10"
                                             step="1"
                                             {...field}
                                             id="bedroom"
                                             name="bedroom"
                                          />
                                       </FormControl>
                                       <FormMessage />
                                    </FormItem>
                                 )}
                              />
                           </div>
                           {/* Cuisine */}
                           <div className="flex-1">
                              <FormField
                                 control={form.control}
                                 name="kitchen"
                                 render={({ field }) => (
                                    <FormItem>
                                       <FormLabel
                                          className="text-xs"
                                          htmlFor="kitchen"
                                       >
                                          Cuisine{" "}
                                          <span className="text-red-500">
                                             *
                                          </span>
                                       </FormLabel>
                                       <FormControl>
                                          <Input
                                             type="number"
                                             min="1"
                                             max="10"
                                             step="1"
                                             {...field}
                                             id="kitchen"
                                             name="kitchen"
                                          />
                                       </FormControl>
                                       <FormMessage />
                                    </FormItem>
                                 )}
                              />
                           </div>
                           {/* Salle de bains */}
                           <div className="flex-1">
                              <FormField
                                 control={form.control}
                                 name="bathroom"
                                 render={({ field }) => (
                                    <FormItem>
                                       <FormLabel
                                          className="text-xs"
                                          htmlFor="bathroom"
                                       >
                                          Salle de bain{" "}
                                          <span className="text-red-500">
                                             *
                                          </span>
                                       </FormLabel>
                                       <FormControl>
                                          <Input
                                             type="number"
                                             min="1"
                                             max="10"
                                             step="1"
                                             {...field}
                                             id="bathroom"
                                             name="bathroom"
                                          />
                                       </FormControl>
                                       <FormMessage />
                                    </FormItem>
                                 )}
                              />
                           </div>
                        </div>
                     </div>
                     {/* Types de logement & Catégorie */}
                     <div>
                        <p className="font-medium">
                           Type, catégorie et accessoires du logement
                        </p>
                        <FormDescription className="mb-2">
                           Les utilisateurs pourront retrouver votre annonce
                           grâce aux valeurs choisies
                        </FormDescription>
                        <div className="flex gap-5 mb-2">
                           {/* Type de logement */}
                           <div className="flex-1">
                              <FormField
                                 control={form.control}
                                 name="types"
                                 render={({ field }) => (
                                    <FormItem>
                                       <FormLabel htmlFor="houseType">
                                          Type de logement
                                       </FormLabel>
                                       <FormControl>
                                          <Select
                                             disabled={isLoading}
                                             onValueChange={field.onChange}
                                             value={field.value}
                                             defaultValue={field.value}
                                          >
                                             <SelectTrigger
                                                className="bg-background"
                                                name="houseType"
                                                id="houseType"
                                             >
                                                <SelectValue
                                                   placeholder="Types"
                                                   defaultValue={field.value}
                                                />
                                             </SelectTrigger>

                                             <SelectContent>
                                                {types?.map((type) => (
                                                   <SelectItem
                                                      key={type.id}
                                                      value={type.id}
                                                   >
                                                      {type.name}
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
                           {/* Catégories */}
                           <div className="flex-1">
                              <FormField
                                 control={form.control}
                                 name="categories"
                                 render={({ field }) => (
                                    <FormItem>
                                       <FormLabel htmlFor="categories">
                                          Catégorie{" "}
                                          <span className="text-red-500">
                                             *
                                          </span>
                                       </FormLabel>
                                       <FormControl>
                                          <Select
                                             disabled={isLoading}
                                             onValueChange={field.onChange}
                                             value={field.value}
                                             defaultValue={field.value}
                                          >
                                             <SelectTrigger
                                                className="bg-background"
                                                name="categories"
                                                id="categories"
                                             >
                                                <SelectValue
                                                   placeholder="Catégories"
                                                   defaultValue={field.value}
                                                />
                                             </SelectTrigger>

                                             <SelectContent>
                                                {categories?.map((category) => (
                                                   <SelectItem
                                                      key={category.id}
                                                      value={category.id}
                                                   >
                                                      {category.name}
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
                        </div>
                        {/* Equipements */}
                        <div className="mb-5 max-h-28 overflow-y-auto">
                           <FormField
                              control={form.control}
                              name="features"
                              render={() => (
                                 <FormItem>
                                    <div>
                                       <FormLabel htmlFor="features">
                                          Equipements
                                       </FormLabel>
                                    </div>
                                    <div className="grid grid-cols-3 2xl:grid-cols-4 gap-5 mt-2">
                                       {features?.map((feature) => (
                                          <FormField
                                             key={uuidv4()}
                                             control={form.control}
                                             name="features"
                                             render={({ field }) => (
                                                <FormItem
                                                   key={uuidv4()}
                                                   className="flex flex-row items-end gap-3"
                                                >
                                                   <FormControl>
                                                      <Checkbox
                                                         checked={field.value?.includes(feature.id)}
                                                         name="features"
                                                         id="features"
                                                         onCheckedChange={(checked) => {
                                                            return checked
                                                               ? field.onChange([
                                                                       ...field.value,
                                                                       feature.id,]
                                                                 )
                                                               : field.onChange(
                                                                    field.value?.filter((value) => value !== feature.id));
                                                         }}
                                                      />
                                                   </FormControl>
                                                   <FormLabel className="text-xs">
                                                      {feature.name}
                                                   </FormLabel>
                                                </FormItem>
                                             )}
                                          />
                                       ))}
                                    </div>
                                    <FormMessage />
                                 </FormItem>
                              )}
                           />
                        </div>
                     </div>
                     {/* Price */}
                     <div>
                        <FormField
                           control={form.control}
                           name="price"
                           render={({ field }) => (
                              <FormItem>
                                 <FormLabel htmlFor="price">
                                    Prix par nuit{" "}
                                    <span className="text-red-500">*</span>
                                 </FormLabel>
                                 <FormControl>
                                    <Input
                                       type="number"
                                       min="30"
                                       max="5000"
                                       step="5"
                                       placeholder="130"
                                       {...field}
                                       name="price"
                                       id="price"
                                    />
                                 </FormControl>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />
                     </div>
                     {/* Disponibilité */}
                     <div>
                        <FormField
                           control={form.control}
                           name="isAvailable"
                           render={({ field }) => (
                              <FormItem>
                                 <FormLabel htmlFor="isAvailable">
                                    Rendre votre logement disponible à la
                                    location ?{" "}
                                    <span className="text-red-500">*</span>
                                 </FormLabel>
                                 <FormDescription className="pb-2">
                                    Si vous choisissez "non" votre annonce ne
                                    sera pas visible par les autres utilisateurs
                                 </FormDescription>
                                 <FormControl>
                                    <div className="flex items-center gap-2">
                                       <p className="text-sm font-semibold">
                                          Non
                                       </p>
                                       <Switch
                                          checked={field.value}
                                          onCheckedChange={field.onChange}
                                          name="isAvailable"
                                          id="isAvailable"
                                       />
                                       <p className="text-sm font-semibold">
                                          Oui
                                       </p>
                                    </div>
                                 </FormControl>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />
                     </div>
                  </div>
                  <div className="flex justify-end">
                     <Button disabled={isLoading} className="w-[150px]">
                        {isLoading ? (
                           // Pendant le chargement
                           <>
                              <Loader2 className="mr-2 h-4 w-4" />
                              En cours
                           </>
                        ) : (
                           // Sans chargement
                           <>Terminer</>
                        )}
                     </Button>
                  </div>
               </form>
            </Form>
         </div>
      </section>
   );
};

export default SecondStep;
