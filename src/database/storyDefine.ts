import { TStoryReference } from "types/databaseTypes";
import { CreateSceneJapaneseReference, CreateSceneImageReference, CreateSceneEnglishReference } from "database/storyReferences";
import storiesJson from "database/storyDefine.json";

const jessesSocks: TStoryReference = {
    storyUrl: "jessesSocks",
    storyNameEnglish: "Jesse's socks",
    storyNameJapanese: "ジェシーの靴下", 
    scenes: {
        "scene_1": {
            scene: CreateSceneImageReference(storiesJson.jessesSocks.storyName, 1),
            english: CreateSceneEnglishReference(storiesJson.jessesSocks.storyName, 1),
            japanese: CreateSceneJapaneseReference(storiesJson.jessesSocks.storyName, 1)
        },
        "scene_2": {
            scene: CreateSceneImageReference(storiesJson.jessesSocks.storyName, 2),
            english: CreateSceneEnglishReference(storiesJson.jessesSocks.storyName, 2),
            japanese: CreateSceneJapaneseReference(storiesJson.jessesSocks.storyName, 2)
        },
        "scene_3": {
            scene: CreateSceneImageReference(storiesJson.jessesSocks.storyName, 3),
            english: CreateSceneEnglishReference(storiesJson.jessesSocks.storyName, 3),
            japanese: CreateSceneJapaneseReference(storiesJson.jessesSocks.storyName, 3)
        },
        "scene_4": {
            scene: CreateSceneImageReference(storiesJson.jessesSocks.storyName, 4),
            english: CreateSceneEnglishReference(storiesJson.jessesSocks.storyName, 4),
            japanese: CreateSceneJapaneseReference(storiesJson.jessesSocks.storyName, 4)
        }
    }
}

let storyReferences = {
    jessesSocks
}

export { 
    storyReferences 
}