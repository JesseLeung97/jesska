import React, { useContext, useState } from "react";
import { translations } from "localization/translations";
import { TTranslation } from "types/localizationTypes";

type TLanguageContext = { language: TTranslation; toggleLanguage: () => void };

export const LanguageContext = React.createContext<TLanguageContext>(
    {} as TLanguageContext
);

export const useLanguage = (): TLanguageContext => {
    return useContext(LanguageContext);
}

const TranslationProvider: React.FC = ({ children }) => {
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

export default TranslationProvider;