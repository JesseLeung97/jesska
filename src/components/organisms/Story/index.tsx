import React, { useEffect, useState } from "react";
import classes from "./styles.module.css";
import { TScene, TStory } from "types/storyTypes"
import { StoryPanels } from "components/molecules/StoryPanels";
import { StoryPanelNavigation } from "components/organisms/StoryPanelNavigation";
import { TFirestoreStory, TStoryReference } from "types/databaseTypes";
import { ContentWrapper } from "components/atoms/ContentWrapper";
import { createStory } from "database/api";
import { useLoading } from "globalState/LoadingContext";

interface StoryProps {
    firestoreStory: TFirestoreStory,
    isBecomingVisibleComponent?: boolean
}

export const Story: React.FC<StoryProps> = ({
    firestoreStory,
    isBecomingVisibleComponent
}) => {
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [story, setStory] = useState<TStory>({
        storyNameEnglish: "",
        storyNameJapanese: "",
        scenes: []
    });
    const subscribeToLoading = useLoading().subscribeToLoading;

    useEffect(() => {
        subscribeToLoading(
            "loading",
            firestoreStory.storyID,
            isBecomingVisibleComponent
        );
        const initializeStory = async () => {
            await createStory(firestoreStory).then(storyResponse => {
                setStory(storyResponse);
            });
        }
        initializeStory();
    }, []);

    let intScenesLoaded = 0;
    const onStoryLoad = () => {
        if(intScenesLoaded < story.scenes.length - 1) {
            intScenesLoaded++;
            return;
        }
        subscribeToLoading(
            "loaded",
            firestoreStory.storyID
        );
    }
    

    const testOnClick = (iter: number) => {
        console.log("testing scene  ", iter);
    }

    return (
            <div className={classes.story_panels_container}>
                {story.scenes.map((scene, index) => 
                    <StoryPanels 
                        key={index} 
                        scene={scene}
                        sceneIndex={index}
                        currentSceneIndex={currentPage}
                        onStoryLoad={onStoryLoad}
                    />
                )}
                <StoryPanelNavigation
                    story={story}
                    navigationButtonClick={testOnClick}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            </div>
    );
}