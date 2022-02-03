import { loginError, loginStart, loginSuccess, userLogout } from "./User"
import { publicRequest } from "../requestMethod"
export const login = async (dispatch, data) => {
    // console.log(data);
    try {
        dispatch(loginStart())
        const user = await publicRequest.post("/auth/login", data);
        localStorage.setItem('userDetail', JSON.stringify(user.data))
        dispatch(loginSuccess(user.data))
        window.location.reload(true)
    } catch (error) {
        dispatch(loginError())
    }
}


export const logout = (dispatch) => {
    dispatch(userLogout())
    localStorage.removeItem('userDetail')
}