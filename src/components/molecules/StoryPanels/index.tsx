import React, { useEffect, useState } from "react";
import classes from "./styles.module.css";
//----- Types -----//
import { TScene } from "types/storyTypes";
//----- Context -----//
//----- Hooks and helpers -----//
//----- Components -----//
import { SceneTranslation } from "components/atoms/SceneTranslation";
import { Scene } from "components/molecules/Scene";
import { ContentWrapper } from "components/atoms/ContentWrapper";
//----- Configuration -----//

interface StoryPanelsProps {
    scene: TScene,
    sceneIndex: number,
    currentSceneIndex: number
}

export const StoryPanels: React.FC<StoryPanelsProps> = ({
    scene,
    sceneIndex,
    currentSceneIndex
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
            <Scene image={scene.storyboard} />
        </div>
    );
}