import {  useEffect} from 'react'
import './App.css';
import { useSelector } from 'react-redux';
import {  AppRootState } from './store';
import {useAppDispatch} from '../common/hooks'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu'
import { ItemTaskType} from '../featuries/todolistsList/api/tasksApi';
import { appActions, RequestStatusType } from './appReducer';
import LinearProgress from '@mui/material/LinearProgress';
import {ErrorSnackBar} from '../common/components/ErrorSnackBar/ErrorSnackBar';
import { logOut, setIsLoggedIn } from '../featuries/auth/model/authReducer';
import { Route, Routes } from 'react-router-dom';
import { TodolistsList } from '../featuries/todolistsList/ui/TodolistList';
import { Login } from '../featuries/auth/ui/Login';
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

function App() {
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
    if (!isInitialized) return <CircularProgress />

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
export default App;
 