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
        <div className={`${classes.route_button_container} ${className}`}>
            <Link 
                to={urlExtension}
                style={{color: theme.colors.primaryTextColor}}>
                <Text className={classes.route_button_text}>
                    {routeName}
                </Text>
            </Link>
        </div>
    );
}