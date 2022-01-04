import React, { useState, useContext, useEffect } from "react";
import { getStoryList } from "database/api";
import { TFirestoreStory } from "types/databaseTypes";

type TStoryListContext = { storyList: TFirestoreStory[] };

export const StoryListContext = React.createContext<TStoryListContext>(
    {} as TStoryListContext
);

export const useStoryList = (): TStoryListContext => {
    return useContext(StoryListContext);
}

const StoryListProvider: React.FC = ({ children }) => {
    const [storyList, setStoryList] = useState<TFirestoreStory[]>([]);
    
    useEffect(() => {
        const initializeStoryList = async () => {
            await getStoryList().then((storyListResponse) => {
                setStoryList(storyListResponse);
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