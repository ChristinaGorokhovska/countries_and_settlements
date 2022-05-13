import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useRoutes } from "./routes";
import { useAuth } from "./hooks/auth.hook";
import { AuthContext } from "./context/auth.context";

function App() {
    const { token, login, logout, userId, isAdmin } = useAuth();
    const isAuthenticated = !!token;
    //const IsAdmin = isAdmin;
    const routes = useRoutes(isAuthenticated, isAdmin);
    return (
        <AuthContext.Provider value={{ token, login, logout, userId, isAuthenticated, isAdmin }}>
            <Router>
                <div>{routes}</div>
            </Router>
        </AuthContext.Provider>
    );
}

export default App;
