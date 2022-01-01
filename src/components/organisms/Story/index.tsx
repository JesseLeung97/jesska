import React, { useEffect, useState } from "react";
import classes from "./styles.module.css";
import { TScene, TStory } from "types/storyTypes"
import { convertToTStory } from "database/api";
import { StoryPanels } from "components/molecules/StoryPanels";
import { StoryPanelNavigation } from "components/organisms/StoryPanelNavigation";
import { TStoryReference } from "types/databaseTypes";

interface StoryProps {
    storyReference: TStoryReference
}

export const Story: React.FC<StoryProps> = ({
    storyReference
}) => {
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [story, setStory] = useState<TStory>({
        storyNameEnglish: "",
        storyNameJapanese: "",
        storyLength: 0,
        scenes: []
    });

    useEffect(() => {
        const initializeStory = async () => {
            await convertToTStory(storyReference).then(storyResponse => {
                setStory(storyResponse);
            });
        }
        initializeStory();
    }, []);

    const testOnClick = (iter: number) => {
        console.log("testing scene  ", iter);
    }

    return (
        <> 
            <div className={classes.story_panels_container}>
                {story.scenes.map((scene, index) => 
                    <StoryPanels 
                        key={index} 
                        scene={scene}
                        sceneIndex={index}
                        currentSceneIndex={currentPage}
                    />
                )}
            </div>
            <StoryPanelNavigation
                story={story}
                navigationButtonClick={testOnClick}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
        </>
    );
}