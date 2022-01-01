import React from "react";
import classes from "./styles.module.css";

interface ContentWrapperProps {
    children: React.ReactNode
}

export const ContentWrapper: React.FC<ContentWrapperProps> = ({ children }) => {
    return (
        <div className={classes.inner_container}>
            { children }
        </div>
    );
}