import React from "react";
//----- Types -----//
//----- Context -----//
import { useContext, createContext } from "react";
//----- Hooks and helpers -----//
import { useState, useEffect } from "react";
//----- Components -----//
//----- Configuration -----//

type TDatabaseStatus = "healthy" | "down";
type TStorageStatus = "healthy" | "down";

type TAppStatusContext = { 
    databaseStatus: TDatabaseStatus, 
    storageStatus: TStorageStatus,
    updateDatabaseStatus: (databaseStatus: TDatabaseStatus) => void,
    updateStorageStatus: (storageStatus: TStorageStatus) => void, 
};

export const AppStatusContext = createContext<TAppStatusContext>(
    {} as TAppStatusContext
);

export const useAppStatus = (): TAppStatusContext => {
    return useContext(AppStatusContext);
}

export const AppStatusProvider: React.FC = ({ children }) => {
    const [databaseStatus, setDatabaseStatus] = useState<TDatabaseStatus>("healthy");
    const [storageStatus, setStorageStatus] = useState<TStorageStatus>("healthy");

    const updateDatabaseStatus = (databaseStatus: TDatabaseStatus): void => {
        setDatabaseStatus(databaseStatus);
    }

    const updateStorageStatus = (storageStatus: TStorageStatus): void => {
        setStorageStatus(storageStatus);
    }

    return (
        <AppStatusContext.Provider 
            value={{ 
                databaseStatus: databaseStatus, 
                storageStatus: storageStatus, 
                updateDatabaseStatus: updateDatabaseStatus, 
                updateStorageStatus: updateStorageStatus }}>
                {children }
        </AppStatusContext.Provider>
    );
}