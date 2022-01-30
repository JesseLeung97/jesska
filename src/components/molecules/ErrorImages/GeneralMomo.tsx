import React from "react";
import errorMomo from "assets/errors/error_momo.png";
//----- Types -----//
//----- Context -----//
//----- Hooks and helpers -----//
//----- Components -----//
import { Image } from "components/atoms/Image";
//----- Configuration -----//

const GeneralMomo: React.FC = () => {
    return (
        <Image image={errorMomo}/>
    );
}

export default GeneralMomo;