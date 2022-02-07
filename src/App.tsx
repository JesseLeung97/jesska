import React from "react";
//----- Types -----//
//----- Context -----//
import { useLoading } from "globalState/LoadingContext";
import { NavigationProvider } from "globalState/NavigationContext";
import { useAppStatus } from "globalState/AppStatus";
//----- Hooks and helpers -----//
//----- Components -----//
import { PageWrapper } from "components/atoms/PageWrapper";
import { RouteDefine } from "routing/RouteDefine";
import { StoryNavigation } from "components/organisms/StoryNavigation";
import { Loading } from "components/atoms/Loading";
import { ScrollHandler } from "components/organisms/ScrollHandler";
import { Header } from "components/organisms/Header";
//----- Configuration -----//

const App: React.FC = () => {

  const { isLoading } = useLoading();
  const { databaseStatus } = useAppStatus();

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
