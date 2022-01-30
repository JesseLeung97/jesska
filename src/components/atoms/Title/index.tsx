import React from "react";
import classes from "components/atoms/Title/styles.module.css";
//----- Types -----//
import { TAtomSize, TAtomTextColor } from "types/atomTypes";
//----- Context -----//
import { useTheme } from "theme/ThemeContext";
//----- Hooks and helpers -----//
import { GetAtomColor } from "types/atomTypes";
//----- Components -----//
//----- Configuration -----//

interface TitleProps {
    className?: string,
    size?: TAtomSize,
    color?: TAtomTextColor,
    bold?: boolean,
    isAnimated?: boolean,
    children: React.ReactNode
}

export const Title: React.FC<TitleProps> = ({
    className,
    size,
    color,
    bold,
    isAnimated,
    children
}) => {

    const { theme } = useTheme();

    isAnimated = isAnimated ?? false;
    const isAnimatedClass = isAnimated ? classes.text_animation : "";
    
    bold = bold ?? false;
    const boldClass = bold ? classes.bold : ""

    return ( 
        <label
            className={`${className} ${classes[size ?? "medium"]} ${isAnimatedClass} ${boldClass}`}
            style={{color: GetAtomColor(theme.themeName, color ?? "primary")}}>
            { children }
        </label>
    );
}