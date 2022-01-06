export type TComponentLoading = "unloaded" | "loaded" | "loading";

export type TApplicationLoading = "visualStoriesLoaded" | "fullyLoaded" | "visualStoriesLoading"; 

export type TLoading = "loading" | "loaded";

export type TLoadedComponent = {
    componentId: string,
    status: TComponentLoading
}

export {}