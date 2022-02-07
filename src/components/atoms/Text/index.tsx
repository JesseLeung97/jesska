import React from "react";
import classes from "./styles.module.css";
//----- Types -----//
import { TAtomSize, TAtomTextColor } from "types/atomTypes";
//----- Context -----//
import { useTheme } from "theme/ThemeContext";
//----- Hooks and helpers -----//
import { GetAtomColor } from "types/atomTypes";
//----- Components -----//
//----- Configuration -----//

interface TextProps {
    className?: string,
    size?: TAtomSize,
    color?: TAtomTextColor,
    isAnimated?: boolean
    children: React.ReactNode
}

export const Text: React.FC<TextProps> = ({ 
    className,
    size,
    color,
    isAnimated,
    children
 }) => {

    const { theme } = useTheme();

    isAnimated = isAnimated ?? false;
    const isAnimtedClass = isAnimated ? classes.text_animation : "";

    console.log( theme.themeName );

    return (
        <label 
            className={`${className} ${classes[size ?? "medium"]} ${isAnimtedClass}`}
            style={{color: GetAtomColor(theme.themeName, color ?? "primary")}}>
            { children }
        </label>
    );
}
