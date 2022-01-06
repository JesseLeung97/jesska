import React, { useContext, useState } from "react";
import { TComponentLoading, TApplicationLoading, TLoading, TLoadedComponent } from "types/loadingTypes";

type TLoadingContext = { 
    isLoading: TApplicationLoading,
    currentComponentId: string,
    subscribeToLoading: (loadingType: TComponentLoading, componentId: string, shouldUpdateCurrentComponent?: boolean) => any 
};


export const LoadingContext = React.createContext<TLoadingContext>(
    {} as TLoadingContext
);

export const useLoading = (): TLoadingContext => {
    return useContext(LoadingContext);
}

export const LoadingProvider: React.FC = ({ children }) => {
    const [loadingStatus, setLoadingStatus] = useState<TApplicationLoading>("visualStoriesLoading");
    const [currentComponentId, setCurrentComponentId] = useState<string>("");
    const [loadedComponents, setLoadedComponents] = useState<TLoadedComponent[]>([]);


    const subscribeToLoading = (loadingType: TComponentLoading, componentId: string, shouldUpdateCurrentComponent?: boolean) => {
        let visibleComponentId = currentComponentId;
        if(shouldUpdateCurrentComponent) {
            visibleComponentId = componentId;
            setCurrentComponentId(componentId);
        }
        if(loadingType === "unloaded") {
            loadedComponents.filter(component => component.componentId !== componentId);
            return;
        }
        if(loadedComponents.findIndex(component => component.componentId === componentId) === -1) {
            loadedComponents.push({
                componentId: componentId,
                status: loadingType
            });
        } else {
            const foundIndex = loadedComponents.findIndex(component => component.componentId === componentId);
            loadedComponents[foundIndex].status = loadingType;
        }
        const checkLoadingComponent = loadedComponents.find(component => component.status === "loading");
        if(checkLoadingComponent === undefined) {
            setLoadingStatus("fullyLoaded");
        } else {
            let isVisualComponentLoading = false;
            loadedComponents.forEach((component) => {
                if(component.status === "loading" && component.componentId === visibleComponentId) {
                    isVisualComponentLoading = true;
                }
            }); 
            setLoadingStatus(isVisualComponentLoading ? "visualStoriesLoading" : "visualStoriesLoaded");
        }
    }

    return (
        <LoadingContext.Provider value={{isLoading: loadingStatus, currentComponentId: currentComponentId, subscribeToLoading: subscribeToLoading}}>
            { children }
        </LoadingContext.Provider>
    );
}