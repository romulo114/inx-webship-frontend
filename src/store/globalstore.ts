import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import logger from 'redux-logger';
import {bolInfoReducer, freightHistoryInfoReducer, savedQuotesReducer} from '../reducers';

const rootReducer = combineReducers( {bolInfoReducer: bolInfoReducer, freightHistoryInfoReducer: freightHistoryInfoReducer, savedQuotesReducer: savedQuotesReducer} );
export const store = configureStore({
    reducer: rootReducer,
    middleware: []
    // middleware: [logger]
})

export type RootState = ReturnType<typeof rootReducer>;