import React, { useContext, useState } from "react";
import { useLanguage } from "localization/LocalizationContext";
import { useTheme } from "theme/ThemeContext";
import { PageWrapper } from "components/atoms/PageWrapper";
import { RouteDefine } from "routing/RouteDefine";
import { StoryNavigation } from "components/organisms/StoryNavigation";
import { ContentWrapper } from "components/atoms/ContentWrapper";
import { Loading } from "components/atoms/Loading";
import { useLoading } from "globalState/LoadingContext";

const App: React.FC = () => {

  const loadingStatus = useLoading().isLoading;

  return (
    <PageWrapper>
      <ContentWrapper>
        <RouteDefine />
        <StoryNavigation />
        { loadingStatus === "visualStoriesLoading" || loadingStatus === "visualStoriesLoaded" &&
          <Loading />
        }
      </ContentWrapper>
    </PageWrapper>
  );
}

export default App;
