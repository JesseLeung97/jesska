import React from "react";
import classes from "components/organisms/ScrollHandler/styles.module.css";
//----- Types -----//
import { TFirestoreStory } from "types/databaseTypes";
//----- Context -----//
import { useStoryList } from "globalState/StoryListContext";
import { useNavigation } from "globalState/NavigationContext";
//----- Hooks and helpers -----//
import { useLocation } from "react-router-dom";
import { useReferredState, useInitialize } from "hooks/hooks";
import { useEffect, useState } from "react";
//----- Components -----//
//----- Configuration -----//

export const ScrollHandler: React.FC = ({ children })  => {

    const { pathname } = useLocation();
    const { storyList } = useStoryList();
    const { setCurrentPage } = useNavigation();
    const [isFirstLoadComplete, setIsFirstLoadComplete] = useState(false);
    const [isFirstScrollComplete, setIsFirstScrollComplete] = useReferredState<boolean>(false);
    const [currentPageLocal, setCurrentPageLocal] = useReferredState<number>(0);
    const [storyListRef, setStoryListRef] = useReferredState<TFirestoreStory[]>([]);

    useInitialize(() => {
        const storyListContainer = document.getElementById("story_list_container");
        if(storyListContainer !== null && storyListContainer !== undefined) {
            storyListContainer.removeEventListener("scroll", updateHistoryThrottle);
            storyListContainer.addEventListener("scroll", updateHistoryThrottle, { passive: true });
            return () => window.removeEventListener("scroll", updateHistoryThrottle);
        }
    });

    useEffect(() => {
        if(!isFirstLoadComplete) {
            if(storyList.length > 0) {
                setStoryListRef(storyList);
                setIsFirstLoadComplete(true);
                scrollToStory(true);
            }
        } else {
            scrollToStory();
        }
    },[pathname, storyList]);

    const scrollToStory = (isFirstScroll = false) => {
        const storyContainer = document.getElementById("story_list_container");
        if(storyContainer == null || storyContainer == undefined) {
            return;
        }
        const windowHeight = document.documentElement.clientHeight;
        if(storyList.length === 0) {
            return;
        }
        if(pathname === "/about" && isFirstScroll) {
            setCurrentPage(0);
            setCurrentPageLocal(0);
            setIsFirstScrollComplete(true);
            return;
        }
        const storyIndex = 1 + storyList.findIndex((story) => (pathname === `/stories${story.storyUrlExtension}`));
        if(storyIndex > -1) {
            if(isFirstScroll) {
                setCurrentPage(storyIndex);
                setCurrentPageLocal(storyIndex);
            }
            const scrollToYPosition = storyIndex * windowHeight;
            storyContainer.scrollTo({top: scrollToYPosition, left: 0, behavior: isFirstScroll ? "auto" : "smooth"});
        }
    }

    const throttleDelay = 200;
    let isThrottled = false;
    const updateHistoryThrottle = () => {
        if(!isThrottled) {
            isThrottled = true;
            updateHistory();
            setTimeout(() => {
                isThrottled = false;
            }, throttleDelay);
        }
    }

    const updateHistory = () => {
        const storyListContainer = document.getElementById("story_list_container");
        if(storyListContainer === null || storyListContainer === undefined) {
            return;
        }
        const windowHeight = storyListContainer.clientHeight;
        const scrollTop = storyListContainer.scrollTop;
        
        const isPageChangeUp = scrollTop > currentPageLocal.current * windowHeight  + (0.5 * windowHeight);
        const isPageChangeDown = scrollTop < currentPageLocal.current * windowHeight - (0.5 * windowHeight);

        if(isPageChangeUp) {      
            if(!isFirstScrollComplete.current ||  storyListRef.current === undefined || storyListRef.current.length < 1) {
                setIsFirstScrollComplete(true);
                return;
            }
            setCurrentPage(currentPageLocal.current + 1);
            setCurrentPageLocal(currentPageLocal.current + 1);
            const newUrl = `/stories${storyListRef.current[currentPageLocal.current - 1].storyUrlExtension}`;
            window.history.replaceState({currentPage: currentPageLocal.current}, "", newUrl);
        }
        if(isPageChangeDown) {
            if(!isFirstScrollComplete.current || storyListRef.current === undefined || storyListRef.current.length < 1) {
                setIsFirstScrollComplete(true);
                return;
            }
            setCurrentPage(currentPageLocal.current - 1);
            setCurrentPageLocal(currentPageLocal.current - 1);
            let newUrl = "";
            if(currentPageLocal.current < 1) {
                newUrl = "/about";
            } else {
                newUrl = `/stories${storyListRef.current[currentPageLocal.current - 1].storyUrlExtension}`;
            }
            window.history.replaceState({currentPage: currentPageLocal.current}, "", newUrl);
        }
    }

    return (
        <div 
            id={"scroll_handler_container"}
            className={`${classes.animation} ${classes.scroll_handler}`}>
            { children }
        </div>
    );
}