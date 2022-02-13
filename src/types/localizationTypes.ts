export type TLanguages = "english" | "japanese";

export type THeadLanguages = "en" | "jp";

export type TTranslation = {
    currentLanguage: TLanguages,
    common: {
        siteName: string
    },
    buttons: {
        toggleLanguage: string
    },
    aboutPage: {
        navigationButton: string,
        nameJesse: string,
        descriptionJesse: string,
        nameMomo: string,
        descriptionMomo: string
    },
    errorPage: {
        pageNotFoundError: string,
        buttonLabel: string
    }
}