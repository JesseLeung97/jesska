import React from "react";
import classes from "components/molecules/ErrorImages/PageNotFound/styles.module.css";
//----- Types -----//
//----- Context -----//
//----- Hooks and helpers -----//
//----- Components -----//
import { SceneTranslation } from "components/atoms/SceneTranslation";
import { Scene } from "components/molecules/Scene";
//----- Configuration -----//
import baseImage from "assets/errors/error_pageNotFound.png";
import english from "assets/errors/error_pageNotFound_english.png";
import japanese from "assets/errors/error_pageNotFound_japanese.png";

const PageNotFound: React.FC = () => {
    return (
        <div className={classes.story_panels_container}>
            <div className={classes.story_content}>
                <SceneTranslation
                    englishTranslation={english}
                    japaneseTranslation={japanese}>
                </SceneTranslation>
                <Scene image={baseImage} />
            </div>
        </div>
    );
}

export default PageNotFound;