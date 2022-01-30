import React from "react";
//----- Types -----//
import { MutableRefObject, Dispatch } from "react";
//----- Context -----//
//----- Hooks and helpers -----//
import { useState, useRef, useEffect } from "react";
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

 export const navigateToError = (): void => {
    const baseUrl = window.location.origin;
    window.location.href = `${baseUrl}/error`;
 }