import { createContext, Dispatch, SetStateAction } from "react";

export interface userInterface {
    name: String;
    surname: String;
    photo: Blob[];
}


type ContextType = [userInterface | null, (x: userInterface | null) => void];

export const UserContext = createContext<ContextType>([null, () => undefined])