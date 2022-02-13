import React from "react";
import classes from "components/atoms/ProfileImage/styles.module.css";
//----- Types -----//
//----- Context -----//
//----- Hooks and helpers -----//
//----- Components -----//
//----- Configuration -----//

interface ProfileImageProps {
    image: string,
    transformDirection: "left" | "right";
}

export const ProfileImage: React.FC<ProfileImageProps> = ({
    image,
    transformDirection
}) => {
    return (
        <div className={classes.image_outer}>
            <img
                className={`
                    ${classes.image_inner}
                    ${transformDirection === "left" ? classes.image_inner_left : classes.image_inner_right}`} 
                src={image} 
                loading={"lazy"}/>
        </div>
    );
}