import React from "react";
import classes from "./style.module.css";
import danceExtra from "assets/bumbumdance.png";

interface LoadingProps {

}

export const Loading: React.FC<LoadingProps> = () => {
    return (
        <div className={classes.overlay_container}>
            <div className={classes.animation_container}>
                <img className={classes.image_container} src={danceExtra}></img>
            </div>
        </div>
    );
}