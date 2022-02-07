import React, { useEffect, useState } from "react";
import classes from "./styles.module.css";
//----- Types -----//
import { TFirestoreStory } from "types/databaseTypes";
import { TStory } from "types/storyTypes"
import { TComponentLoadProcedure, TLoadingLocation } from "types/loadingTypes";
//----- Context -----//
import { StoryLoadingProvider } from "globalState/StoryLoadingContext";
import { useNavigation } from "globalState/NavigationContext";
import { useStoryList } from "globalState/StoryListContext";
//----- Hooks and helpers -----//
import { useLoading } from "globalState/LoadingContext";
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
    const [currentPageLocal, setCurrentPageLocal] = useState<number>(0);
    const [loadingClass, setLoadingClass] = useState<string>("");
    const [story, setStory] = useState<TStory>({
        storyNameEnglish: "",
        storyNameJapanese: "",
        scenes: []
    });
    const { subscribeToLoading } = useLoading();
    const { currentPage } = useNavigation();
    const { storyList } = useStoryList();

    useInitialize(() => {
        if(loadingType === "placeholder") {
            return;
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

    const initializeStory = () => {
        subscribeToLoading(
            "loading",
            firestoreStory.storyUrlExtension,
            relativeLocation,
            (loadingType === "visible"),
        );
        const fetchStory = async () => {
            await createStory(firestoreStory).then(storyResponse => {
                setStory(storyResponse);
            }).catch((error) => {
                navigateToError("maintenance");
            });
        }
        fetchStory();
        
    }

    useEffect(() => {
        console.log(currentPage, "current page");
        const currentPageIndex = storyList.findIndex((story) => (firestoreStory.storyUrlExtension === story.storyUrlExtension));
        if(currentPageIndex > -1) {
            if(Math.abs(currentPageIndex - currentPageIndex) < 2) {
                console.log("preparing to load", firestoreStory.storyUrlExtension);
                initializeStory();
            }
        }
    }, [currentPage])

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
                            currentSceneIndex={currentPageLocal}/>
                    )}
                    <StoryPanelNavigation
                        story={story}
                        navigationButtonClick={testOnClick}
                        currentPage={currentPageLocal}
                        setCurrentPage={setCurrentPageLocal}/>
                </div>
            </StoryLoadingProvider>
        </ContentWrapper>
    );
}