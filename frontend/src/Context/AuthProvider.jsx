import React, { createContext, useEffect, useState } from "react";
import { getMeFetch } from "../api/getMeFetch";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(false);
    const [loading, setLoading] = useState(true);

    const setToken = (token) => {
        localStorage.setItem("access", token);
    };

    const getToken = () => {
        return localStorage.getItem("access");
    };

    const clearToken = () => {
        localStorage.removeItem("access");
    };

    const login = async (token) => {
        try {
            const user = await getMeFetch(token);
            setUser(user);
            setToken(token);
        } catch (error) {
            console.log("error");
        }
    };

    const logout = () => {
        clearToken();
        setUser(false);
    };

    const reload = async () => {
        const token = getToken();
        if (token) {
            await login(token);
        }
        setLoading(false);
    };

    useEffect(() => {

        const handleBeforeUnload = () => {
            localStorage.setItem("closing", "true");
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        const handleLoad = () => {
            if (localStorage.getItem("closing") === "true") {
                localStorage.removeItem("access");
                console.log("Daniel");
            }
            localStorage.removeItem("closing");
        };

        window.addEventListener("load", handleLoad);

        reload();
    }, []);

    const data = {
        user,
        setUser,
        login,
        logout,
    };

    if (loading) return null;

    return (
        <AuthContext.Provider value={data}>{children}</AuthContext.Provider>
    );
};

export default AuthProvider;
