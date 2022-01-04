import React, { useState } from "react";
import classes from "components/organisms/StoryNavigation/styles.module.css";
import { RouteButton } from "components/atoms/RouteButton";
import { useLanguage } from "localization/LocalizationContext";
import { useStoryList } from "globalState/StoryListContext";
import { useTheme } from "theme/ThemeContext";

interface StoryNavigationProps {

}

export const StoryNavigation: React.FC<StoryNavigationProps> = ({}) => {
    const toggleTheme = useTheme().toggleTheme;
    const language = useLanguage().language;
    const theme = useTheme().theme;
    const storyList = useStoryList().storyList;

    const createNavigationItems = (): React.ReactNode => {
        return (
            <>
                { Object.values(storyList).map((story, index) => {
                    return (
                        <RouteButton
                            className={`${classes.navigation_item} ${classes.active}`}
                            key={index}
                            urlExtension={story.storyUrlExtension}
                        >
                            <div>
                                <p>{story.storyDate}</p>
                                <p>{language.currentLanguage === "english" ? story.storyNameEnglish : story.storyNameJapanese}</p>
                            </div>
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
        </div>
    );
}