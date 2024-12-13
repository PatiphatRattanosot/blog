import { useState, useEffect, useContext, createContext } from "react";
import AuthServices from "../services/auth.service";
import { Cookies } from 'react-cookie';

const cookies = new Cookies();
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = cookies.get("user") || null;
        return savedUser
    });

    const login = (user) => {
        setUser(user);
    };

    const logout = () => {
        AuthServices.logout();
        setUser(null);
        cookies.remove("user");
        cookies.remove("accessToken");
    };

    useEffect(() => {
        if (user) {
            cookies.set("user", JSON.stringify(user), {
                path: "/",
                expires: new Date(Date.now() + (12 * 60 * 60 * 1000))
            });
        } else {
            cookies.remove("user");
        }
    }, [user]);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext);
