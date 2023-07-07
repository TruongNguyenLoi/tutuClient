import {
    GET_CURRENT_USER, SET_CURRENT_USER, GET_ERRORS, API_URL
} from '../constants/constants'

import axios from 'axios'
import jwtDecode from 'jwt-decode'
import setHeader from '../../helpers/setHeader'
import { toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import { getCartInfo } from './CartActions'
const token = localStorage.getItem('token');
const headers = { Authorization: `Bearer ${token}` }

export const setCurrentUser = (user) => {
    return {
        type: SET_CURRENT_USER,
        payload: user
    }
}

export const getCurrentUser = () => {
    const token = localStorage.getItem('token');
    setHeader(token);
    const headers = { Authorization: `Bearer ${token}` }
    return dispatch => {
        axios({
            method: "GET",
            headers: headers,
            url: `${API_URL}/api/auth/info`
        })
            .then((res) => {
                dispatch({
                    type: GET_CURRENT_USER,
                    payload: res.data
                });
            })
            .catch((err) => {
                console.log(err);
            })
    }
}

export const getUserLogin = () => {
    const token = localStorage.getItem('token');
    setHeader(token);
    const headers = { Authorization: `Bearer ${token}` }
    return axios({
        method: "GET",
        headers: headers,
        url: `${API_URL}/api/auth/info`
    })
}


export const getErrors = (errors) => {
    return {
        type: GET_ERRORS,
        payload: errors
    }
}

export const login = (user, history) => {
    const { username, password } = user;
    return dispatch => {
        axios({
            method: 'POST',
            url: `${API_URL}/api/auth/login`,
            data: { username, password }
        })
            .then((res) => {
                const token = res.data.token;
                const username = res.data.username;
                localStorage.setItem('token', token);
                localStorage.setItem('username', username);
                const decoded = jwtDecode(token);
                dispatch(setCurrentUser(decoded));
                dispatch(getCartInfo());
                history.goBack();
            })
            .catch(err => {
                toast.error('Tài khoản hoặc mật khẩu không chính xác!', {
                    position: "bottom-center",
                    theme: 'dark',
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                console.log(err);
            })
    }
}

export const register = (data, history) => {
    return dispatch => {
        axios({
            method: "POST",
            data: JSON.stringify(data),
            url: `${API_URL}/api/auth/register`,
            headers: {
                'content-type': 'application/json'
            }
        })
            .then((res) => {
                toast.success(res.data.message, {
                    position: "bottom-center",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                history.push("/login")
            })
            .catch((err) => {
                if (err) {
                    toast.error(err.response.data.message, {
                        position: "bottom-center",
                        theme: 'dark',
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    dispatch(getErrors(err.response.data.message))
                }
            })
    }
}

export const updateInfo = (data) => {
    return axios({
        method: "PUT",
        url: `${API_URL}/api/auth/update-info`,
        headers: headers,
        data: data
    })
}

export const updatePassword = (data) => {
    return axios({
        method: "PUT",
        url: `${API_URL}/api/auth/update-password`,
        headers: headers,
        data: data
    })
}

export const logout = () => {
    return dispatch => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        dispatch(setCurrentUser({}));
        window.location.reload();
        setHeader();
    }
}
