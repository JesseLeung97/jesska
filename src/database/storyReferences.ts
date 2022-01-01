import { ref, StorageReference } from "firebase/storage";
import { firebaseStorage } from "database/firebase";
import { TSceneReference, TStoryReference } from "types/databaseTypes";

export const bucketReference = ref(firebaseStorage);

export const CreateSceneImageReference = (storyName: string, sceneNumber: number): StorageReference => {
    return ref(bucketReference, `${storyName}/scene_${sceneNumber}/scene.jpg`);
}

export const CreateSceneEnglishReference = (storyName: string, sceneNumber: number): StorageReference => {
    return ref(bucketReference, `${storyName}/scene_${sceneNumber}/english.png`);
}

export const CreateSceneJapaneseReference = (storyName: string, sceneNumber: number): StorageReference => {
    return ref(bucketReference, `${storyName}/scene_${sceneNumber}/japanese.png`);
}

export {}