import React, { useEffect, useState } from "react";
import classes from "./styles.module.css";
//----- Types -----//
import { TFirestoreStory } from "types/databaseTypes";
import { TStory } from "types/storyTypes"
import { TComponentLoadProcedure, TLoadingLocation } from "types/loadingTypes";
//----- Context -----//
import { StoryLoadingProvider } from "globalState/StoryLoadingContext";
//----- Hooks and helpers -----//
import { useLoading } from "globalState/LoadingContext";
import { useNavigate } from "react-router-dom";
import { createStory } from "database/api";
import { useInitialize, navigateToError } from "hooks/hooks";
//----- Components -----//
import { StoryPanels } from "components/molecules/StoryPanels";
import { StoryPanelNavigation } from "components/organisms/StoryPanelNavigation";
import { ContentWrapper } from "components/atoms/ContentWrapper";

interface StoryProps {
    firestoreStory: TFirestoreStory,
    loadingType: TComponentLoadProcedure,
    relativeLocation: TLoadingLocation
}

export const Story: React.FC<StoryProps> = ({
    firestoreStory,
    loadingType,
    relativeLocation
}) => {
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [loadingClass, setLoadingClass] = useState<string>("");
    const [story, setStory] = useState<TStory>({
        storyNameEnglish: "",
        storyNameJapanese: "",
        scenes: []
    });
    const { subscribeToLoading } = useLoading();
    const navigate = useNavigate();

    useInitialize(() => {
        if(loadingType === "placeholder") {
            return;
        }
        subscribeToLoading(
            "loading",
            firestoreStory.storyUrlExtension,
            relativeLocation,
            (loadingType === "visible"),
        );
        const initializeStory = async () => {
            await createStory(firestoreStory).then(storyResponse => {
                setStory(storyResponse);
            }).catch((error) => {
                navigateToError();
            });
        }
        initializeStory();
        return () => {
            subscribeToLoading(
                "unloaded",
                firestoreStory.storyUrlExtension,
            );
        }
    });

    const onStoryLoadingComplete = () => {
        setLoadingClass(classes.loaded);
        subscribeToLoading(
            "loaded",
            firestoreStory.storyUrlExtension
        );
    }

    const testOnClick = (iter: number) => {
        console.log("testing scene  ", iter);
    }

    return (
        <ContentWrapper>
            <StoryLoadingProvider storyLength={story.scenes.length} onStoryLoad={onStoryLoadingComplete}>
                <div className={`${classes.story_panels_container} ${loadingClass}`}>
                    {story.scenes.map((scene, index) => 
                        <StoryPanels 
                            key={`sceneIndex_${story.scenes.indexOf(scene)}`} 
                            scene={scene}
                            sceneIndex={index}
                            currentSceneIndex={currentPage}/>
                    )}
                    <StoryPanelNavigation
                        story={story}
                        navigationButtonClick={testOnClick}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}/>
                </div>
            </StoryLoadingProvider>
        </ContentWrapper>
    );
}