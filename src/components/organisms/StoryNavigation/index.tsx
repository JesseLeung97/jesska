import React from "react";
import classes from "components/organisms/StoryNavigation/styles.module.css";
//----- Types -----//
//----- Context -----//
import { useStoryList } from "globalState/StoryListContext";
import { useTheme } from "theme/ThemeContext";
import { useNavigation } from "globalState/NavigationContext";
import { useLanguage } from "localization/LocalizationContext";
//----- Hooks and helpers -----//
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
//----- Components -----//
import { RouteButton } from "components/atoms/RouteButton";
import { Text } from "components/atoms/Text";
//----- Configuration -----//

const getCurrentSceneClassName = (currentIndex: number, storyIndex: number): string => {
    if(currentIndex === storyIndex) {
        return "active_story";
    }
    return "";
}

const getIsActiveClassName = (numberOfStories: number, currentIndex: number, storyIndex: number): string => {
    if(/*numberOfStories < 8*/ false) {
        return "visible_route_button";
    }

    const halfConcurrentlyVisible = 1;
    const limitIndex = numberOfStories - 1;
    let minimumIndex = currentIndex - halfConcurrentlyVisible;
    let maximumIndex = 0;
    if(minimumIndex < 0) {
        maximumIndex = (Math.abs(minimumIndex));
        minimumIndex = 0;
    }
    maximumIndex = maximumIndex + currentIndex + halfConcurrentlyVisible;
    if(maximumIndex > limitIndex) {
        minimumIndex = minimumIndex - (maximumIndex - limitIndex);
        console.log(minimumIndex);
        maximumIndex = limitIndex;
    }
    
    if(storyIndex >= minimumIndex && storyIndex <= maximumIndex) {
        return "visible_route_button";
    } else {
        return ""
    }
}

interface StoryNavigationProps {

}

export const StoryNavigation: React.FC<StoryNavigationProps> = ({}) => {
    
    const { theme, toggleTheme }  = useTheme();
    const { language, toggleLanguage } = useLanguage();
    const { storyList } = useStoryList();
    const { pathname } = useLocation();
    const { currentPage } = useNavigation();
    const currentStoryName = pathname.substring(8);
    const isError = pathname === "/error";
    const [currentPageLocal, setCurrentPageLocal] = useState<number>();

    useEffect(() => {
        setCurrentPageLocal(currentPage);
    }, [currentPage]);

    return (
        <>
        <div className={`${classes.story_navigation_container} ${isError ? classes.error_hide : ""}`}>
            <div id={"story_navigation_scroll_handler"} className={classes.story_navigation_container_inner}>
                <RouteButton
                    className={`
                        ${classes.navigation_item} 
                        ${classes[getIsActiveClassName(storyList.length + 1, currentPage, 0)]} 
                        ${classes[getCurrentSceneClassName(currentPage, 0)]}`}
                    routeName={"about"}
                    urlExtension={"/about"}>
                </RouteButton>
                <>
                    { Object.values(storyList).map((story, index) => {
                        return (
                            <RouteButton
                                className={`
                                    ${classes.navigation_item} 
                                    ${classes[getCurrentSceneClassName(currentPage, index + 1)]}
                                    ${classes[getIsActiveClassName(storyList.length + 1, currentPage, index + 1)]}`}
                                key={`routeButton_${story.storyID}`}
                                routeName={story.storyNameEnglish}
                                urlExtension={`/stories${story.storyUrlExtension}`}>
                                {story.storyDate}
                            </RouteButton>
                        );
                    })} 
                </>
            </div>
        </div>
        </>
    );
}