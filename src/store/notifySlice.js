import { createSlice } from '@reduxjs/toolkit'
import { apiCallBegan } from './api';

const slice = createSlice({
    name: 'notify',
    initialState: {
        message: "",
        loading: false,
        lastFetch: null
    },
    reducers: {
        notifyRequested: (notify, action) => {
            notify.loading = true;
        },
        notifySent: (notify, action) => {
            notify.message = action.payload
            notify.loading = false;
            notify.lastFetch = Date.now();
        },
        notifyRequestFailed: (notify, action) => {
            notify.loading = false;
        }
    }
});

export const {
    notifyRequested,
    notifySent,
    notifyRequestFailed
} = slice.actions;
export default slice.reducer;


//notify creators
const url = "/notify";
export const sendNotification = (data) => (dispatch) => {
    dispatch(apiCallBegan({
        url: url,
        method: 'post',
        data: data,
        onStart: notifyRequested.type,
        onSuccess: notifySent.type,
        onError: notifyRequestFailed.type
    }));
};
