import React from "react";
import classes from "./style.module.css";
//----- Types -----//
//----- Context -----//
import { useStoryLoading } from "globalState/StoryLoadingContext";
//----- Hooks and helpers -----//
//----- Components -----//
import { Image } from "components/atoms/Image";
//----- Configuration -----//

interface SceneProps {
    image: string
}

export const Scene: React.FC<SceneProps> = ({
    image
}) => {

    const { onLoadingComplete } = useStoryLoading();

    return (
        <div className={classes.scene_container}>
            <Image 
                useParentSizing={true} 
                className={classes.scene_image}
                image={image} 
                size={"large"}
                onLoad={onLoadingComplete} />
        </div>
    );
}