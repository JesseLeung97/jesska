import React from "react";
//----- Types -----//
import { BrowserHistory, Action, Location } from "history";
//----- Context -----//
import { customHistory } from "routing/history";
//----- Hooks and helpers -----//
import { useState, useLayoutEffect } from "react";
import { Router } from "react-router-dom";
//----- Components -----//
//----- Configuration -----//

type THistory = {
    action: Action | undefined,
    location: string | Partial<Location>
}

interface CustomRouterProps {
    history: BrowserHistory;
    children: React.ReactNode;
}

const CustomRouter: React.FC<CustomRouterProps> = ({
    history,
    children
}) => {
    const [state, setState] = useState<THistory>({
        action: history.action,
        location: history.location
    });

    useLayoutEffect(() => history.listen(setState), [history]);

    return (
        <Router 
            location={state.location}
            navigationType={state.action}
            navigator={history} 
            children={children}/>
    );
}

export const BrowserRouter: React.FC = ({ children }) => {
    return (
        <CustomRouter history={customHistory}>
            { children }
        </CustomRouter>
    );
}