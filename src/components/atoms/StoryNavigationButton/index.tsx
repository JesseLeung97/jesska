import React from "react";
import classes from "./styles.module.css";
import navigationButtonIcon from "assets/navigationCircle.svg";

interface StoryNavigationButtonProps {
    buttonValue: number,
    buttonOnClick: (buttonValue: number) => any
}

export const StoryNavigationButton: React.FC<StoryNavigationButtonProps> = ({
    buttonValue,
    buttonOnClick
}) => {
    return (
        <button
            className={classes.button_no_styles}
            value={buttonValue}
            onClick={() => buttonOnClick(buttonValue)}
        >
            <img src={navigationButtonIcon}></img>
        </button>
    );
}