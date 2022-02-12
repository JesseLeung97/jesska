import React, { useEffect, useState } from "react";
import classes from "components/molecules/ToggleButton/styles.module.css";
//----- Types -----//
//----- Context -----//
import { useTheme } from "theme/ThemeContext";
//----- Hooks and helpers -----//
//----- Components -----//
//----- Configuration -----//

type TToggleState = "icon_1" | "icon_2";
type THoverState = "hoverStart" | "hoverEnd";

interface ToggleButtonProps {
    className?: string,
    inputState?: TToggleState,
    toggleName: string,
    iconToggle_1: string,
    iconToggle_2?: string,
    toggleColor_1?: string,
    toggleColor_2?: string
    toggleFunction: () => any
}

export const ToggleButton: React.FC<ToggleButtonProps> = ({
    className,
    inputState,
    toggleName,
    iconToggle_1,
    iconToggle_2,
    toggleColor_1,
    toggleColor_2,
    toggleFunction
}) => {

    const { theme } = useTheme();
    const [currentToggle, setCurrentToggle] = useState<TToggleState>(inputState ?? "icon_1");
    const [hoverState, setHoverState] = useState<THoverState>("hoverEnd");
   
    useEffect(() => {
        const firstState = inputState ?? "icon_1";
        setCurrentToggle(firstState);
    },[inputState]);

    const flipState = () => {
        document.getElementById(`${toggleName}_icon_1`)?.animate([
            { transform: "translateY(0px)", opacity: 1, easing: "ease-out"},
            { transform: `translateY(${currentToggle === "icon_1" ? "20px" : "-20px"})`, opacity: 0, easing: "ease-out" },
            { transform: `translateY(${currentToggle === "icon_1" ? "-20px" : "20px"})`, opacity: 0, easing: "ease-out"},
            { transform: "translateY(0px)", opacity: 1, easing: "ease-out"},
        ], {duration: 350});
        toggleFunction();
        setTimeout(() => {
            setCurrentToggle(currentToggle === "icon_1" ? "icon_2": "icon_1");
        }, 175);
        
    }

    return (
        <>
            <div 
                id={`${toggleName}_icon_1`}
                className={`${className} ${classes.toggle_button_container}`}
                style={{background: hoverState === "hoverEnd" ? (toggleColor_1 ?? theme.colors.toggleTheme) : theme.colors.toggleThemeHover}}>
                <button 
                    className={classes.toggle_button} 
                    onClick={flipState}
                    onMouseOver={() => setHoverState("hoverStart")}
                    onMouseOut={() => setHoverState("hoverEnd")}>
                    <img className={classes.icon} src={currentToggle === "icon_1" ? iconToggle_1 : iconToggle_2} />
                </button>
            </div>
        </>
    );
}