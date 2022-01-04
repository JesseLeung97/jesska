import React from "react";
import classes from "components/staticPages/ErrorPage/styles.module.css";
import { ContentWrapper } from "components/atoms/ContentWrapper";
import { Text } from "components/atoms/Text";
import { Image } from "components/atoms/Image";
import errorJesse from "assets/errors/error_jesse.png";

interface ErrorPageProps {

}

export const ErrorPage: React.FC<ErrorPageProps> = ({}) => {
    return (
        <ContentWrapper>
            <Image image={errorJesse}/>
            <Text>This is a test error page</Text>
        </ContentWrapper>
    );
}