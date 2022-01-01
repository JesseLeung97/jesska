import { StoryPanels } from "components/molecules/StoryPanels";
import React from "react";
import { Routes, Route } from "react-router-dom";
import { storyReferences } from "database/storyDefine";
import { Story } from "components/organisms/Story";
import { ErrorPage } from "components/staticPages/ErrorPage";
import { AboutPage } from "components/staticPages/AboutPage";

export const RouteDefine: React.FC = () => {
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
                path={`/stories/${storyReferences.jessesSocks.storyUrl}`}
                element={<Story storyReference={storyReferences.jessesSocks}/>}
            />
        </Routes>
    );
}