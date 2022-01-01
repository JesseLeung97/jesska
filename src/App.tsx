import React, { useContext, useState } from 'react';
import { useLanguage } from './localization/LocalizationContext';
import { useTheme } from './theme/ThemeContext';
import { PageWrapper } from "./components/atoms/PageWrapper";
import { RouteDefine } from 'routing/RouteDefine';
import { StoryNavigation } from 'components/organisms/StoryNavigation';

const testOnClick = (iter: number) => {
  console.log(iter);
}

function App() {
  return (
    <PageWrapper>
      <StoryNavigation />
      <RouteDefine />
    </PageWrapper>
  );
}

export default App;
