import React from "react";
import classes from "components/atoms/RouteButton/styles.module.css";
//----- Context -----//
import { useTheme } from "theme/ThemeContext";
//----- Components -----//
import { Link } from "react-router-dom";
import { Text } from "components/atoms/Text";

interface RouteButtonProps {
    className?: string,
    routeName: string,
    urlExtension: string,
    children?: React.ReactNode
}

export const RouteButton: React.FC<RouteButtonProps> = ({
    className,
    routeName,
    urlExtension,
    children
}) => {

    const { theme } = useTheme();

    return (
        <Link 
            to={urlExtension}
            className={className}
            style={{color: theme.colors.primaryTextColor}}>
            <Text>
                {routeName}
            </Text>
        </Link>
    );
}