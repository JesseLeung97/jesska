import React from "react";
import classes from "components/atoms/ProfileImage/styles.module.css";
//----- Types -----//
//----- Context -----//
//----- Hooks and helpers -----//
//----- Components -----//
//----- Configuration -----//

interface ProfileImageProps {
    image: string
}

export const ProfileImage: React.FC<ProfileImageProps> = ({
    image
}) => {
    return (
        <div className={classes.image_outer}>
            <img
                className={classes.image_inner} 
                src={image}>
            </img>
        </div>
    );
}