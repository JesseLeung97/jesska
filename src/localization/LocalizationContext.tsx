import React, { useLayoutEffect } from "react";
//----- Types -----//
import { TTranslation, THeadLanguages } from "types/localizationTypes";
//----- Context -----//
import { useContext, createContext } from "react";
//----- Hooks and helpers -----//
import { useState } from "react";
//----- Components -----//
//----- Configuration -----//
import { translations } from "localization/translations";

type TLanguageContext = { language: TTranslation; toggleLanguage: () => void };

export const LanguageContext = createContext<TLanguageContext>(
    {} as TLanguageContext
);

export const useLanguage = (): TLanguageContext => {
    return useContext(LanguageContext);
}

export const TranslationProvider: React.FC = ({ children }) => {

    const browserLanguage = navigator.language.substring(0, 2);
    const [headLanguage, setHeadLanguage] = useState<THeadLanguages>("en");
    const [language, setLanguage] = useState<TTranslation>(translations.english);
    const switchLanguage = () => {
        const headLanguage: THeadLanguages = language === translations.english ? "jp" : "en";
        document.documentElement.lang = headLanguage;
        setLanguage(language === translations.english ? translations.japanese : translations.english);
    }

    useLayoutEffect(() => {
        if(browserLanguage !== "en" && browserLanguage !== "jp") {
            setHeadLanguage("en");
            setLanguage(translations.english);
        } else {
            const initialLanguage = browserLanguage as THeadLanguages;
            setHeadLanguage(initialLanguage);
            setLanguage(initialLanguage === "en" ? translations.english : translations.japanese); 
        }
    }, [browserLanguage]);

    return (
        <LanguageContext.Provider value={{ language: language, toggleLanguage: switchLanguage }}>
            { children }
        </LanguageContext.Provider>
    ); 
}