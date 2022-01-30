import React from "react";
import classes from "./styles.module.css";
//----- Types -----//
//----- Context -----//
import { useTheme } from "theme/ThemeContext";
//----- Hooks and helpers -----//
//----- Components -----//
//----- Configuration -----//

interface PageWrapperProps {
    children: React.ReactNode
}

export const PageWrapper: React.FC<PageWrapperProps> = ({ children }) => {
    
    const { theme } = useTheme();

    return (
        <div 
            className={classes.outer_container}
            style={{background: theme.colors.backgroundColor}}>
            { children }
        </div>
    );
}