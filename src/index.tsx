import React from "react";
import ReactDOM from "react-dom";
import "index.css";
//----- Types -----//
//----- Context -----//
import { ThemeProvider } from "theme/ThemeContext";
import { TranslationProvider } from "localization/LocalizationContext";
import { StoryListProvider } from "globalState/StoryListContext";
import { LoadingProvider } from "globalState/LoadingContext";
import { AppStatusProvider } from "globalState/AppStatus";
//----- Hooks and helpers -----//
//----- Components -----//
import App from "App";
import { BrowserRouter } from "routing/BrowserRouter"
//----- Configuration -----//

ReactDOM.render(
  <React.StrictMode>
    <AppStatusProvider>
      <ThemeProvider>
        <TranslationProvider>     
          <StoryListProvider>
            <BrowserRouter>
              <LoadingProvider>
                <App />
              </LoadingProvider>
            </BrowserRouter>
          </StoryListProvider>
        </TranslationProvider>
      </ThemeProvider>
    </AppStatusProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
