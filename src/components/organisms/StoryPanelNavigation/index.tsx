import React, { useState } from "react";
import classes from "components/organisms/StoryPanelNavigation/styles.module.css";

import { StoryNavigationButton } from "components/atoms/StoryNavigationButton";
import { TStory } from "types/storyTypes";
import { useTheme } from "theme/ThemeContext";
import { Text } from "components/atoms/Text";

interface StoryPanelNavigationProps {
    story: TStory,
    navigationButtonClick: (input: any) => any,
    currentPage: number,
    setCurrentPage: (input: any) => any
    
}

export const StoryPanelNavigation: React.FC<StoryPanelNavigationProps> = ({
    story,
    navigationButtonClick,
    currentPage,
    setCurrentPage
}) => {
    const theme = useTheme();

    const storyLength = story.scenes.length;

    const propagateClickUpwards = (buttonNumber: number): any => {
        navigationButtonClick(buttonNumber);
        setCurrentPage(buttonNumber);
    }

    const createNavigationDots = (storyLength: number): React.ReactNode => {
        const navigationDots: Array<React.ReactNode> = [];
        let iterator = 0;
        while(iterator < storyLength) {
            let buttonValue = iterator;
            navigationDots.push(
                <StoryNavigationButton
                    key={iterator}
                    buttonValue={buttonValue}
                    buttonOnClick={propagateClickUpwards}
                >
                </StoryNavigationButton>
            );
            iterator++;
        }
        return navigationDots;
    }

    return (
        <div className={classes.story_navigation_container}>
            <Text
                color="primary"
            >
                {currentPage}
            </Text>
            <div className={classes.button_container}>
                <div className={classes.left_button}>

                </div>
                { createNavigationDots(storyLength) }
                <div className={classes.right_button}>

                </div>
            </div>
        </div>
       
    )
}