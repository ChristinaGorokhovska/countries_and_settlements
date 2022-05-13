import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { MainPage } from "./pages/MainPage";
import { AuthPage } from "./pages/AuthPage";
import { LogTable } from "./components/LogTable";
import { Termins } from "./components/Termins";

export const useRoutes = (isAuthenticated, isAdmin) => {
  if (isAuthenticated && isAdmin) {
    return (
      <Switch>
        <Route path="/logTable" exact>
          <LogTable isAdmin={isAdmin} />
        </Route>
        <Route path="/terms" exact>
          <Termins isAdmin={isAdmin} />
        </Route>
        <Route path="/main" exact>
          <MainPage isAdmin={isAdmin} />
        </Route>

        <Redirect to="/main" />
      </Switch>
    );
  }
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/terms" exact>
          <Termins />
        </Route>
        <Route path="/main" exact>
          <MainPage />
        </Route>

        <Redirect to="/main" />
      </Switch>
    );
  }

  return (
    <Switch>
      <Route path="/" exact>
        <AuthPage />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
};
