import React from "react";
import classes from "components/atoms/RouteButton/styles.module.css";
//----- Types -----//
//----- Context -----//
import { useTheme } from "theme/ThemeContext";
//----- Hooks and helpers -----//
import { useState } from "react";
//----- Components -----//
import { Link } from "react-router-dom";
import { Text } from "components/atoms/Text";
//----- Configuration -----//

type THoverState = "hoverStart" | "hoverEnd";

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
    const [hoverState, setHoverState] = useState<THoverState>("hoverEnd");

    return (
        <div className={`
            ${className}
            ${classes.route_button_container} `}>
            <Link 
                to={urlExtension}
                onMouseOver={() => setHoverState("hoverStart")}
                onMouseOut={() => setHoverState("hoverEnd")}
                className={`
                    ${isAfterItemActive ? classes.active_route_link : ""}
                    ${classes.route_link}`}
                style={{color: !isAfterItemActive && hoverState === "hoverEnd" ? theme.colors.sideMenu : theme.colors.toggleThemeHover}}>
                <Text 
                    className={`${classes.route_button_text} ${isAfterItemActive ? classes.active_route_button_text : ""}`}
                    color={isAfterItemActive ? "activeRoute" : hoverState === "hoverEnd" ? "sideMenu" : "toggleHover"}
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