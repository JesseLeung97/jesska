import React from "react";
import classes from "components/atoms/StoryNavigationButton/styles.module.css";
//----- Types -----//
import { TAtomButtonPlacement } from "types/atomTypes";
//----- Context -----//
import { useTheme } from "theme/ThemeContext";
//----- Hooks and helpers -----//
import { useState } from "react";
//----- Components -----//
//----- Configuration -----//
import { ReactComponent as LeftArrow } from "assets/buttonIcons/leftArrow.svg";
import { ReactComponent as RightArrow } from "assets/buttonIcons/rightArrow.svg";

type THoverState = "hoverStart" | "hoverEnd";

interface StoryNavigationButtonProps {
    isActive: boolean,
    buttonOnClick: () => void,
    buttonLocation: TAtomButtonPlacement
}

export const StoryNavigationButton: React.FC<StoryNavigationButtonProps> = ({
    isActive,
    buttonOnClick,
    buttonLocation
}) => {

    const { theme } = useTheme();
    const [hoverState, setHoverState] = useState<THoverState>("hoverEnd");

    return (
        <button
            className={`
                ${classes.button_no_styles} 
                ${classes.button_styles}
                ${classes[buttonLocation]}
                ${!isActive ? classes.disabled : ""}`}
            onMouseOver={() => setHoverState("hoverStart")}
            onMouseOut={() => setHoverState("hoverEnd")}
            onClick={buttonOnClick}>
                { buttonLocation === "left" && <LeftArrow fill={hoverState === "hoverEnd" || !isActive ? theme.colors.sideMenu : theme.colors.toggleThemeHover}/> }
                { buttonLocation === "right" && <RightArrow fill={hoverState === "hoverEnd" || !isActive ? theme.colors.sideMenu : theme.colors.toggleThemeHover}/> }
        </button>
    );
}