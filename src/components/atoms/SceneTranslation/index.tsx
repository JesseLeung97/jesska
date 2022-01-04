import React, { useState } from "react";
import classes from "./styles.module.css";
import { TLanguages } from "types/localizationTypes";
import { useLanguage } from "localization/LocalizationContext";
import { Image } from "components/atoms/Image";

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
                    <Image useParentSizing={true} className={classes.translation_image} image={englishTranslation} size={"large"} />
                }
                { currentLanguage === "japanese" && 
                    <Image useParentSizing={true} className={classes.translation_image} image={japaneseTranslation} size={"large"} />
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