import { useCallback, useEffect} from 'react'
import './App.css';
import { Todolist } from './todolist/Todolist';
import { AddItemForm } from './addItemForm/AddItemForm';
import {  addTodolist, fetchTodolists} from './state/todolistsReducer';
import { useSelector } from 'react-redux';
import {  AppRootState, useAppDispatch } from './state/store';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { ItemTaskType} from './api/todolistApi';
import { RequestStatusType } from './state/appReducer';
import LinearProgress from '@mui/material/LinearProgress';
import {ErrorSnackBar} from './snackBar/ErrorSnackBar';
import { logOut, setIsLoggedIn } from './featuries/authReducer';
import { Navigate, Route, Routes } from 'react-router-dom';
import { TodolistsList } from './TodolistList';
import { Login } from './featuries/Login';
import CircularProgress from '@mui/material/CircularProgress';

export type TasksType = {
    [todolistID: string]: Array<ItemTaskType>
}
export type FilterTaskType = 'all' | 'active' | 'completed'
export type TodolistType = {
    id: string
    title: string
    order: number
    addedDate: Date
} & {filter: FilterTaskType}

function AppWithRedux() {
    console.log('AppWithRedux')
    let status = useSelector<AppRootState, RequestStatusType>(state=> state.app.status)
    let isAuth = useSelector<AppRootState, boolean>(state=> state.auth.isLoggedIn)
    let isInitialized = useSelector<AppRootState, boolean>(state=> state.app.isInitialized)
    let dispatch = useAppDispatch()
    
    useEffect(()=> {
        console.log('effect AppWithRedux')
            dispatch(setIsLoggedIn())
    }, [])
    const onLogOutHeandler = ()=> {
        dispatch(logOut())
    }
    if (!isInitialized) return <CircularProgress variant="determinate" value={25} />

    return (
        <div>
            <AppBar position="static" color="success">
                <Toolbar>
                    <IconButton color="inherit">
                        <MenuIcon />
                    </IconButton>
                    <Button color="inherit" onClick={onLogOutHeandler}> {isAuth ? 'Log Out' : ''}</Button>
                </Toolbar>
            </AppBar>
            {status === "loading" && <LinearProgress color="inherit" />}
                    <Routes>
                       <Route path="/" element={<TodolistsList />} />
                       <Route path="/login" element={<Login />} />
                    </Routes>
            <ErrorSnackBar/>
        </div>
    )
}
export default AppWithRedux;
 