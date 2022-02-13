import React from "react";
//----- Types -----//
import { TComponentLoading, TApplicationLoading, TLoading, TLoadedComponent, TLoadingLocation } from "types/loadingTypes";
//----- Context -----//
import { useContext, createContext } from "react";
//----- Hooks and helpers -----//
import { useState } from "react";
//----- Components -----//
//----- Configuration -----//

type TLoadingContext = { 
    isLoading: TApplicationLoading,
    currentComponentId: string,
    loadedComponents: TLoadedComponent[],
    subscribeToLoading: (loadingType: TComponentLoading, componentId: string, relativeLocation?: TLoadingLocation, shouldUpdateCurrentComponent?: boolean) => any 
};

export const LoadingContext = createContext<TLoadingContext>(
    {} as TLoadingContext
);

export const useLoading = (): TLoadingContext => {
    return useContext(LoadingContext);
}

export const LoadingProvider: React.FC = ({ children }) => {
    const [loadingStatus, setLoadingStatus] = useState<TApplicationLoading>("visualStoriesLoading");
    const [currentComponentId, setCurrentComponentId] = useState<string>("");
    const [loadedComponents, setLoadedComponents] = useState<TLoadedComponent[]>([]);
    
    const subscribeToLoading = (loadingType: TComponentLoading, componentId: string, relativeLocation?: TLoadingLocation, shouldUpdateCurrentComponent?: boolean) => {
        let visibleComponentId = currentComponentId;
        if(shouldUpdateCurrentComponent) {
            visibleComponentId = componentId;
            setCurrentComponentId(componentId);
        }
        if(loadingType === "unloaded") {
            const removeIndexLoadedComponents = loadedComponents.filter(component => component.componentId !== componentId);
            setLoadedComponents(removeIndexLoadedComponents);
            return;
        }
        if(loadedComponents.findIndex(component => component.componentId === componentId) === -1) {
            if(relativeLocation === "before") {
                loadedComponents.unshift({
                    componentId: componentId,
                    status: loadingType
                });
            } else {
                loadedComponents.push({
                    componentId: componentId,
                    status: loadingType
                });
            }          
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
        <LoadingContext.Provider value={{isLoading: loadingStatus, currentComponentId: currentComponentId, loadedComponents: loadedComponents, subscribeToLoading: subscribeToLoading}}>
            { children }
        </LoadingContext.Provider>
    );
}