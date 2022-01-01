import { TScene, TStory } from "types/storyTypes";
import { TFirestoreStory, TSceneGroupReferece, TStoryReference } from "types/databaseTypes";
import { getDownloadURL } from "firebase/storage";
import { getDocs, collection, where, query } from "firebase/firestore";
import { firebaseFirestore } from "database/firebase";

const createSceneGroup = async (sceneGroup: TSceneGroupReferece): Promise<[Array<TScene>, number]> => {
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
    return [scenes, storyLength];
}

export const convertToTStory = async (storyReference: TStoryReference): Promise<TStory> => {
    const [scenes, storyLength] = await createSceneGroup(storyReference.scenes);

    let story: TStory = {
        storyNameEnglish: storyReference.storyNameEnglish,
        storyNameJapanese: storyReference.storyNameJapanese,
        storyLength: storyLength,
        scenes: scenes
    };

    return story;
}

export const getStoryList = async (includeInactive: boolean = false): Promise<TFirestoreStory[]> => {
    let storyList = Array<TFirestoreStory>();

    let storyListQuery = query(collection(firebaseFirestore, "stories"), where("isActive", "==", true));
    if (includeInactive) {
        storyListQuery = query(collection(firebaseFirestore, "stories"));
    }

    await getDocs(storyListQuery).then((storyListResponse) => {
        storyListResponse.forEach((doc) => {
            storyList.push(doc.data() as TFirestoreStory);
        });
    }).catch((error) => {
        console.log(error);
    });
    return storyList;
} 