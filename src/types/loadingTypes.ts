export type TComponentLoadProcedure = "visible" | "background" | "placeholder";

export type TLoadingLocation = "before" | "after";

export type TComponentLoading = "unloaded" | "loaded" | "loading";

export type TApplicationLoading = "visualStoriesLoaded" | "fullyLoaded" | "visualStoriesLoading"; 

export type TLoading = "loading" | "loaded";

export type TLoadedComponent = {
    componentId: string,
    status: TComponentLoading
}

export {}