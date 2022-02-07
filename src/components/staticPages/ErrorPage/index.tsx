import React from "react";
import classes from "components/staticPages/ErrorPage/styles.module.css";
//----- Types -----//
//----- Context -----//
import { useLoading } from "globalState/LoadingContext";
import { useLocation } from "react-router-dom";
import { useLanguage } from "localization/LocalizationContext";
import { useTheme } from "theme/ThemeContext";
//----- Hooks and helpers -----//
import { useInitialize } from "hooks/hooks";
import { useState } from "react";
//----- Components -----//
import { ContentWrapper } from "components/atoms/ContentWrapper";
import { Text } from "components/atoms/Text";
import { Image } from "components/atoms/Image";
import { Loading } from "components/atoms/Loading";
import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import PageNotFound from "components/molecules/ErrorImages/PageNotFound";
//----- Configuration -----//

const GeneralJesse = lazy(() => import("components/molecules/ErrorImages/GeneralJesse")); 
const GeneralMomo = lazy(() => import("components/molecules/ErrorImages/GeneralMomo"));

export type TErrorType = "pageNotFound" | "maintenance" | "general";

const coinFlip = (): boolean => {
    return Math.floor(Math.random() * 2) == 0;
}

const NotFound: React.FC = () => {

    const { language } = useLanguage();
    const { theme } = useTheme();

    type THoverState = "hoverStart" | "hoverEnd";
    const [hoverState, setHoverState] = useState<THoverState>("hoverEnd");

    return (
        <>
            <Suspense fallback={<Loading />}>
                <PageNotFound />
            </Suspense>
            <div className={classes.error_text_container}>
                <Text size={"large"}>{language.errorPage.pageNotFoundError}</Text>
            </div>    
            <Link 
                to="/" 
                className={classes.home_button_link}>
                <div 
                    className={classes.home_button_container}
                    style={{background: hoverState === "hoverEnd" ? theme.colors.toggleTheme : theme.colors.toggleThemeHover, color: theme.colors.secondaryTextColor}}
                    onMouseOver={() => setHoverState("hoverStart")}
                    onMouseOut={() => setHoverState("hoverEnd")}>
                    <Text color={"secondary"} className={classes.home_button}>
                        {language.errorPage.buttonLabel}
                    </Text>
                </div>
            </Link>
        </>
    );
}

const Maintenance: React.FC = () => {

    const { language } = useLanguage();
    const { theme } = useTheme();
    const isTails = coinFlip();
    const isHeads = !isTails;

    return (
        <>
            <Suspense fallback={<Loading />}>
                { isTails && <GeneralMomo />}
                { isHeads && <GeneralJesse />}
            </Suspense>
            <Text>{language.errorPage.pageNotFoundError}</Text>
        </>
    );
}

const General: React.FC = () => {

    const { language } = useLanguage();
    const { theme } = useTheme();
    const isTails = coinFlip();
    const isHeads = !isTails;

    type THoverState = "hoverStart" | "hoverEnd";
    const [hoverState, setHoverState] = useState<THoverState>("hoverEnd");

    return (
        <>
            <Suspense fallback={<Loading />}>
                { isTails && <GeneralMomo />}
                { isHeads && <GeneralJesse />}
            </Suspense>
            <div className={classes.error_text_container}>
                <Text size={"large"}>{language.errorPage.pageNotFoundError}</Text>
            </div>    
            <Link 
                to="/" 
                className={classes.home_button_link}>
                <div 
                    className={classes.home_button_container}
                    style={{background: hoverState === "hoverEnd" ? theme.colors.toggleTheme : theme.colors.toggleThemeHover, color: theme.colors.secondaryTextColor}}
                    onMouseOver={() => setHoverState("hoverStart")}
                    onMouseOut={() => setHoverState("hoverEnd")}>
                    <Text color={"secondary"} className={classes.home_button}>
                        {language.errorPage.buttonLabel}
                    </Text>
                </div>
            </Link>
        </>
    );
}

export const ErrorPage: React.FC = () => {

    const { language } = useLanguage();
    const { theme } = useTheme();
    const { state } = useLocation();
    const { subscribeToLoading } = useLoading();
    
    let error: TErrorType = "general";
    
    if(state !== null && state !== undefined) {
        const { errorType } = state as {errorType: TErrorType};
        error = errorType;
    }

    useInitialize(() => {
        subscribeToLoading(
            "loaded",
            "/about"
        );
        return () => {
            subscribeToLoading(
                "unloaded",
                "/about"
            );
        }
    });

    return (
        <ContentWrapper>
            <div className={classes.error_inner_container}>
                { error === "general" && <General />}
                { error === "pageNotFound" && <NotFound />}
                { error === "maintenance" && <Maintenance />}
            </div>
        </ContentWrapper>
    );
}