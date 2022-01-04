import React from "react";
import classes from "components/staticPages/AboutPage/styles.module.css";

import { Text } from "components/atoms/Text";
import { ContentWrapper } from "components/atoms/ContentWrapper";

export const AboutPage: React.FC = ({}) => {
    return (
        <ContentWrapper>
            <Text>This is an about page</Text>
        </ContentWrapper>
    );
}