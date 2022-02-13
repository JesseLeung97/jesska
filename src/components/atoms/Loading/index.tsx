import React from "react";
import classes from "./style.module.css";
//----- Types -----//
//----- Context -----//
import { useTheme } from "theme/ThemeContext";
//----- Hooks and helpers -----//
//----- Components -----//
//----- Configuration -----//
import danceBlack from "assets/bumbumdanceBlack.png";
import danceWhite from "assets/bumbumdanceWhite.png";

export const Loading: React.FC = () => {

    const { theme } = useTheme();

    return (
        <div className={classes.overlay_container}>
            <div className={classes.animation_container}>
                <img className={classes.image_container} src={theme.themeName === "dark" ? danceWhite : danceBlack}></img>
            </div>
        </div>
    );
}