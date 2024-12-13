import { Cookies } from "react-cookie";
const cookies = new Cookies()

const getLocalAccessToken = () => {
    const user = getUser()
    return user?.accessToken
}

const getUser = () => {
    const user = cookies.get("user")
}

const removeUser = () => {
    cookies.remove("user", { path: '/' })
}

const setUser = () => {
    cookies.set("user", JSON.stringify(user), {
        path: '/',
        expires: new Date(Date.now() + (12 * 60 * 60))
    })
}

const TokenServices = {
    getLocalAccessToken,
    setUser,
    getUser,
    removeUser
}

export default TokenServices