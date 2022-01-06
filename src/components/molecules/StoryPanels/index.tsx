import React, { useEffect, useState } from "react";
import classes from "./styles.module.css";
import { Scene } from "components/atoms/Scene";
import { SceneTranslation } from "components/atoms/SceneTranslation";
import { TScene } from "types/storyTypes";
import { ContentWrapper } from "components/atoms/ContentWrapper";

interface StoryPanelsProps {
    scene: TScene,
    sceneIndex: number,
    currentSceneIndex: number,
    onStoryLoad?: () => void
}

export const StoryPanels: React.FC<StoryPanelsProps> = ({
    scene,
    sceneIndex,
    currentSceneIndex,
    onStoryLoad
}) => {
    const [isHiddenClass, setIsHiddenClass] = useState<string>(classes.is_hidden);

    useEffect(() => {
        setIsHiddenClass(currentSceneIndex === sceneIndex ? "" : classes.is_hidden);
    },[currentSceneIndex]);

    return (
        <div className={`${classes.story_content} ${isHiddenClass}`}>
            <SceneTranslation
                englishTranslation={scene.englishTranslation}
                japaneseTranslation={scene.japaneseTranslation}>
            </SceneTranslation>
            <Scene 
                image={scene.storyboard}
                onSceneLoad={onStoryLoad}>
            </Scene>
        </div>
    );
}