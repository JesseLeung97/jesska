import React from "react";
import classes from "components/atoms/ProfileImage/styles.module.css";
import errorImage from "assets/errors/error_jesse.png";

interface ProfileImageProps {
    image: string
}

export const ProfileImage: React.FC<ProfileImageProps> = ({
    image
}) => {
    return (
        <div className={classes.profile_image_container}>
            <img
                className={classes.image_inner} 
                src={errorImage}>
            </img>
        </div>
    );
}