import React, { useEffect, useState } from "react";
import classes from "routing/RouteDefine/styles.module.css";
//----- Types -----//
import { TComponentLoadProcedure } from "types/loadingTypes";
import { TFirestoreStory } from "types/databaseTypes";
import { TErrorType } from "components/staticPages/ErrorPage";
//----- Context -----//
import { useStoryList } from "globalState/StoryListContext";
//----- Hooks and helpers -----//
import { useLocation, useNavigate } from "react-router-dom";
//----- Components -----//
import { Routes, Route, Navigate } from "react-router-dom";
import { Story } from "components/organisms/Story";
import { ErrorPage } from "components/staticPages/ErrorPage";
import { AboutPage } from "components/staticPages/AboutPage";
//----- Configuration -----/\

export const RouteDefine: React.FC = () => {

    const { storyList } = useStoryList();
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const [routes, setRoutes] = useState<React.ReactNode>(<></>);
    const [isError, setIsError] = useState<boolean>(false);

    const getLoadingProcedure = (storyIndex: number, index: number): TComponentLoadProcedure => {
        switch(Math.abs(index - storyIndex)) {
            case 1:
                return "background";
            case 0:
                return "visible";
            default: 
                return "placeholder";
        }
    }

    const createStoryIfExists = (): React.ReactNode => {
        if(storyList.length < 1) {
            return;
        }
        const storyIndex = storyList.findIndex((story) => pathname === `/stories${story.storyUrlExtension}`);
        if(storyIndex > -1) {
            return (
                <>
                    <AboutPage key={"/about"} relativeLocation={"after"}/>
                    {storyList.map((story, index) => {
                        return(
                            <Story key={story.storyUrlExtension} firestoreStory={story} loadingType={getLoadingProcedure(storyIndex, index)} relativeLocation={"after"} />
                        );
                    })}
                </>
            );
        } else {
            return (
                <Navigate to="/error" state={{errorType: "pageNotFound" as TErrorType}}/>
            );
        }
    }

    return (
        <div id={"story_list_container"}
            className={classes.story_list_container}>
            <Routes>
                <Route 
                    path="/" 
                    element={<Navigate to="/stories/jessessocks" />}/>
                <Route
                    path="/about"
                    element={
                        <>
                            <AboutPage key={"/about"} relativeLocation={"after"}/>
                            {storyList.map((story, index) => {
                                return(
                                    <Story key={story.storyUrlExtension} firestoreStory={story} loadingType={index === 0 || index === 1 ? "background" : "placeholder"} relativeLocation={"after"} />
                                );
                            })}
                        </>
                    }/>
                <Route 
                    path="/stories/:id"
                    element={createStoryIfExists()}/>
                <Route 
                    path="/error"
                    element={<ErrorPage />}/>
                <Route 
                    path="*"
                    element={<Navigate to="/error" state={{errorType: "pageNotFound" as TErrorType}}/>}/>
            </Routes>
        </div>
    );
}