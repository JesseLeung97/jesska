import React from "react";
import classes from "components/organisms/Header/styles.module.css";
//----- Types -----//
import { TThemeName } from "types/themeTypes";
//----- Context -----//
import { useTheme } from "theme/ThemeContext";
import { useLanguage } from "localization/LocalizationContext";
//----- Hooks and helpers -----//
//----- Components -----//
import { Link } from "react-router-dom";
import { ToggleButton } from "components/molecules/ToggleButton";
//----- Configuration -----//
import logoPurple from "assets/logos/logoPurple.png";
import logoYellow from "assets/logos/logoYellow.png";
import sunIcon from "assets/buttonIcons/sunIcon.svg";
import moonIcon from "assets/buttonIcons/moonIcon.svg";
import usFlag from "assets/buttonIcons/usFlag.svg";
import jpFlag from "assets/buttonIcons/jpFlag.svg";
import { Image } from "components/atoms/Image";

const getLogoColor = (themeName: TThemeName): string => {
    if(themeName === "dark") {
        return logoYellow;
    } else {
        return logoPurple;
    }
}

export const Header: React.FC = () => {

    const { toggleTheme } = useTheme();
    const { toggleLanguage } = useLanguage();
    const { theme } = useTheme();

    return (
        <nav className={classes.header_container} style={{background: theme.colors.headerBackground}}>
            <div className={classes.header_inner_container}>
                <div className={classes.toggle_buttons_container}>
                    <div className={classes.logo_container}>
                        <Link to={"/stories/jessesjapanese"}>
                            <Image 
                                image={getLogoColor(theme.themeName)}
                                useParentSizing={true}/>
                        </Link>
                    </div>
                    <div className={classes.toggle_container}>
                        <ToggleButton toggleName={"themeToggle"} inputState={theme.themeName === "dark" ? "icon_1" : "icon_2"} iconToggle_1={sunIcon} iconToggle_2={moonIcon} toggleFunction={toggleTheme} />
                        <ToggleButton toggleName={"languageToggle"} iconToggle_1={usFlag} iconToggle_2={jpFlag} toggleFunction={toggleLanguage} />
                    </div>
                </div>
            </div>
        </nav>
    );
}