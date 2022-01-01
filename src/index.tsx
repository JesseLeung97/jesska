import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ThemeProvider from "./theme/ThemeContext";
import TranslationProvider from "./localization/LocalizationContext";
import StoryListProvider from "globalState/StoryListContext";
import { Router } from "routing/Router";
import { BrowserRouter } from 'react-router-dom';


ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <TranslationProvider>
        <StoryListProvider>
          <Router>
            <App />
          </Router>
        </StoryListProvider>
      </TranslationProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
