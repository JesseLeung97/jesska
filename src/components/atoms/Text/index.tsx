import React from "react";
import classes from "./styles.module.css";
import { GetAtomColor, TAtomSize, TAtomTextColor } from "types/atomTypes";
import { useTheme } from "theme/ThemeContext";


interface TextProps {
    size?: TAtomSize,
    color?: TAtomTextColor,
    isAnimated?: boolean
    children: React.ReactNode
}

export const Text: React.FC<TextProps> = ({ 
    size,
    color,
    isAnimated,
    children
 }) => {

    const theme = useTheme().theme;

    isAnimated = isAnimated ?? false;
    const isAnimtedClass = isAnimated ? classes.text_animation : "";

    return (
        <label 
            className={`${classes[size ?? "medium"]} ${isAnimtedClass}`}
            style={{color: GetAtomColor(theme.themeName, color ?? "primary")}}
        >
            { children }
        </label>
    );
}
