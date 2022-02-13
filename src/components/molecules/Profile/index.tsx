import React from "react";
import classes from "components/molecules/Profile/styles.module.css"
//----- Types -----//
//----- Context -----//
//----- Hooks and helpers -----//
//----- Components -----//
import { ProfileImage } from "components/atoms/ProfileImage";
import { Title } from "components/atoms/Title";
import { Text } from "components/atoms/Text";
//----- Configuration -----//

interface ProfileProps {
    creator: "jesse" | "momo",
    profileImage: string,
    name: string,
    description: string
}

export const Profile: React.FC<ProfileProps> = ({
    creator,
    profileImage,
    name,
    description
}) => {

    return (
        <div className={`${classes.profile_container}`}>
            <ProfileImage 
                image={profileImage} 
                transformDirection={creator === "jesse" ? "right" : "left"}/>
            <div className={classes.bio_container}>
                <Title 
                    className={classes.name_text}
                    color={"toggle"}
                    isAnimated={true}>
                    {name}
                </Title>
                <Text 
                    className={`${classes.bio_text_container} ${classes.bio_text}`} 
                    size={"small"}
                    color={"sideMenu"}
                    isAnimated={true}>
                    {description}
                </Text>
            </div>
        </div>
    );
}