import { createSlice } from '@reduxjs/toolkit'
import { apiCallBegan } from '../../store/api'
import { setToken } from '../../store/middleware/api';

const tokenKey = "token";

const slice = createSlice({
    name: 'auth',
    initialState: {
        token: "",
        error: "",
        loading: false,
        registered: false
    },
    reducers: {
        loggedIn: (auth, action) => {
            auth.loading = false;
            auth.error = "";
            auth.token = action.payload;
            setToken(action.payload);
            localStorage.setItem(tokenKey, auth.token);
        },
        loggedOut: (auth, action) => {
            auth.token = "";
            auth.error = "";
            setToken("");
            localStorage.removeItem(tokenKey);
        },
        apiRequested: (auth, action) => {
            auth.error = "";
            auth.loading = true;
        },
        apiRequestFailed: (auth, action) => {
            auth.loading = false;
            auth.error = action.payload;
        },
    }
})

export const { loggedIn, loggedOut, apiRequested, apiRequestFailed } = slice.actions;

//Action creators
const url = "/login";
export const login = (credential) => apiCallBegan({
    url,
    method: 'post',
    data: credential,
    onStart: apiRequested.type,
    onSuccess: loggedIn.type,
    onError: apiRequestFailed.type
})

export const getToken = (dispatch, state) => {
    const token = localStorage.getItem(tokenKey);
    if (token && !state.auth.token) {
        dispatch({ type: loggedIn.type, payload: { token: token } })
    }
    return token;
};

export const getErrorMessage = (state) => {
    return state.auth.error
}

export const isAuth = (dispatch, state) => {
    const token = localStorage.getItem(tokenKey);
    if (token && !state.auth.token) {
        dispatch({ type: loggedIn.type, payload: { token: token } })
    }
    return !!token;
}

export default slice.reducer;