import { StoryPanels } from "components/molecules/StoryPanels";
import React, { useEffect, useState } from "react";
import { Routes, Route, RouteProps, useLocation } from "react-router-dom";
import { Story } from "components/organisms/Story";
import { ErrorPage } from "components/staticPages/ErrorPage";
import { AboutPage } from "components/staticPages/AboutPage";
import { useStoryList } from "globalState/StoryListContext";
import { firebaseFirestore } from "database/firebase";
import { createStory } from "database/api";
import { TFirestoreStory } from "types/databaseTypes";
import { Text } from "components/atoms/Text";

export const RouteDefine: React.FC = () => {

    const storyList = useStoryList().storyList;
    const [routes, setRoutes] = useState<React.ReactNode>(<></>);
    const location = useLocation();

    const createStoryIfExists = (): React.ReactNode => {
        const storyIndex = storyList.findIndex((story) => location.pathname === `/stories${story.storyUrlExtension}`);
        if(storyIndex > -1) {
            const firestoreStory: TFirestoreStory = storyList[storyIndex];
            return (
                <Story key={firestoreStory.storyUrlExtension} firestoreStory={firestoreStory}/>
            );
        } else {
            return (
                <Text>Page couldn't be found</Text>
            )
        }
    }

    return (
        <Routes>
            <Route 
                path="/" 
                element={<ErrorPage />}
            />
            <Route
                path="/about"
                element={<AboutPage />}
            />
            <Route 
                path="/stories/:id"
                element={createStoryIfExists()}
            />
        </Routes>
    );
}