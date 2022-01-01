export type TScene = {
    storyboard: string,
    englishTranslation: string,
    japaneseTranslation: string
}

export type TStory = {
    storyNameEnglish: string,
    storyNameJapanese: string,
    storyLength: number,
    scenes: Array<TScene>
}