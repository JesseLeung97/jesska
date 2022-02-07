import React from "react";
//----- Types -----//
//----- Context -----//
import { useContext, createContext } from "react";
//----- Hooks and helpers -----//
import { useState } from "react";
//----- Components -----//
//----- Configuration -----//

type TNavigationContext = { currentPage: number, setCurrentPage: (currentPage: number) => void };

export const NavigationContext = createContext<TNavigationContext>(
    {} as TNavigationContext
);

export const useNavigation = (): TNavigationContext => {
    return useContext(NavigationContext);
}

export const NavigationProvider: React.FC = ({ children }) => {
    const [currentPageNumber, setCurrentPageNumber] = useState<number>(0);
    const setCurrentPage = (currentPage: number) => {
        setCurrentPageNumber(currentPage);
    }
    return (
        <NavigationContext.Provider value={{ currentPage: currentPageNumber, setCurrentPage: setCurrentPageNumber}}>
            { children }
        </NavigationContext.Provider>
    );
}