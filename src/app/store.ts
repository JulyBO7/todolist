import {tasksReducer} from '../featuries/todolistsList';
import { todolistsReducer } from '../featuries/todolistsList';
import { appReducer } from './appReducer';
import { authReducer } from '../featuries/auth/model/authReducer';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
    reducer: {
        tasks: tasksReducer,
        todolists: todolistsReducer,
        app: appReducer, 
        auth: authReducer
    }})

export type AppRootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
//@ts-ignore
window.store = store
