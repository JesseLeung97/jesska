import React, { useEffect } from "react";
import classes from "components/staticPages/AboutPage/styles.module.css";
import errorJesse from "assets/errors/error_jesse.png";
import errorMomo from "assets/errors/error_momo.png";
import { ContentWrapper } from "components/atoms/ContentWrapper";
import { useLoading } from "globalState/LoadingContext";
import { TLoadingLocation } from "types/loadingTypes";
import { Profile } from "components/molecules/Profile";

interface AboutPageProps {
    relativeLocation: TLoadingLocation
}

export const AboutPage: React.FC<AboutPageProps> = ({
    relativeLocation
}) => {

    const { subscribeToLoading } = useLoading();

    useEffect(() => {
        subscribeToLoading(
            "loaded",
            "/about",
            relativeLocation
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
            <div className={classes.profile_cards_container}>
                <Profile profileImage={errorJesse}/>
                <Profile profileImage={errorMomo}/>
            </div>
        </ContentWrapper>
    );
}