import { ref, StorageReference } from "firebase/storage";
import { firebaseStorage } from "database/firebase";
import { TSceneReference, TStoryReference } from "types/databaseTypes";

export const bucketReference = ref(firebaseStorage);

export const CreateSceneImageReference = (imageReference: string): StorageReference => {
    return ref(bucketReference, imageReference);
}

export const CreateSceneEnglishReference = (imageReference: string): StorageReference => {
    return ref(bucketReference, imageReference);
}

export const CreateSceneJapaneseReference = (imageReference: string): StorageReference => {
    return ref(bucketReference, imageReference);
}

export {}