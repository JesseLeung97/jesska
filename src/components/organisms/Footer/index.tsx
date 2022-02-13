import React from "react";
import classes from "components/organisms/Footer/styles.module.css";
//----- Types -----//
//----- Context -----//
import { useTheme } from "theme/ThemeContext";
//----- Hooks and helpers -----//
//----- Components -----//
import { Image } from "components/atoms/Image";
import { Text } from "components/atoms/Text";
//----- Configuration -----//
import logoFooter from "assets/logos/logoFooter.png";

export const Footer: React.FC = ({}) => {

    const { theme } = useTheme();

    return (
        <div 
            className={classes.footer_container}
            style={{background: theme.colors.footerBackground}}>
            <div className={classes.footer_inner_container}>
                <div className={classes.logo_container}>
                    <Image 
                        image={logoFooter}
                        size={"small"}/>
                    <Text
                        color={"sideMenu"}
                        size={"small"}
                        >
                        &copy; Jesska 2022</Text>
                </div>
                <div className={classes.link_container}>
                    <a 
                        href="https://www.instagram.com/jesska.io/"
                        style={{textDecoration: `underline 1px solid ${theme.colors.sideMenu}`}}
                        className={classes.footer_link}>
                        <Text
                            color={"sideMenu"}
                            size={"small"}>
                            {"Instagram"}
                        </Text>
                    </a>
                    <a 
                        href="https://www.github.com/JesseLeung97/jesska"
                        style={{textDecoration: `underline 1px solid ${theme.colors.sideMenu}`}}
                        className={classes.footer_link}>
                        <Text
                            color={"sideMenu"}
                            size={"small"}>
                            {"Github"}
                        </Text>
                    </a>
                </div>
            </div>
        </div>
    );
}