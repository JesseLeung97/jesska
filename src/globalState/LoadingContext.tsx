import React, { useContext, useState } from "react";
import { TComponentLoading, TApplicationLoading, TLoading } from "types/loadingTypes";

type TLoadingContext = { isLoading: TLoading; subscribeToLoading: () => any };


export const LoadingContext = React.createContext<TLoadingContext>(
    {} as TLoadingContext
);

export const useLoading = (): TLoadingContext => {
    return useContext(LoadingContext);
}

const LoadingProvider: React.FC = ({ children }) => {
    const [isLoading, setIsLoading] = useState<TLoading>("loading");
    const subscribeToLoading = () => {

    }

    return (
        <LoadingContext.Provider value={{isLoading, subscribeToLoading}}>
            { children }
        </LoadingContext.Provider>
    );
}