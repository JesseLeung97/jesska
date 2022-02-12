import React, { useEffect, useState } from "react";
import classes from "components/organisms/StoryPanelNavigation/styles.module.css";
//----- Types -----//
import { TStory } from "types/storyTypes";
//----- Context -----//
import { useTheme } from "theme/ThemeContext";
//----- Hooks and helpers -----//
//----- Components -----//
import { StoryNavigationButton } from "components/atoms/StoryNavigationButton";
import { Text } from "components/atoms/Text";
//----- Configuration -----//

interface StoryPanelNavigationProps {
    story: TStory,
    currentPage: number,
    setCurrentPage: (input: any) => any
}

export const StoryPanelNavigation: React.FC<StoryPanelNavigationProps> = ({
    story,
    currentPage,
    setCurrentPage
}) => {

    const theme = useTheme();
    const storyLength = story.scenes.length;
    const [isDecrementActive, setIsDecrementActive] = useState<boolean>(false);
    const [isIncrementActive, setIsIncrementActive] = useState<boolean>(true);

    useEffect(() => {
        const incrementActive = currentPage < storyLength -1;
        const decrementActive = currentPage > 0;
        setIsIncrementActive(incrementActive);
        setIsDecrementActive(decrementActive);
    }, [currentPage, storyLength]);

    const incrementPage = (): void => {
        let updatedPage = currentPage + 1;
        if(updatedPage > storyLength - 1) {
            updatedPage = storyLength - 1;
        }
        setCurrentPage(updatedPage);
    }

    const decrementPage = (): void => {
        let updatedPage = currentPage - 1;
        if(updatedPage < 0) {
            updatedPage = 0;
        }
        setCurrentPage(updatedPage);
    }

    return (
        <div className={classes.story_navigation_container}>
            <div className={classes.inner_container}>
                <StoryNavigationButton 
                    isActive={isDecrementActive}
                    buttonOnClick={decrementPage}
                    buttonLocation={"left"}
                    />
                <div className={classes.current_page_container}>
                    <Text
                        className={classes.page_label}
                        size={"large"}
                        isAnimated={true}
                        color="activeRoute">
                        {currentPage + 1}
                    </Text>
                </div>
                <StoryNavigationButton
                    isActive={isIncrementActive}
                    buttonOnClick={incrementPage}
                    buttonLocation={"right"} />
            </div>
        </div>
    );
}