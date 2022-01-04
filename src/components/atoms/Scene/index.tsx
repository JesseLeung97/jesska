import React from "react";
import classes from "./style.module.css";
import { Image } from "components/atoms/Image";

interface SceneProps {
    image: string
}

export const Scene: React.FC<SceneProps> = ({
    image
}) => {
    return (
        <div className={classes.scene_container}>
            <Image useParentSizing={true} className={classes.scene_image} image={image} size={"large"} />
        </div>
    );
}