import React from "react";
import classes from "components/atoms/RouteButton/styles.module.css";

import { Link } from "react-router-dom";
import { useTheme } from "theme/ThemeContext";

interface RouteButtonProps {
    className?: string,
    urlExtension: string,
    children: React.ReactNode
}

export const RouteButton: React.FC<RouteButtonProps> = ({
    className,
    urlExtension,
    children
}) => {

    const theme = useTheme().theme;

    return (
        <Link 
            to={urlExtension}
            className={className}
            style={{color: theme.colors.primaryTextColor}}
        >
            { children }
        </Link>
    );
}