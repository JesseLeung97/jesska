import React from "react";
import classes from "components/staticPages/ErrorPage/styles.module.css";

interface ErrorPageProps {

}

export const ErrorPage: React.FC<ErrorPageProps> = ({}) => {
    return (
        <div className={classes.error_container}>
            <h2>This is a test error page</h2>
        </div>
    );
}