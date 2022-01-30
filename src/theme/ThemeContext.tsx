import React from 'react';
//----- Types -----//
import { TColorTheme } from "types/themeTypes";
//----- Context -----//
import { useContext, createContext } from "react";
//----- Hooks and helpers -----//
import { useState } from "react";
//----- Components -----//
//----- Configuration -----//
import { themes } from "theme/themes";

type TThemeContext = { theme: TColorTheme; toggleTheme: () => void };

export const ThemeContext = createContext<TThemeContext>(
    {} as TThemeContext
);

export const useTheme = (): TThemeContext => {
    return useContext(ThemeContext);
}

const ThemeProvider: React.FC = ({ children }) => {
    
    const [colorTheme, setColorTheme] = useState<TColorTheme>(themes.darkTheme);
    const switchTheme = () => {
        setColorTheme(colorTheme === themes.darkTheme ? themes.lightTheme : themes.darkTheme);
    }
    return (
        <ThemeContext.Provider value={{theme: colorTheme, toggleTheme: switchTheme}}>
            {children}
        </ThemeContext.Provider>
    );
}

export default ThemeProvider;