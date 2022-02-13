import React from "react";
import classes from "components/staticPages/ErrorPage/styles.module.css";
//----- Types -----//
//----- Context -----//
import { useLoading } from "globalState/LoadingContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useLanguage } from "localization/LocalizationContext";
import { useTheme } from "theme/ThemeContext";
//----- Hooks and helpers -----//
import { useInitialize } from "hooks/hooks";
import { useState } from "react";
//----- Components -----//
import { ContentWrapper } from "components/atoms/ContentWrapper";
import { Text } from "components/atoms/Text";
import { Loading } from "components/atoms/Loading";
import { lazy, Suspense } from "react";
import PageNotFound from "components/molecules/ErrorImages/PageNotFound";
//----- Configuration -----//

const GeneralJesse = lazy(() => import("components/molecules/ErrorImages/GeneralJesse")); 
const GeneralMomo = lazy(() => import("components/molecules/ErrorImages/GeneralMomo"));

export type TErrorType = "pageNotFound" | "maintenance" | "general";
type THoverState = "hoverStart" | "hoverEnd";

const coinFlip = (): boolean => {
    return Math.floor(Math.random() * 2) == 0;
}

const goHome = (): void => {
    window.location.href = "/";
}

const NotFound: React.FC = () => {

    const { language } = useLanguage();
    const { theme } = useTheme();
    const [hoverState, setHoverState] = useState<THoverState>("hoverEnd");

    return (
        <>
            <Suspense fallback={<Loading />}>
                <PageNotFound />
            </Suspense>
            <div className={classes.error_text_container}>
                <Text size={"large"}>{language.errorPage.pageNotFoundError}</Text>
            </div>    
            <button
                className={`${classes.home_button_link} ${classes.button_no_styles}`}
                onClick={goHome}>
                <div 
                    className={classes.home_button_container}
                    style={{background: hoverState === "hoverEnd" ? theme.colors.toggleTheme : theme.colors.toggleThemeHover, color: theme.colors.secondaryText}}
                    onMouseOver={() => setHoverState("hoverStart")}
                    onMouseOut={() => setHoverState("hoverEnd")}>
                    <Text color={"secondary"} className={classes.home_button}>
                        {language.errorPage.buttonLabel}
                    </Text>
                </div>
            </button>
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
            <button
                className={`${classes.home_button_link} ${classes.button_no_styles}`}
                onClick={goHome}>
                <div 
                    className={classes.home_button_container}
                    style={{background: hoverState === "hoverEnd" ? theme.colors.toggleTheme : theme.colors.toggleThemeHover, color: theme.colors.secondaryText}}
                    onMouseOver={() => setHoverState("hoverStart")}
                    onMouseOut={() => setHoverState("hoverEnd")}>
                    <Text color={"secondary"} className={classes.home_button}>
                        {language.errorPage.buttonLabel}
                    </Text>
                </div>
            </button>
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
        <div className={classes.content_wrapper}>
            <div className={classes.error_inner_container}>
                { error === "general" && <General />}
                { error === "pageNotFound" && <NotFound />}
                { error === "maintenance" && <Maintenance />}
            </div>
        </div>
    );
}