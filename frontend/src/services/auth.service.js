import api from './api'
import { Cookies } from 'react-cookie'

const API_URL_AUTH = import.meta.env.VITE_API_URL_AUTH
const cookies = new Cookies()


const register = async (username, password) => {
    try {
        const response = await api.post(`${API_URL_AUTH}/register`, { username, password })
        return response
    } catch (error) {
        console.error("Error during registration:", error)
        throw error
    }
}

const login = async (username, password) => {
    try {
        const response = await api.post(`${API_URL_AUTH}/login`, { username, password })

        if (response.status === 200) {
            if (response.data.token) {

                cookies.set("accessToken", response.data.token, {
                    path: "/",
                    expires: new Date(Date.now() + (24 * 60 * 60 * 1000))
                })
                cookies.set("user", response.data)
            }
        }

        return response
    } catch (error) {
        console.error("Error during login:", error)
        throw error
    }
}


const logout = async () => {
    cookies.remove("accessToken")
    cookies.remove("user")
}

const AuthServices = {
    register,
    login,
    logout
}

export default AuthServices
