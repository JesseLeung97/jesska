import { StorageReference } from "firebase/storage";

export type TSceneReference = {
    scene: StorageReference,
    english: StorageReference,
    japanese: StorageReference
}

export type TSceneGroupReferece = {
    [key: string]: TSceneReference
}

export type TStoryReference = {
    storyUrl: string,
    storyNameEnglish: string,
    storyNameJapanese: string,
    scenes: TSceneGroupReferece
}

export type TFirestoreStory = {
    isActive: boolean,
    storyDate: string,
    storyNameEnglish: string,
    storyNameJapanese: string,
    storyUrlExtension: string
}

export {}