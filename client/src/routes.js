import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { MainPage } from "./pages/MainPage";
import { AuthPage } from "./pages/AuthPage";

export const useRoutes = (isAuthenticated) => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path="/api/main" exact>
                    <MainPage />
                </Route>
                <Redirect to="/api/main" />
            </Switch>
        );
    }

    return (
        <Switch>
            <Route path="/api/auth/signup">
                <AuthPage />
            </Route>
            <Redirect to="/api/auth/signup" />
        </Switch>
    );
};
