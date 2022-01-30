import React from "react";
import classes from "components/organisms/Header/styles.module.css";
//----- Types -----//
//----- Context -----//
import { useTheme } from "theme/ThemeContext";
import { useLanguage } from "localization/LocalizationContext";
//----- Hooks and helpers -----//
//----- Components -----//
import { ToggleButton } from "components/molecules/ToggleButton";
//----- Configuration -----//
import sunIcon from "assets/buttonIcons/sunIcon.svg";
import moonIcon from "assets/buttonIcons/moonIcon.svg";
import usFlag from "assets/buttonIcons/usFlag.svg";
import jpFlag from "assets/buttonIcons/jpFlag.svg";

export const Header: React.FC = () => {

    const { toggleTheme } = useTheme();
    const { toggleLanguage } = useLanguage();
    const { theme } = useTheme();

    return (
        <nav className={classes.header_container} style={{background: theme.colors.headerBackground}}>
            <div className={classes.header_inner_container}>
                <div className={classes.toggle_buttons_container}>
                    <ToggleButton toggleName={"themeToggle"} iconToggle_1={sunIcon} iconToggle_2={moonIcon} toggleFunction={toggleTheme} />
                    <ToggleButton toggleName={"languageToggle"} iconToggle_1={usFlag} iconToggle_2={jpFlag} toggleFunction={toggleLanguage} />
                </div>
            </div>
        </nav>
    );
}