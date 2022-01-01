import React from "react";
import classes from "./styles.module.css";
import { GetAtomColor, TAtomSize, TAtomTextColor } from "types/atomTypes";
import { useTheme } from "theme/ThemeContext";


interface TextProps {
    size?: TAtomSize,
    color?: TAtomTextColor,
    children: React.ReactNode
}

export const Text: React.FC<TextProps> = ({ 
    size,
    color,
    children
 }) => {

    const theme = useTheme();

    return (
        <label 
            className={classes[size ?? "medium"]}
            style={{color: GetAtomColor(theme.theme.themeName, color ?? "primary")}}
        >
            { children }
        </label>
    );
}
