import React from "react";
//----- Types -----//
import { TFirestoreStory } from "types/databaseTypes";
//----- Context -----//
import { useContext, createContext } from "react";
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

const StoryListProvider: React.FC = ({ children }) => {
    const [storyList, setStoryList] = useState<TFirestoreStory[]>([]);
    const [isError, setIsError] = useState<boolean>(false);
    
    useEffect(() => {
        const initializeStoryList = async () => {
            await getStoryList().then((storyListResponse) => {
                setStoryList(storyListResponse);
            }).catch(() => {
                navigateToError();
            });
        }
        initializeStoryList();
    }, []);

    return (
        <StoryListContext.Provider value={{ storyList }}>
            { children }
        </StoryListContext.Provider>
    );
}

export default StoryListProvider;