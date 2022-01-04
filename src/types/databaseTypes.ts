import { DocumentData, Query } from "firebase/firestore";
import { StorageReference } from "firebase/storage";

export type TSceneReference = {
    scene: StorageReference,
    english: StorageReference,
    japanese: StorageReference
}

export type TSceneGroupReference = {
    [key: string]: TSceneReference
}

export type TStoryReference = {
    storyUrl: string,
    storyNameEnglish: string,
    storyNameJapanese: string,
    scenes: TSceneGroupReference
}

export type TFirestoreStory = {
    isActive: boolean,
    storyDate: string,
    storyNameEnglish: string,
    storyNameJapanese: string,
    storyUrlExtension: string,
    storyID: string,
    scenes: Query<DocumentData>
}

export type TFirestoreScene = {
    scene: string,
    english: string,
    japanese: string
}

export {}