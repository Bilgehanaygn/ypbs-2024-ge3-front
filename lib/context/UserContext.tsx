import {createContext, Dispatch, ReactNode, SetStateAction, useState} from "react";

export interface userInterface {
    name: String;
    surname: String;
    photo: Blob[];
}


type ContextType = [userInterface | null, Dispatch<SetStateAction<userInterface | null>>];

export const UserContext = createContext<ContextType>([null, () => undefined]);
