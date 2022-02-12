import React from "react";
import classes from "components/atoms/RouteButton/styles.module.css";
//----- Types -----//
//----- Context -----//
import { useTheme } from "theme/ThemeContext";
//----- Hooks and helpers -----//
//----- Components -----//
import { Link } from "react-router-dom";
import { Text } from "components/atoms/Text";
//----- Configuration -----//

interface RouteButtonProps {
    className?: string,
    isActive?: boolean,
    routeName: string,
    urlExtension: string
}

export const RouteButton: React.FC<RouteButtonProps> = ({
    className,
    isActive,
    routeName,
    urlExtension
}) => {

    const { theme } = useTheme();
    const isAfterItemActive = isActive ?? false;
    const activeRouteColor = isAfterItemActive ? theme.colors.activeRoute : theme.colors.sideMenu;

    return (
        <div className={`
            ${className}
            ${classes.route_button_container} `}>
            <Link 
                to={urlExtension}
                className={`
                    ${isAfterItemActive ? classes.active_route_link : ""}
                    ${classes.route_link}`}
                style={{color: theme.colors.sideMenu}}>
                <Text 
                    className={`${classes.route_button_text} ${isAfterItemActive ? classes.active_route_button_text : ""}`}
                    color={isAfterItemActive ? "activeRoute" : "sideMenu"}
                    isAnimated={true}>
                    {routeName}
                </Text>
            </Link>
            <span 
                className={`${classes.after_item} ${isAfterItemActive ? classes.active_route : ""} `} 
                style={{background: activeRouteColor}}/>
        </div>
    );
}