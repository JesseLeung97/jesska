import React from "react";
import classes from "./style.module.css";
import { Image } from "components/atoms/Image";

interface SceneProps {
    image: string,
    onSceneLoad?: () => void
}

export const Scene: React.FC<SceneProps> = ({
    image,
    onSceneLoad
}) => {
    return (
        <div className={classes.scene_container}>
            <Image 
                useParentSizing={true} 
                className={classes.scene_image}
                image={image} 
                size={"large"}
                onLoad={onSceneLoad} />
        </div>
    );
}