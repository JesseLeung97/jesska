import React from "react";
import classes from "./style.module.css";

interface SceneProps {
    image: string
}

export const Scene: React.FC<SceneProps> = ({
    image
}) => {
    return (
        <div className={classes.scene_container}>
            <img
                className={classes.image_inner} 
                src={image}>
            </img>
        </div>
    );
}