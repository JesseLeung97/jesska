import React, { useEffect, useLayoutEffect } from 'react';
//----- Types -----//
import { TColorTheme } from "types/themeTypes";
//----- Context -----//
import { useContext, createContext } from "react";
//----- Hooks and helpers -----//
import { useState } from "react";
//----- Components -----//
//----- Configuration -----//
import { themes } from "theme/themes";
import darkTheme from './themes/darkTheme';

type TThemeContext = { theme: TColorTheme; toggleTheme: () => void };

export const ThemeContext = createContext<TThemeContext>(
    {} as TThemeContext
);

export const useTheme = (): TThemeContext => {
    return useContext(ThemeContext);
}

export const ThemeProvider: React.FC = ({ children }) => {
    
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const [colorTheme, setColorTheme] = useState<TColorTheme>(themes.darkTheme);
    const switchTheme = () => {
        setColorTheme(colorTheme === themes.darkTheme ? themes.lightTheme : themes.darkTheme);
    }

    useLayoutEffect(() => {
        setColorTheme(prefersDark ? themes.darkTheme : themes.lightTheme);
    }, [prefersDark])

    return (
        <ThemeContext.Provider value={{theme: colorTheme, toggleTheme: switchTheme}}>
            {children}
        </ThemeContext.Provider>
    );
}