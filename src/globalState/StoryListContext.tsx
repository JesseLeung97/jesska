import React from "react";
//----- Types -----//
import { TFirestoreStory } from "types/databaseTypes";
//----- Context -----//
import { useContext, createContext } from "react";
import { useAppStatus } from "globalState/AppStatus";
//----- Hooks and helpers -----//
import { useState, useEffect } from "react";
import { getStoryList } from "database/api";
import { navigateToError } from "hooks/hooks";
//----- Components -----//
//----- Configuration -----//

type TStoryListContext = { storyList: TFirestoreStory[] };

export const StoryListContext = createContext<TStoryListContext>(
    {} as TStoryListContext
);

export const useStoryList = (): TStoryListContext => {
    return useContext(StoryListContext);
}

export const StoryListProvider: React.FC = ({ children }) => {
    const [storyList, setStoryList] = useState<TFirestoreStory[]>([]);
    const [isError, setIsError] = useState<boolean>(false);
    const { databaseStatus, updateDatabaseStatus } = useAppStatus();
    
    useEffect(() => {
        const initializeStoryList = async () => {
            await getStoryList().then((storyListResponse) => {
                setStoryList(storyListResponse);
            }).catch((error) => {
                updateDatabaseStatus("down");
                navigateToError("maintenance");
            });
        }
        if(databaseStatus === "healthy") {
            initializeStoryList();
        }
    }, []);

    return (
        <StoryListContext.Provider value={{ storyList }}>
            { children }
        </StoryListContext.Provider>
    );
}