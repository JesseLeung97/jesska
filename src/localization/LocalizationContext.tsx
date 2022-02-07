import React from "react";
//----- Types -----//
import { TTranslation } from "types/localizationTypes";
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
    const [language, setLanguage] = useState<TTranslation>(translations.english);
    const switchLanguage = () => {
        setLanguage(language === translations.english ? translations.japanese : translations.english);
    }
    return (
        <LanguageContext.Provider value={{ language: language, toggleLanguage: switchLanguage }}>
            { children }
        </LanguageContext.Provider>
    ); 
}