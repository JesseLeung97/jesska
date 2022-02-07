import React from "react";
//----- Types -----//
//----- Context -----//
import { useContext } from "react";
//----- Hooks and helpers -----//
import { useState } from "react";
//----- Components -----//
//----- Configuration -----//

type TStoryLoadingContext = {
    onLoadingComplete: () => void
}

export const StoryLoadingContext = React.createContext<TStoryLoadingContext>(
    {} as TStoryLoadingContext
);

export const useStoryLoading = (): TStoryLoadingContext => {
    return useContext(StoryLoadingContext);
}

interface StoryLoadingProviderProps {
    storyLength: number,
    children: React.ReactNode,
    onStoryLoad: () => void
}

export const StoryLoadingProvider: React.FC<StoryLoadingProviderProps> = ({ 
    storyLength,
    children,
    onStoryLoad 
}) => {
    const [loadedLength, setLoadedLength] = useState<number>(0);

    const onLoadingComplete = (): void => {
        if(loadedLength + 1 >= storyLength) {
            onStoryLoad();
            return;
        }
        setLoadedLength(loadedLength + 1);
    }

    return (
        <StoryLoadingContext.Provider value={{onLoadingComplete}}>
            { children }
        </StoryLoadingContext.Provider>
    );
}