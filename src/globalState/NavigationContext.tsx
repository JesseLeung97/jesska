import React, { useState, useContext, createContext } from "react";

type TNavigationContext = { currentPage: number, setCurrentPage: (currentPage: number) => void };

export const NavigationContext = createContext<TNavigationContext>(
    {} as TNavigationContext
);

export const useNavigation = (): TNavigationContext => {
    return useContext(NavigationContext);
}

const NavigationProvider: React.FC = ({ children }) => {
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

export default NavigationProvider;
