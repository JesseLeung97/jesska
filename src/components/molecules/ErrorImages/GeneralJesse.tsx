import React from "react";
import errorJesse from "assets/errors/error_jesse.png";
//----- Types -----//
//----- Context -----//
//----- Hooks and helpers -----//
//----- Components -----//
import { Image } from "components/atoms/Image";
//----- Configuration -----//

const GeneralJesse: React.FC = () => {
    return (
        <Image image={errorJesse}/>
    );
}

export default GeneralJesse;