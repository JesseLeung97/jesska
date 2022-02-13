import React, { useEffect } from "react";
import classes from "components/staticPages/AboutPage/styles.module.css";
//----- Types -----//
//----- Context -----//
import { useLanguage } from "localization/LocalizationContext";
import { useLoading } from "globalState/LoadingContext";
//----- Hooks and helpers -----//
//----- Components -----//
import { ContentWrapper } from "components/atoms/ContentWrapper";
import { TLoadingLocation } from "types/loadingTypes";
import { Profile } from "components/molecules/Profile";
//----- Configuration -----//
import profileJesse from "assets/profile/profileJesse.png";
import profileMomo from "assets/profile/profileMomo.png";

interface AboutPageProps {
    relativeLocation: TLoadingLocation
}

export const AboutPage: React.FC<AboutPageProps> = ({
    relativeLocation
}) => {

    const { subscribeToLoading } = useLoading();
    const { language } = useLanguage();

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
                <Profile 
                    creator="jesse"
                    profileImage={profileJesse}
                    name={language.aboutPage.nameJesse}
                    description={language.aboutPage.descriptionJesse}
                    />
                <Profile 
                    creator="momo"
                    profileImage={profileMomo}
                    name={language.aboutPage.nameMomo}
                    description={language.aboutPage.descriptionMomo}/>
            </div>
        </ContentWrapper>
    );
}