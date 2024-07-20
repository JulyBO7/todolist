import {tasksReducer} from './tasksReducer'
import { todolistsReducer } from './todolistsReducer'
import { useDispatch } from 'react-redux'
import { appReducer } from './appReducer'
import { authReducer } from '../featuries/authReducer'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
    reducer: {
        tasks: tasksReducer,
        todolists: todolistsReducer,
        app: appReducer, 
        auth: authReducer
    }})

export type AppRootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();


// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
//@ts-ignore
window.store = store
