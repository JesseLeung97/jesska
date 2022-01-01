import React, { useContext, useState } from 'react';
import { themes } from "theme/themes";
import { TColorTheme } from "types/themeTypes";

type TThemeContext = { theme: TColorTheme; toggleTheme: () => void };

export const ThemeContext = React.createContext<TThemeContext>(
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