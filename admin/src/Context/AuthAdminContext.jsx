import React, { createContext, useEffect, useState } from "react";
import { getMeFetch } from "../api/getMeFetch";

export const AuthAdminContext = createContext();

const AuthAdminProvider = ({ children }) => {
    const [admin, setAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    const setToken = (token) => {
        localStorage.setItem("accessAdmin", token);
    };

    const getToken = () => {
        return localStorage.getItem("accessAdmin");
    };

    const clearToken = () => {
        localStorage.removeItem("accessAdmin");
    };

    const loginAdmin = async (token) => {
        try {
            const UserAdmin = await getMeFetch(token);
            console.log(UserAdmin);
            setAdmin(UserAdmin);
            setToken(token);
        } catch (error) {
            console.log("error");
        }
    };

    const logout = () => {
        clearToken();
        setAdmin(false);
    };

    const reload = async () => {
        const token = getToken();
        if (token) {
            await loginAdmin(token);
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
                localStorage.removeItem("accessAdmin");
                console.log("Daniel");
            }
            localStorage.removeItem("closing");
        };

        window.addEventListener("load", handleLoad);

        reload();
    }, []);

    const data = {
        admin,
        setAdmin,
        loginAdmin,
        logout,
    };

    if (loading) return null;

    return (
        <AuthAdminContext.Provider value={data}>{children}</AuthAdminContext.Provider>
    );
};

export default AuthAdminProvider;
