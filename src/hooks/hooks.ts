//----- Types -----//
import { TErrorType } from "components/staticPages/ErrorPage";
import { MutableRefObject, Dispatch } from "react";
//----- Context -----//
import { customHistory } from "routing/history";
//----- Hooks and helpers -----//
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
//----- Components -----//
//----- Configuration -----//


export const useReferredState = <T>(initialValue: T): [MutableRefObject<T>, Dispatch<T>] => {
    const [state, setState] = useState<T>(initialValue);
    const reference = useRef<T>(state);

    const setReferredState = (value: T) => {
        reference.current = value;
        setState(value);
    }

    return [reference, setReferredState];
 }

 export const useInitialize = (initializeFunction: () => any) => useEffect(initializeFunction, []);

 export const navigateToError = (errorType?: TErrorType): void => {
    customHistory.push("/error", { errorType: errorType as TErrorType});
 }