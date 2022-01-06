import React, { useState } from "react";
import classes from "components/organisms/StoryNavigation/styles.module.css";
import { RouteButton } from "components/atoms/RouteButton";
import { useLanguage } from "localization/LocalizationContext";
import { useStoryList } from "globalState/StoryListContext";
import { useTheme } from "theme/ThemeContext";
import { useLocation } from "react-router-dom";
import { Text } from "components/atoms/Text";

interface StoryNavigationProps {

}

export const StoryNavigation: React.FC<StoryNavigationProps> = ({}) => {
    const toggleTheme = useTheme().toggleTheme;
    const toggleLanguage = useLanguage().toggleLanguage;
    const language = useLanguage().language;
    const theme = useTheme().theme;
    const storyList = useStoryList().storyList;
    const currentStoryName = useLocation().pathname.substring(8);

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
                            key={index}
                            urlExtension={`/stories${story.storyUrlExtension}`}
                        >
                            <Text 
                                isAnimated={true}
                            >
                                {story.storyDate}
                            </Text><br />
                            <Text 
                                className={`${checkIsCurrentScene(story.storyUrlExtension) ? "" : classes.inactive_text}`}
                                isAnimated={true}
                            >
                                {language.currentLanguage === "english" ? story.storyNameEnglish : story.storyNameJapanese}
                            </Text>
                        </RouteButton>
                    );
                })}
            </>
        );
    }

    return (
        <div className={classes.story_navigation_container}>
            <div className={classes.story_navigation_container_inner}>
                <RouteButton
                    className={classes.navigation_item}
                    urlExtension={"/about"}
                >
                    <div>
                        <p>{language.aboutPage.navigationButton}</p>
                    </div>
                </RouteButton>
                { createNavigationItems() }
            </div>
            <button onClick={toggleTheme} >Theme</button>
            <button onClick={toggleLanguage} >{language.buttons.toggleLanguage}</button>
        </div>
    );
}