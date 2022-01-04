import React from "react";
import classes from "components/atoms/Image/styles.module.css";
import { TAtomSize } from "types/atomTypes";

interface ImageProps {
    className?: string,
    useParentSizing?: boolean,
    image: string,
    size?: TAtomSize
}

export const Image: React.FC<ImageProps> = ({
    className,
    useParentSizing,
    image,
    size
}) => {
    return (
        <div className={`${classes.image_outer} ${useParentSizing ? classes.parent_size : classes[size ?? "medium"]} ${className}`}>
            <img
                className={classes.image_inner} 
                src={image}>
            </img>
        </div>
    );
}