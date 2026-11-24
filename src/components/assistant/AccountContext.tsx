import { createContext, useContext } from "react";
export const AccountContext = createContext({ signedIn: false, loading: true });
export const useAssistantAccount = () => useContext(AccountContext);