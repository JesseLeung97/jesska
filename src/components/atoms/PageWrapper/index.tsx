import React from "react";
import classes from "./styles.module.css";

interface PageWrapperProps {
    children: React.ReactNode
}

export const PageWrapper: React.FC<PageWrapperProps> = ({ children }) => {
    return (
        <div className={classes.outer_container}>
            { children }
        </div>
    );
}