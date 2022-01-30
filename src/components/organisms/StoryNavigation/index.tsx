import React, { useEffect, useState } from "react";
import classes from "components/organisms/StoryNavigation/styles.module.css";
//----- Types -----//
//----- Context -----//
import { useStoryList } from "globalState/StoryListContext";
import { useTheme } from "theme/ThemeContext";
import { useNavigation } from "globalState/NavigationContext";
import { useLanguage } from "localization/LocalizationContext";
//----- Hooks and helpers -----//
import { useLocation } from "react-router-dom";
//----- Components -----//
import { RouteButton } from "components/atoms/RouteButton";
import { Text } from "components/atoms/Text";
//----- Configuration -----//

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
    const [stateRouteItems, setRouteItems] = useState<React.ReactNode>(<></>);

    useEffect(() => {
        setRouteItems(routeItems);
    }, [storyList]);

    useEffect(() => {
        setCurrentPageLocal(currentPage);
    }, [currentPage])

    const checkIsCurrentScene = (storyName: string): boolean => {
        return currentStoryName === storyName;
    }

    const createNavigationItems = (): React.ReactNode => {
        return (
            <>
                { Object.values(storyList).map((story, index) => {
                    return (
                        <RouteButton
                            className={`${classes.navigation_item} ${checkIsCurrentScene(story.storyUrlExtension) ? classes.active_button : ""}`}
                            key={`routeButton_${story.storyID}`}
                            routeName={story.storyNameEnglish}
                            urlExtension={`/stories${story.storyUrlExtension}`}>
                            {story.storyDate}
                        </RouteButton>
                    );
                })} 
            </>
        );
    }

    let routeItems = (
        <>
            <RouteButton
                className={classes.navigation_item}
                routeName={"about"}
                urlExtension={"/about"}>
            </RouteButton>
            { createNavigationItems() }
        </>
    );

    return (
        <>
        <div className={`${classes.story_navigation_container} ${isError ? classes.error_hide : ""}`}>
            <div id={"story_navigation_scroll_handler"} className={classes.story_navigation_container_inner}>
                { stateRouteItems }
            </div>
        </div>
        </>
    );
}