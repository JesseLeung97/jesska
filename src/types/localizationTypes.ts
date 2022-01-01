export type TLanguages = "english" | "japanese";

export type TTranslation = {
    currentLanguage: TLanguages,
    common: {
        siteName: string
    },
    buttons: {
        toggleLanguage: string
    },
    aboutPage: {
        navigationButton: string
    }
}

