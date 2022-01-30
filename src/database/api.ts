//----- Types -----//
import { TScene, TStory } from "types/storyTypes";
import { TFirestoreScene, TFirestoreStory, TSceneGroupReference, TSceneReference, TStoryReference } from "types/databaseTypes";
//----- Context -----//
//----- Hooks and helpers -----//
import { getDownloadURL } from "firebase/storage";
import { getDocs, collection, where, query, QuerySnapshot, DocumentData } from "firebase/firestore";
import { CreateSceneJapaneseReference, CreateSceneImageReference, CreateSceneEnglishReference } from "database/storyReferences";
import { navigateToError } from "hooks/hooks";
//----- Components -----//
//----- Configuration -----//
import { firebaseFirestore } from "database/firebase";

const createSceneGroup = async (sceneGroup: TSceneGroupReference): Promise<Array<TScene>> => {
    let scenes = Array<TScene>();
    let storyLength = 0;
    for await (const scene of Object.values(sceneGroup)) {
        const [storyboardUrl, englishTranslationUrl, japaneseTranslationUrl] = await Promise.all([getDownloadURL(scene.scene), getDownloadURL(scene.english), getDownloadURL(scene.japanese)]);

        const additiveScene: TScene = {
            storyboard: storyboardUrl,
            englishTranslation: englishTranslationUrl,
            japaneseTranslation: japaneseTranslationUrl
        };

        scenes.push(additiveScene);
        storyLength++;
    }
    return scenes;
}

export const getStoryList = async (includeInactive: boolean = false): Promise<TFirestoreStory[]> => {
    let storyList = Array<TFirestoreStory>();
    const storyCollectionReference = collection(firebaseFirestore, "stories");
    let storyListQuery = query(storyCollectionReference, where("isActive", "==", true));
    if (includeInactive) {
        storyListQuery = query(storyCollectionReference);
    }

    await getDocs(storyListQuery).then((storyListResponse) => {
        storyListResponse.forEach((doc) => {
            let story: TFirestoreStory = {
                ...doc.data() as TFirestoreStory,
                storyID: doc.id,
                scenes: query(collection(firebaseFirestore, `stories/${doc.id}/scenes`))
            }
            
            storyList.push(story as TFirestoreStory);
        });
    }).catch((error) => {
        navigateToError();
    });
    return storyList;
} 

export const createStory = async (firestoreStory: TFirestoreStory): Promise<TStory> => {
    const sceneReferenceGroup = await convertToSceneGroup(firestoreStory);
    const scenes = await createSceneGroup(sceneReferenceGroup);

    const story: TStory = {
        storyNameEnglish: firestoreStory.storyNameEnglish,
        storyNameJapanese: firestoreStory.storyNameJapanese,
        scenes: scenes
    }

    return story;
} 

export const convertToSceneGroup = async (firestoreStory: TFirestoreStory): Promise<TSceneGroupReference> => {
    let scenes: TSceneGroupReference = {};

    await getDocs(firestoreStory.scenes).then(async (sceneList) => {
        sceneList.docs.forEach((scene) => {
            const sceneData = scene.data() as TFirestoreScene;
            const sceneId = scene.id;
           
            const additiveScene: TSceneReference = {
                scene: CreateSceneImageReference(sceneData.scene),
                english: CreateSceneEnglishReference(sceneData.english),
                japanese: CreateSceneJapaneseReference(sceneData.japanese)
            }

            scenes = {
                ...scenes,
                [sceneId]: additiveScene
            }

        });
    }).catch((error) => {
        navigateToError();
    });

    return scenes;
}