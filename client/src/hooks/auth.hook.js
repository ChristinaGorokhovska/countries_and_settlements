import { useState, useCallback, useEffect } from "react";

const storageName = "user_info";

export const useAuth = () => {
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);

    const login = useCallback((jwtToken, id, isAdmin) => {
        setToken(jwtToken);
        setUserId(id);
        setIsAdmin(isAdmin);

        localStorage.setItem(storageName, JSON.stringify({ userId: id, token: jwtToken, isAdmin: isAdmin }));
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        setUserId(null);
        setIsAdmin(false);
        localStorage.removeItem(storageName);
    }, []);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName));

        if (data && data.token) {
            login(data.token, data.userId, data.isAdmin);
        }
    }, [login]);

    return { login, logout, token, userId, isAdmin };
};
