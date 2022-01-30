import React, { useEffect, lazy, Suspense, useState } from "react";
import classes from "components/staticPages/ErrorPage/styles.module.css";
//----- Types -----//
//----- Hooks and helpers -----//
import { useLoading } from "globalState/LoadingContext";
import { useLocation } from "react-router-dom";
import { ContentWrapper } from "components/atoms/ContentWrapper";
import { Text } from "components/atoms/Text";
import { Image } from "components/atoms/Image";
import { Loading } from "components/atoms/Loading";

const GeneralJesse = lazy(() => import("components/molecules/ErrorImages/GeneralJesse")); 
const GeneralMomo = lazy(() => import("components/molecules/ErrorImages/GeneralMomo"));

export type TErrorType = "pageNotFound" | "maintenance" | "general";

interface ErrorPageProps {

}

export const ErrorPage: React.FC<ErrorPageProps> = ({}) => {

    const { subscribeToLoading } = useLoading();
    const { state } = useLocation();
    let error: TErrorType = "general";
    if(state !== null && state !== undefined) {
        const { errorType } = state as {errorType: TErrorType};
        error = errorType;
    }

    useEffect(() => {
        console.log(error);
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
    },[]);

    return (
        <ContentWrapper>
            <div className={classes.error_inner_container}>
                <Suspense fallback={<Loading />}>
                    { error && error === "pageNotFound" &&
                        <GeneralJesse />
                    }
                    { error && error === "general" &&
                        <GeneralMomo />
                    }
                </Suspense>
                <Text>This is a test error page</Text>
            </div>
        </ContentWrapper>
    );
}