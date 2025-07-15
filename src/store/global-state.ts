import { createContext, useContext } from "react";
import type { GlobalStateType } from "..";

export const globalContext = createContext<GlobalStateType>({
    user:null,
    setUser: () => {}
})

export function useGlobalContext(){
    return useContext(globalContext);
}