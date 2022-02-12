import React, { useEffect, useState } from "react";
import classes from "./styles.module.css";
//----- Types -----//
import { TFirestoreStory } from "types/databaseTypes";
import { TStory } from "types/storyTypes"
import { TComponentLoadProcedure, TLoadingLocation, TLoading, TComponentLoading } from "types/loadingTypes";
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
    relativeLocation: TLoadingLocation,
    selfIndex: number
}

export const Story: React.FC<StoryProps> = ({
    firestoreStory,
    loadingType,
    relativeLocation,
    selfIndex 
}) => {

    const [touchStart, setTouchStart] = React.useState<number>(0);
    const [touchEnd, setTouchEnd] = React.useState<number>(0);
    const [loadingState, setLoadingState] = useState<TComponentLoading>("unloaded");
    const [currentPageLocal, setCurrentPageLocal] = useState<number>(0);
    const [storyListIndex, setStoryListIndex] = useState<number>(-1);
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
        setStoryListIndex(selfIndex);
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
        setLoadingState("loaded");
        subscribeToLoading(
            "loaded",
            firestoreStory.storyUrlExtension
        );
    }

    const initializeStory = () => {
        setLoadingState("loading");
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
        if(storyListIndex === currentPage) {
            if(loadingState === "unloaded") {
                loadingType = "visible";
                initializeStory();
            } else {
                setLoadingState("loaded");
                subscribeToLoading(
                    "loaded",
                    firestoreStory.storyUrlExtension,
                    undefined,
                    true
                );
            }
        } else if(Math.abs(storyListIndex - currentPage) < 5) {
            if(loadingState === "unloaded") {
                loadingType = "background";
                initializeStory();
            } else {
                setLoadingState("loaded");
                subscribeToLoading(
                    "loaded",
                    firestoreStory.storyUrlExtension,
                    undefined,
                    false
                );
            }
        } else {
            setLoadingState("unloaded");
            subscribeToLoading(
                "unloaded",
                firestoreStory.storyUrlExtension
            );
            setStory({
                storyNameEnglish: "",
                storyNameJapanese: "",
                scenes: []
            });
        }
    }, [currentPage]);

    const handleTouchStart = (e: React.TouchEvent<HTMLSpanElement>) => {
        setTouchStart(e.targetTouches[0].clientX);
    }
    
    const handleTouchMove = (e: React.TouchEvent<HTMLSpanElement>) => {
        setTouchEnd(e.targetTouches[0].clientX);
    }

    const handleTouchEnd = (e: React.TouchEvent<HTMLSpanElement>) => {
        if (touchStart - touchEnd > 5) {
            const newPageIndex = Math.min(storyList.length, currentPageLocal + 1);
            if(currentPageLocal !== newPageIndex) {
                setCurrentPageLocal(newPageIndex);
            }
        }
    
        if (touchStart - touchEnd < -5) {
            const newPageIndex = Math.max(0, currentPageLocal - 1);
            if(currentPageLocal !== newPageIndex) {
                setCurrentPageLocal(newPageIndex);
            }
        }
    }

    return (
        <ContentWrapper>
            <StoryLoadingProvider storyLength={story.scenes.length} onStoryLoad={onStoryLoadingComplete}>
                <div className={`${classes.story_panels_container} ${loadingClass}`}>
                    <span
                        className={classes.swipe_container}
                        onTouchStart={(event) => handleTouchStart(event)}
                        onTouchMove={(event) => handleTouchMove(event)}
                        onTouchEnd={(event) => handleTouchEnd(event)}>
                        {story.scenes.map((scene, index) => 
                            <StoryPanels 
                                key={`sceneIndex_${story.scenes.indexOf(scene)}`} 
                                scene={scene}
                                sceneIndex={index}
                                currentSceneIndex={currentPageLocal}/>
                        )}
                    </span>
                    
                    <StoryPanelNavigation
                        story={story}
                        currentPage={currentPageLocal}
                        setCurrentPage={setCurrentPageLocal}/>
                </div>
            </StoryLoadingProvider>
        </ContentWrapper>
    );
}