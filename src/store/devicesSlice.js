import { createSlice } from '@reduxjs/toolkit'
import { apiCallBegan } from './api';

const slice = createSlice({
    name: 'devices',
    initialState: {
        data: [],
        num: 0,
        loading: false,
        lastFetch: null
    },
    reducers: {
        devicesRequested: (devices, action) => {
            devices.loading = true;
        },
        devicesReceived: (devices, action) => {
            devices.data = action.payload.devices
            devices.num = action.payload.devices.length
            devices.loading = false;
            devices.lastFetch = Date.now();
        },
        devicesRequestFailed: (devices, action) => {
            devices.loading = false;
        }
    }
});

export const {
    devicesRequested,
    devicesReceived,
    devicesRequestFailed
} = slice.actions;
export default slice.reducer;


//Action creators
const url = "/devices";
export const loadDevices = () => (dispatch) => {
    dispatch(apiCallBegan({
        url: url,
        onStart: devicesRequested.type,
        onSuccess: devicesReceived.type,
        onError: devicesRequestFailed.type
    }));
};

export const countDevice = (dispatch, state) => {
    return state.devices.num;
}