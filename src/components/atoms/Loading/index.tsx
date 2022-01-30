import React from "react";
import classes from "./style.module.css";
//----- Types -----//
//----- Context -----//
//----- Hooks and helpers -----//
//----- Components -----//
//----- Configuration -----//
import danceExtra from "assets/bumbumdance.png";

export const Loading: React.FC = () => {
    return (
        <div className={classes.overlay_container}>
            <div className={classes.animation_container}>
                <img className={classes.image_container} src={danceExtra}></img>
            </div>
        </div>
    );
}