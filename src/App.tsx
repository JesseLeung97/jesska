import React, { useContext, useState } from "react";
import { useLanguage } from "localization/LocalizationContext";
import { useTheme } from "theme/ThemeContext";
import { PageWrapper } from "components/atoms/PageWrapper";
import { RouteDefine } from "routing/RouteDefine";
import { StoryNavigation } from "components/organisms/StoryNavigation";
import { ContentWrapper } from "components/atoms/ContentWrapper";
import { Loading } from "components/atoms/Loading";
import { useLoading } from "globalState/LoadingContext";
import { ScrollHandler } from "components/organisms/ScrollHandler";
import { Header } from "components/organisms/Header";
import NavigationProvider from "globalState/NavigationContext";

const App: React.FC = () => {

  const { isLoading } = useLoading();

  return (
    <PageWrapper>
        { isLoading === "visualStoriesLoading" &&
          <Loading />
        }
        <Header />
        <NavigationProvider>
          <ScrollHandler>
            <RouteDefine />
            <StoryNavigation />
          </ScrollHandler>
        </NavigationProvider> 
    </PageWrapper>
  );
}

export default App;
