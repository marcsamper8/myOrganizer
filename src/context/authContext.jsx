import { createContext, useState, useEffect } from "react";
import {
    clearAuthSession,
    getAuthToken,
    persistAuthSession,
} from "../utils/authStorage";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = getAuthToken();

        if (token) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    const login = (token, user, rememberMe = true) => {
        persistAuthSession({ token, user, rememberMe });
        setIsLoggedIn(true);
    };

    const logout = () => {
        clearAuthSession();
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
