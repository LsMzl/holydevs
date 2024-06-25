"use client";

import { User } from "@prisma/client";
import { createContext, useContext, useState } from "react";

type userContext ={
   id: string;
   firstname: string;
}


const UserContext = createContext<userContext>({id: 'blabla', firstname: "Michel"} );

export const UserContextProvider = ({children} : {children: React.ReactNode}) => {
   let [state, setState] = useState({})
   return (
      <UserContext.Provider value={state}>
         {children}
      </UserContext.Provider>
   );
};

export function useUserContext() {
   return useContext(UserContext)
}
