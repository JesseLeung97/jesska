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
    profileImage: string
}

export const Profile: React.FC<ProfileProps> = ({
    profileImage,
}) => {
    return (
        <div className={`${classes.profile_container}`}>
            <ProfileImage image={profileImage} />
            <div className={classes.bio_container}>
                <Title isAnimated={true}>This is the profile title</Title>
                <Text className={classes.bio_text_container} isAnimated={true}>This is the profile text</Text>
            </div>
        </div>
    );
}