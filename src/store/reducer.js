import { combineReducers } from 'redux';
import authReducer from '../features/auth/authSlice';
import deviceReducer from './devicesSlice';

export default combineReducers({ auth: authReducer, devices: deviceReducer});