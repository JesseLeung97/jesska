import React from "react";
import classes from "./styles.module.css";
//----- Types -----//
import { TLanguages } from "types/localizationTypes";
//----- Context -----//
import { useLanguage } from "localization/LocalizationContext";
//----- Hooks and helpers -----//
import { useState } from "react";
//----- Components -----//
import { Image } from "components/atoms/Image";
//----- Configuration -----//

interface SceneTranslationProps {
    englishTranslation: string,
    japaneseTranslation: string
}

export const SceneTranslation: React.FC<SceneTranslationProps> = ({
    englishTranslation,
    japaneseTranslation
}) => {

    const { language } = useLanguage();

    const setTranslation = (currentLanguage: TLanguages): React.ReactNode => {
        return (
            <>
                { currentLanguage === "english" && 
                    <Image 
                        useParentSizing={true} 
                        className={classes.translation_image} 
                        image={englishTranslation} 
                        size={"large"} />
                }
                { currentLanguage === "japanese" && 
                    <Image 
                        useParentSizing={true} 
                        className={classes.translation_image} 
                        image={japaneseTranslation} 
                        size={"large"} />
                }
            </>
        );
    }

    return (
        <div className={classes.translation_container}>
            { setTranslation(language.currentLanguage) }
        </div>
    );
}