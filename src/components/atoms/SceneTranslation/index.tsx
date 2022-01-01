import React, { useState } from "react";
import classes from "./styles.module.css";
import { TLanguages } from "types/localizationTypes";
import { useLanguage } from "localization/LocalizationContext";

interface SceneTranslationProps {
    englishTranslation: string,
    japaneseTranslation: string
}

export const SceneTranslation: React.FC<SceneTranslationProps> = ({
    englishTranslation,
    japaneseTranslation
}) => {
    const language = useLanguage().language.currentLanguage;

    const setTranslation = (currentLanguage: TLanguages): React.ReactNode => {
        return (
            <>
                { currentLanguage === "english" && 
                    <img className={classes.image_inner} src={englishTranslation}></img>
                }
                { currentLanguage === "japanese" && 
                    <img className={classes.image_inner} src={japaneseTranslation}></img>
                }
            </>
        );
    }

    return (
        <div className={classes.translation_container}>
            { setTranslation(language) }
        </div>
    );
}