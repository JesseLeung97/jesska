import React, { useEffect, useState } from "react";
import classes from "./styles.module.css";
import { TScene, TStory } from "types/storyTypes"
import { StoryPanels } from "components/molecules/StoryPanels";
import { StoryPanelNavigation } from "components/organisms/StoryPanelNavigation";
import { TFirestoreStory, TStoryReference } from "types/databaseTypes";
import { ContentWrapper } from "components/atoms/ContentWrapper";
import { createStory } from "database/api";

interface StoryProps {
    firestoreStory: TFirestoreStory
}

export const Story: React.FC<StoryProps> = ({
    firestoreStory
}) => {
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [story, setStory] = useState<TStory>({
        storyNameEnglish: "",
        storyNameJapanese: "",
        scenes: []
    });

    useEffect(() => {
        const initializeStory = async () => {
            await createStory(firestoreStory).then(storyResponse => {
                setStory(storyResponse);
            });
        }
        initializeStory();
    }, []);

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